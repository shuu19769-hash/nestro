import Image from "next/image";
import Link from "@/components/shared/StaticLink";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { ConsultationButton } from "@/components/shared/ClientActions";
import { ProductCard } from "@/components/shop/ProductCard";
import { catalog, catalogCollections, localized } from "@/lib/catalog";
import type { Locale } from "@/types";

type HubKind = "windows" | "upholstery";

const copy = {
  en: {
    windows: {
      eyebrow: "Blinds & curtains",
      title: "Made-to-measure window treatments.",
      intro:
        "Compare blind systems, curtain headings, performance fabrics and motorized options, then arrange measurement and fitting anywhere in the UAE.",
      categoryTitle: "Start with the right window specialist.",
      offeringTitle: "Explore every blind and curtain option.",
      hero: "/images/collections/curtains.webp",
    },
    upholstery: {
      eyebrow: "Indoor & outdoor upholstery",
      title: "Restore comfort. Renew every surface.",
      intro:
        "From sofa rebuilding and headboards to weather-ready outdoor cushions and covers, choose the exact upholstery service your piece requires.",
      categoryTitle: "Choose where the piece lives.",
      offeringTitle: "Explore every upholstery service.",
      hero: "/images/collections/indoor-upholstery.webp",
    },
    why: "Why work with NESTRO",
    whyTitle: "A complete service, not just a product.",
    process: "Our process",
    processTitle: "From fast consultation to final installation.",
    areas: "UAE-wide service",
    areasTitle: "Measurement and fitting across all seven Emirates.",
    cta: "Book a complimentary consultation",
  },
  ar: {
    windows: {
      eyebrow: "الستائر والحجب",
      title: "معالجات نوافذ مصممة حسب القياس.",
      intro:
        "قارن أنظمة الحجب وأنماط الستائر والخامات العملية وخيارات التشغيل الآلي، ثم رتب القياس والتركيب في جميع أنحاء الإمارات.",
      categoryTitle: "ابدأ مع الاختصاص المناسب للنافذة.",
      offeringTitle: "استكشف جميع خيارات الستائر والحجب.",
      hero: "/images/collections/curtains.webp",
    },
    upholstery: {
      eyebrow: "التنجيد الداخلي والخارجي",
      title: "استعد الراحة وجدّد كل سطح.",
      intro:
        "من إعادة بناء الأرائك وألواح الرأس إلى الوسائد والأغطية الخارجية المقاومة للعوامل الجوية، اختر خدمة التنجيد المناسبة لقطعتك.",
      categoryTitle: "اختر مكان استخدام القطعة.",
      offeringTitle: "استكشف جميع خدمات التنجيد.",
      hero: "/images/collections/indoor-upholstery.webp",
    },
    why: "لماذا نسترو",
    whyTitle: "خدمة متكاملة وليست مجرد منتج.",
    process: "خطوات العمل",
    processTitle: "من الاستشارة السريعة إلى التركيب النهائي.",
    areas: "خدمة في جميع الإمارات",
    areasTitle: "القياس والتركيب في الإمارات السبع.",
    cta: "احجز استشارة مجانية",
  },
};

const benefits = {
  en: [
    {
      icon: Ruler,
      title: "Precise measurement",
      text: "Site dimensions and access requirements are confirmed before specification.",
    },
    {
      icon: Sparkles,
      title: "Material guidance",
      text: "Compare appearance, performance, maintenance and suitability in one conversation.",
    },
    {
      icon: ShieldCheck,
      title: "Clear proposal",
      text: "Configuration, assumptions and fitting requirements are documented before approval.",
    },
    {
      icon: Truck,
      title: "Managed installation",
      text: "Delivery, fitting and the final quality check are coordinated as one service.",
    },
  ],
  ar: [
    {
      icon: Ruler,
      title: "قياس دقيق",
      text: "نؤكد أبعاد الموقع ومتطلبات الوصول قبل اعتماد المواصفات.",
    },
    {
      icon: Sparkles,
      title: "إرشاد للخامات",
      text: "قارن المظهر والأداء والعناية والملاءمة خلال محادثة واحدة.",
    },
    {
      icon: ShieldCheck,
      title: "عرض واضح",
      text: "نوثق التكوين والافتراضات ومتطلبات التركيب قبل الموافقة.",
    },
    {
      icon: Truck,
      title: "تركيب منظم",
      text: "ننسق التوصيل والتركيب وفحص الجودة النهائي كخدمة واحدة.",
    },
  ],
};

