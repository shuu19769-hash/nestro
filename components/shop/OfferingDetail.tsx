"use client";

import Image from "next/image";
import Link from "@/components/shared/StaticLink";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Hammer,
  MapPin,
  MessageCircle,
  Palette,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { localized } from "@/lib/catalog";
import { whatsappUrl } from "@/lib/constants";
import { useUiStore } from "@/lib/store";
import type { CatalogOffering, Locale } from "@/types";

const copy = {
  en: {
    services: "Services",
    consult: "Book a consultation",
    whatsapp: "Discuss on WhatsApp",
    materials: "Materials & finishes",
    features: "Why this solution works",
    ideal: "Well suited to",
    care: "Care guidance",
    faq: "Frequently asked questions",
    related: "Explore related services",
    process: "How it works",
    processTitle: "A clear path from consultation to installation.",
  },
  ar: {
    services: "الخدمات",
    consult: "احجز استشارة",
    whatsapp: "ناقش المشروع عبر واتساب",
    materials: "الخامات والتشطيبات",
    features: "مزايا هذا الحل",
    ideal: "مناسب لـ",
    care: "إرشادات العناية",
    faq: "الأسئلة الشائعة",
    related: "استكشف الخدمات ذات الصلة",
    process: "خطوات العمل",
    processTitle: "مسار واضح من الاستشارة إلى التركيب.",
  },
};

function hubFor(collection: string) {
  if (collection === "custom-furniture") return "/custom-furniture";
  if (collection === "blinds" || collection === "curtains")
    return "/blinds-curtains";
  if (collection.includes("upholstery")) return "/upholstery";
  if (collection === "kitchen-cabinets") return "/kitchens";
  if (collection === "washroom-tiles") return "/washroom-tiles";
  return "/collections";
}

function advantageFor(item: CatalogOffering, locale: Locale) {
  const values: Record<string, [string, string]> = {
    blinds: [
      "Considered light, glare and privacy control",
      "تحكم مدروس بالضوء والوهج والخصوصية",
    ],
    curtains: [
      "Layered privacy, softness and light control",
      "خصوصية ونعومة وتحكم بالضوء عبر طبقات مدروسة",
    ],
    "indoor-upholstery": [
      "Comfort, support and finish renewed",
      "تجديد الراحة والدعم والتشطيب",
    ],
    "outdoor-upholstery": [
      "Performance options for exposed spaces",
      "خيارات أداء مناسبة للمساحات الخارجية",
    ],
    "custom-furniture": [
      "Proportioned and specified for your space",
      "نِسَب ومواصفات مصممة لمساحتك",
    ],
    "kitchen-cabinets": [
      "Storage and movement planned as one",
      "تخطيط التخزين والحركة كوحدة متكاملة",
    ],
    "washroom-tiles": [
      "Surface selection coordinated through installation",
      "تنسيق اختيار الأسطح حتى مرحلة التركيب",
    ],
  };
  const value = values[item.collection] ?? [
    "Specified around your room and daily use",
    "مواصفات مدروسة لمساحتك واستخدامك اليومي",
  ];
  return locale === "ar" ? value[1] : value[0];
}

