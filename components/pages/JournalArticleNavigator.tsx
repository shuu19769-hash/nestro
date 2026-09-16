"use client";

import { useEffect, useState } from "react";
import Link from "@/components/shared/StaticLink";
import type { JournalPost, Locale } from "@/types";

export function JournalArticleNavigator({ posts, post, locale }: { posts: JournalPost[]; post: JournalPost; locale: Locale }) {
  const ar = locale === "ar";
  const prefix = ar ? "/ar" : "";
  const [active, setActive] = useState(post.sections?.[0]?.id ?? "article-content");

  useEffect(() => {
    const sections = (post.sections ?? []).map((section) => document.getElementById(section.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-18% 0px -68%", threshold: [0, .15, .5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [post]);

  const contents = <>
    <p className="text-[10px] font-bold uppercase tracking-[.18em] text-sage">{ar ? "كل المقالات" : "All journal stories"}</p>
    <nav className="mt-3 space-y-1" aria-label={ar ? "كل مقالات المجلة" : "All journal stories"}>
      {posts.map((item) => <Link key={item.slug} href={`${prefix}/journal/${item.slug}`} aria-current={item.slug === post.slug ? "page" : undefined} className={`block rounded-xl px-3 py-2.5 text-sm leading-5 transition ${item.slug === post.slug ? "bg-sage/10 font-semibold text-charcoal ring-1 ring-sage/25" : "text-black/55 hover:bg-black/[.035] hover:text-black"}`}>{item.title}</Link>)}
    </nav>
    {post.sections?.length ? <div className="mt-7 border-t fine-border pt-6">
      <p className="text-[10px] font-bold uppercase tracking-[.18em] text-sage">{ar ? "في هذا المقال" : "In this article"}</p>
      <nav className="mt-3 space-y-1" aria-label={ar ? "أقسام المقال" : "Article sections"}>
        {post.sections.map((section) => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined} className={`block border-s-2 py-1.5 ps-3 text-sm leading-5 transition ${active === section.id ? "border-sage font-semibold text-charcoal" : "border-transparent text-black/45 hover:border-sage/40 hover:text-black"}`}>
          {section.heading}
          {section.points?.length ? <span className="mt-1 block text-xs font-normal text-black/35">{section.points.slice(0, 3).join(" · ")}</span> : null}
        </a>)}
      </nav>
    </div> : null}
  </>;

  return <>
    <details className="surface-card mb-8 rounded-2xl p-4 lg:hidden"><summary className="cursor-pointer text-sm font-semibold">{ar ? "استكشف المقالات ومحتويات الصفحة" : "Explore stories and page contents"}</summary><div className="mt-5">{contents}</div></details>
    <aside className="hidden lg:block"><div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pe-3">{contents}</div></aside>
  </>;
}