const steps = {
  en: [
    "Consultation",
    "Measurement",
    "Design & quote",
    "Material approval",
    "Making",
    "Installation",
  ],
  ar: [
    "الاستشارة",
    "القياس",
    "التصميم والعرض",
    "اعتماد الخامة",
    "التصنيع",
    "التركيب",
  ],
};

export function CatalogServiceHub({
  kind,
  locale = "en",
}: {
  kind: HubKind;
  locale?: Locale;
}) {
  const ar = locale === "ar";
  const text = copy[locale];
  const page = text[kind];
  const collectionSlugs =
    kind === "windows"
      ? ["blinds", "curtains"]
      : ["indoor-upholstery", "outdoor-upholstery"];
  const collections = catalogCollections.filter((collection) =>
    collectionSlugs.includes(collection.slug),
  );
  const offerings = catalog.filter((item) =>
    collectionSlugs.includes(item.collection),
  );
  const prefix = ar ? "/ar" : "";
  const Arrow = ar ? ArrowLeft : ArrowRight;

  return (
    <div dir={ar ? "rtl" : "ltr"}>
      <section className="relative min-h-[620px] overflow-hidden bg-charcoal text-white">
        <Image
          src={page.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-65"
        />
        <div className="photo-overlay absolute inset-0" />
        <div className="container-site relative flex min-h-[620px] items-end py-16 md:items-center">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[.18em] text-white/65">
              {page.eyebrow}
            </span>
            <h1 className="display mt-6">{page.title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75">
              {page.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ConsultationButton className="button button-primary">
                {text.cta}
              </ConsultationButton>
              <Link
                href="#offerings"
                className="button button-ivory"
              >
                {ar ? "عرض الخيارات" : "View all options"}
                <Arrow size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <span className="eyebrow">{page.categoryTitle}</span>
          <div data-motion-group="stagger" className="mt-10 grid gap-5 md:grid-cols-2">
            {collections.map((collection) => (
              <Link
                href={`${prefix}/shop?collection=${collection.slug}`}
                key={collection.slug}
                className="group relative min-h-[380px] overflow-hidden rounded-3xl"
              >
                <Image
                  src={collection.image}
                  alt=""
                  fill
                  sizes="(max-width:768px) 100vw,50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="photo-overlay-bottom absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <small className="font-bold uppercase tracking-[.14em] text-white/60">
                    {collection.count} {ar ? "خياراً" : "offerings"}
                  </small>
                  <h2 className="mt-2 text-3xl font-medium">
                    {localized(collection.name, locale)}
                  </h2>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                    {ar ? "استكشف" : "Explore"}
                    <Arrow size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container-site">
          <span className="eyebrow">{text.why}</span>
          <h2 className="heading mt-5 max-w-3xl">{text.whyTitle}</h2>
          <div data-motion-group="stagger" className="mt-12 grid gap-4 md:grid-cols-4">
            {benefits[locale].map((benefit) => (
              <div key={benefit.title} className="surface-card p-6">
                <benefit.icon className="text-sage" />
                <h3 className="mt-6 text-lg font-medium">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/55">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="offerings" className="section">
        <div className="container-site">
          <span className="eyebrow">{page.offeringTitle}</span>
          <div data-motion-group="stagger" className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {offerings.map((offering) => (
              <ProductCard
                key={offering.slug}
                product={offering}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-bronze">
        <div className="container-site">
          <span className="eyebrow !text-ivory">{text.process}</span>
          <h2 className="heading mt-5 max-w-3xl">{text.processTitle}</h2>
          <div data-motion-group="stagger" className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {steps[locale].map((step, index) => (
              <div key={step} className="process-stage-card p-6 text-charcoal">
                <small className="process-number-badge">0{index + 1}</small>
                <h3 className="mt-5 font-medium">{step}</h3>
                <CheckCircle2 className="mt-6 text-sage" size={19} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <span className="eyebrow">{text.areas}</span>
            <h2 className="heading mt-5">{text.areasTitle}</h2>
            <ConsultationButton className="button button-primary mt-8">
              {text.cta}
            </ConsultationButton>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(ar ? ["دبي", "أبوظبي", "الشارقة", "الإمارات الشمالية"] : ["Dubai", "Abu Dhabi", "Sharjah", "Northern Emirates"]).map((area) => (
              <div key={area} className="surface-card p-5 text-center">
                <MapPin className="mx-auto text-sage" size={20} />
                <strong className="mt-3 block text-sm">{area}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