export function OfferingDetail({
  item,
  related,
  locale = "en",
}: {
  item: CatalogOffering;
  related: CatalogOffering[];
  locale?: Locale;
}) {
  const text = copy[locale];
  const prefix = locale === "ar" ? "/ar" : "";
  const store = useUiStore();
  const addRecentlyViewed = store.addRecentlyViewed;
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const hub = `${prefix}${hubFor(item.collection)}`;

  useEffect(() => addRecentlyViewed(item.slug), [item.slug, addRecentlyViewed]);
  useEffect(() => {
    if (activeImage === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowRight")
        setActiveImage((activeImage + 1) % item.images.length);
      if (event.key === "ArrowLeft")
        setActiveImage(
          (activeImage - 1 + item.images.length) % item.images.length,
        );
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeImage, item.images.length]);

  const steps = [
    [MessageCircle, "Consultation", "الاستشارة"],
    [Ruler, "Measurement", "القياس"],
    [Palette, "Design & proposal", "التصميم والعرض"],
    [ClipboardCheck, "Specification approval", "اعتماد المواصفات"],
    [Hammer, "Making", "التنفيذ"],
    [Truck, "Delivery & installation", "التوصيل والتركيب"],
  ] as const;

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="container-site flex flex-wrap items-center gap-2 py-5 text-xs text-black/55">
        <Link href={hub}>{text.services}</Link>
        <ChevronRight
          className={locale === "ar" ? "rotate-180" : ""}
          size={13}
        />
        <span>{localized(item.badges[0], locale)}</span>
        <ChevronRight
          className={locale === "ar" ? "rotate-180" : ""}
          size={13}
        />
        <span>{localized(item.name, locale)}</span>
      </div>

      <section className="container-site grid gap-10 pb-16 lg:grid-cols-[1.12fr_.88fr] lg:gap-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {item.images.map((src, index) => (
            <button
              key={src}
              onClick={() => setActiveImage(index)}
              className={`card-image group/image relative overflow-hidden rounded-2xl ${index === 0 ? "aspect-[4/4.7] sm:col-span-2" : "aspect-square"}`}
              aria-label={`${locale === "ar" ? "فتح الصورة" : "Open image"} ${index + 1}`}
            >
              <Image
                src={src}
                alt={`${localized(item.name, locale)} ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width:1024px) 100vw,58vw"
                className="object-cover transition duration-700 group-hover/image:scale-[1.03]"
              />
              <span className="absolute bottom-3 end-3 rounded-full bg-charcoal/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                {locale === "ar" ? "تكبير" : "Expand"}
              </span>
            </button>
          ))}
        </div>
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="eyebrow">{localized(item.badges[0], locale)}</p>
          <h1 className="mt-5 text-4xl font-medium sm:text-5xl">
            {localized(item.name, locale)}
          </h1>
          <p className="mt-7 text-lg leading-8 text-black/65">
            {localized(item.description, locale)}
          </p>
          <div className="mt-7 space-y-3">
            <p className="flex gap-3 text-sm">
              <Check className="shrink-0 text-sage" size={18} />
              {advantageFor(item, locale)}
            </p>
            <p className="flex gap-3 text-sm">
              <Check className="shrink-0 text-sage" size={18} />
              {locale === "ar"
                ? "تصميم حسب الطلب مع القياس وتأكيد الخامة"
                : "Made to measure with material and specification approval"}
            </p>
            <p className="flex gap-3 text-sm">
              <Check className="shrink-0 text-sage" size={18} />
              {locale === "ar"
                ? "عرض واضح قبل بدء التنفيذ"
                : "A documented proposal before work begins"}
            </p>
          </div>
          <div data-motion-group="stagger" className="mt-8 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => store.open("consultation")}
              className="button button-primary"
            >
              <Sparkles size={17} />
              {text.consult}
            </button>
            <a
              href={whatsappUrl(
                `Hello NESTRO, I’m interested in ${item.name.en}.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="button button-outline"
            >
              <MessageCircle size={17} />
              {text.whatsapp}
            </a>
          </div>
        </div>
      </section>

      <section className="offering-trust-band">
        <div className="container-site grid gap-3 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["25+", locale === "ar" ? "سنة من الخبرة" : "Years of experience"],
            ["5,000+", locale === "ar" ? "عميل تم خدمته" : "Customers served"],
            [
              "7",
              locale === "ar" ? "إمارات ضمن نطاق الخدمة" : "Emirates covered",
            ],
            [
              "01",
              locale === "ar"
                ? "مسار متكامل من القياس للتركيب"
                : "Coordinated path from measure to fit",
            ],
          ].map(([value, label]) => (
            <div key={label} className="offering-trust-item">
              <strong data-counter={value}>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-light">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">{text.materials}</p>
            <h2 className="heading mt-5">
              {locale === "ar"
                ? "اختر الملمس والأداء المناسبين."
                : "Choose the right feel and performance."}
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {item.materials.map((material) => (
                <div key={material.name.en} className="surface-card p-5">
                  <h3 className="font-semibold">
                    {localized(material.name, locale)}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-black/55">
                    {localized(material.description, locale)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">{text.features}</p>
            <div className="mt-7 space-y-3">
              {item.features.map((feature) => (
                <p
                  key={feature.en}
                  className="flex gap-3 rounded-xl bg-ivory p-4 text-sm"
                >
                  <Check size={17} className="shrink-0 text-sage" />
                  {localized(feature, locale)}
                </p>
              ))}
            </div>
            <h3 className="mt-8 text-xl font-medium">{text.ideal}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.idealUses.map((use) => (
                <span key={use.en} className="pill">
                  {localized(use, locale)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container-site">
          <p className="eyebrow">{text.process}</p>
          <h2 className="heading mt-5 max-w-3xl">{text.processTitle}</h2>
          <div data-motion-group="stagger" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map(([Icon, en, ar], index) => (
              <div key={en} className="process-stage-card p-5">
                <span className="process-number-badge">
                  0{index + 1}
                </span>
                <Icon className="mt-6 text-sage" size={20} />
                <h3 className="mt-4 font-medium">
                  {locale === "ar" ? ar : en}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div data-motion-group="stagger" className="container-site grid gap-10 lg:grid-cols-3">
          <div className="surface-card p-7">
            <ShieldCheck className="text-sage" />
            <h2 className="mt-5 text-2xl font-medium">
              {locale === "ar"
                ? "وضوح قبل الموافقة"
                : "Clarity before approval"}
            </h2>
            <p className="mt-4 text-sm leading-7 text-black/60">
              {locale === "ar"
                ? "يوثق العرض الخامات والمقاسات ومتطلبات الموقع ونطاق التركيب المتفق عليه."
                : "The proposal records materials, dimensions, site requirements and the agreed installation scope."}
            </p>
          </div>
          <div className="surface-card p-7">
            <MapPin className="text-sage" />
            <h2 className="mt-5 text-2xl font-medium">
              {locale === "ar" ? "خدمة في جميع الإمارات" : "Across the UAE"}
            </h2>
            <p className="mt-4 text-sm leading-7 text-black/60">
              {locale === "ar"
                ? "تتوفر الاستشارة والقياس والتوصيل والتركيب حسب نطاق المشروع."
                : "Consultation, measurement, delivery and installation are available according to project scope."}
            </p>
          </div>
          <div className="surface-card p-7">
            <ClipboardCheck className="text-sage" />
            <h2 className="mt-5 text-2xl font-medium">{text.care}</h2>
            <p className="mt-4 text-sm leading-7 text-black/60">
              {localized(item.care, locale)}
            </p>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container-site max-w-4xl">
          <p className="eyebrow">{text.faq}</p>
          <div className="mt-6 border-t fine-border">
            {item.faqs.map((faq, index) => (
              <details
                key={faq.question.en}
                className="border-b fine-border py-5"
                open={index === 0}
              >
                <summary className="cursor-pointer font-medium">
                  {localized(faq.question, locale)}
                </summary>
                <p className="pt-4 text-sm leading-7 text-black/60">
                  {localized(faq.answer, locale)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section showroom-gold-section text-white">
        <div className="container-site">
          <p className="eyebrow">{text.related}</p>
          <div data-motion-group="stagger" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((service) => (
              <Link
                key={service.slug}
                href={`${prefix}/shop/${service.slug}`}
                className="related-service-card group relative min-h-[430px] overflow-hidden rounded-2xl"
              >
                <div className="card-image absolute inset-0">
                  <Image
                    src={service.images[0]}
                    alt={localized(service.name, locale)}
                    fill
                    sizes="(max-width:768px) 100vw,33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="related-service-card-body absolute inset-0 flex flex-col items-start justify-end p-6">
                  <small className="font-bold uppercase tracking-[.14em] text-white/80">
                    {localized(service.badges[0], locale)}
                  </small>
                  <h2 className="mt-2 text-xl font-medium">
                    {localized(service.name, locale)}
                  </h2>
                  <span className="related-service-action mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold">
                    {locale === "ar" ? "عرض الخدمة" : "View service"}
                    <ChevronRight
                      className={locale === "ar" ? "rotate-180" : ""}
                      size={16}
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-2 gap-2 rounded-full border border-white/60 bg-ivory/90 p-2 shadow-2xl backdrop-blur-xl md:hidden">
        <button
          onClick={() => store.open("consultation")}
          className="button button-primary !min-h-12"
        >
          {text.consult}
        </button>
        <a
          href={whatsappUrl(`Hello NESTRO, I’m interested in ${item.name.en}.`)}
          target="_blank"
          rel="noreferrer"
          className="button button-outline !min-h-12"
        >
          {text.whatsapp}
        </a>
      </div>

      {activeImage !== null && (
        <div
          className="modal-backdrop fixed inset-0 z-[100] grid place-items-center p-3 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={localized(item.name, locale)}
          onMouseDown={(event) =>
            event.currentTarget === event.target && setActiveImage(null)
          }
        >
          <button
            className="icon-button absolute end-5 top-5 z-10 bg-ivory text-charcoal"
            onClick={() => setActiveImage(null)}
            aria-label={locale === "ar" ? "إغلاق" : "Close"}
          >
            <X />
          </button>
          <button
            className="icon-button absolute start-3 top-1/2 z-10 bg-ivory text-charcoal sm:start-6"
            onClick={() =>
              setActiveImage(
                (activeImage - 1 + item.images.length) % item.images.length,
              )
            }
            aria-label={locale === "ar" ? "السابق" : "Previous image"}
          >
            <ChevronLeft />
          </button>
          <div className="relative h-[86vh] w-full max-w-6xl overflow-hidden rounded-2xl">
            <Image
              src={item.images[activeImage]}
              alt={`${localized(item.name, locale)} ${activeImage + 1}`}
              fill
              priority
              className="object-contain"
              sizes="95vw"
            />
          </div>
          <button
            className="icon-button absolute end-3 top-1/2 z-10 bg-ivory text-charcoal sm:end-6"
            onClick={() =>
              setActiveImage((activeImage + 1) % item.images.length)
            }
            aria-label={locale === "ar" ? "التالي" : "Next image"}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
