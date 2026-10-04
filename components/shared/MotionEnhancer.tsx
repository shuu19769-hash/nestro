"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type MotionPreset = "fade-rise" | "slide-start" | "slide-end" | "image-mask" | "scale-in" | "counter" | "divider-draw";

const automaticPresets: Array<[string, MotionPreset]> = [
  ["main > section > .container-site > .max-w-3xl", "fade-rise"],
  ["main article > header", "fade-rise"],
  ["main .card-image", "image-mask"],
  ["main .surface-card", "scale-in"],
  ["main .process-stage-card", "scale-in"],
  ["main .sector-card", "scale-in"],
  ["main .related-service-card", "scale-in"],
  ["main .material-choice", "scale-in"],
  ["main .offering-trust-item", "counter"],
  ["main details", "fade-rise"],
  ["footer .container-site > *", "fade-rise"],
];

const groupSelectors = [
  "main .grid",
  "main [data-motion-group]",
  "footer .container-site",
].join(",");

export function MotionEnhancer() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4;

    if (reduced.matches) {
      root.classList.add("motion-reduced");
      return () => root.classList.remove("motion-reduced");
    }

    const assignMotion = () => {
      automaticPresets.forEach(([selector, preset]) => {
        document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
          if (!element.dataset.motion) element.dataset.motion = preset;
        });
      });

      document.querySelectorAll<HTMLElement>(groupSelectors).forEach((group) => {
        if (!group.dataset.motionGroup) group.dataset.motionGroup = "stagger";
        [...group.children].forEach((child, index) => {
          if (!(child instanceof HTMLElement) || child.dataset.motionDelay) return;
          child.dataset.motionDelay = String(Math.min(index, 7) * 65);
        });
      });
    };

    assignMotion();

    const heroImage = document.querySelector<HTMLElement>("main > section:first-child img");
    if (heroImage && !heroImage.dataset.parallax) heroImage.dataset.parallax = "soft";

    root.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.motionState = "visible";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -7%", threshold: 0.08 },
    );
    const registered = new Set<HTMLElement>();
    const registerMotion = () => {
      document.querySelectorAll<HTMLElement>("[data-motion]").forEach((element) => {
        if (registered.has(element) || element.closest("[role='dialog']")) return;
        registered.add(element);
        element.style.setProperty("--motion-delay", `${Number(element.dataset.motionDelay ?? 0)}ms`);
        element.dataset.motionState = "pending";
        observer.observe(element);
      });
    };
    registerMotion();

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          const target = element.dataset.counter ?? element.textContent ?? "";
          const match = target.match(/^([^\d]*)([\d,]+)(.*)$/);
          if (!match) return;
          const [, prefix, rawNumber, suffix] = match;
          const numericTarget = Number(rawNumber.replace(/,/g, ""));
          const digits = rawNumber.replace(/,/g, "").length;
          const start = performance.now();
          const duration = 2200;
          const render = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(numericTarget * eased);
            const formatted = value.toLocaleString("en-US").padStart(digits, "0");
            element.textContent = `${prefix}${formatted}${suffix}`;
            if (progress < 1) window.requestAnimationFrame(render);
          };
          window.requestAnimationFrame(render);
          counterObserver.unobserve(element);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.25 },
    );
    const registeredCounters = new Set<HTMLElement>();
    const registerCounters = () => {
      document.querySelectorAll<HTMLElement>("[data-counter]").forEach((element) => {
        if (registeredCounters.has(element)) return;
        registeredCounters.add(element);
        const target = element.dataset.counter ?? element.textContent ?? "";
        const match = target.match(/^([^\d]*)([\d,]+)(.*)$/);
        if (match) element.textContent = `${match[1]}0${match[3]}`;
        counterObserver.observe(element);
      });
    };
    registerCounters();

    let mutationFrame = 0;
    const mutationObserver = new MutationObserver(() => {
      if (mutationFrame) return;
      mutationFrame = window.requestAnimationFrame(() => {
        mutationFrame = 0;
        assignMotion();
        registerMotion();
        registerCounters();
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const parallaxElements = coarsePointer.matches || lowPower
      ? []
      : [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const viewport = window.innerHeight;
      parallaxElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewport) return;
        const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
        element.style.setProperty("--parallax-y", `${Math.max(-18, Math.min(18, progress * -22)).toFixed(2)}px`);
      });
    };
    const requestParallax = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };
    if (parallaxElements.length) {
      updateParallax();
      window.addEventListener("scroll", requestParallax, { passive: true });
      window.addEventListener("resize", requestParallax, { passive: true });
    }

    const visibilityFallback = window.setTimeout(() => {
      registered.forEach((element) => (element.dataset.motionState = "visible"));
    }, 1600);

    return () => {
      window.clearTimeout(visibilityFallback);
      window.removeEventListener("scroll", requestParallax);
      window.removeEventListener("resize", requestParallax);
      if (frame) window.cancelAnimationFrame(frame);
      if (mutationFrame) window.cancelAnimationFrame(mutationFrame);
      mutationObserver.disconnect();
      observer.disconnect();
      counterObserver.disconnect();
      root.classList.remove("motion-ready");
      registered.forEach((element) => {
        delete element.dataset.motionState;
        element.style.removeProperty("--motion-delay");
      });
      parallaxElements.forEach((element) => element.style.removeProperty("--parallax-y"));
    };
  }, [pathname]);

  return null;
}
