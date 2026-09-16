import Image from "next/image";
import Link from "@/components/shared/StaticLink";
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { catalog } from "@/lib/catalog";
import type { CatalogOffering, Locale } from "@/types";
import { ConsultationButton } from "@/components/shared/ClientActions";
import { ProductCard } from "@/components/shop/ProductCard";

type HubKind = "kitchens" | "washrooms";

const content = {
  kitchens: {
    collection: "kitchen-cabinets" as CatalogOffering["collection"],
    en: {
      eyebrow: "Kitchen studio",
      title: "Cabinetry composed around real life.",
      intro:
        "From the first measurement to the final alignment, NESTRO designs, makes and installs kitchen cabinetry around your space, storage and daily routines.",
      hero: "/images/collections/kitchen-cabinets.webp",
      section: "Kitchen solutions shaped around your space.",
      material: "Finishes selected for beauty and daily performance.",
      materials: [
        "Lacquered cabinetry",
        "High-pressure laminate",
        "Fluted glass",
        "Quartz surfaces",
        "Integrated lighting",
        "Soft-close hardware",
      ],
      steps: [
        [
          "Discover",
          "We review the room, how you cook and what needs to be stored.",
        ],
        [
          "Measure & plan",
          "Site dimensions, services, appliances and circulation shape the layout.",
        ],
        [
          "Specify",
          "Fronts, work surfaces, internal fittings, lighting and hardware are coordinated.",
        ],
        [
          "Make & install",
          "Cabinetry is produced, fitted and carefully aligned on site.",
        ],
      ],
    },
    ar: {
      eyebrow: "استوديو المطابخ",
      title: "خزائن مصممة حول تفاصيل حياتك.",
      intro:
        "من القياس الأول حتى المحاذاة النهائية، تصمم نسترو خزائن المطابخ وتصنعها وتركبها وفق مساحتك واحتياجات التخزين وروتينك اليومي.",
      hero: "/images/collections/kitchen-cabinets.webp",
      section: "حلول مطابخ مصممة حول مساحتك.",
      material: "تشطيبات مختارة للجمال والأداء اليومي.",
      materials: [
        "خزائن مطلية",
        "لامينيت عالي الضغط",
        "زجاج مخدد",
        "أسطح كوارتز",
        "إضاءة مدمجة",
        "مفصلات إغلاق هادئ",
      ],
      steps: [
        ["الاكتشاف", "نراجع المساحة وطريقة الاستخدام وما تحتاج إلى تخزينه."],
        [
          "القياس والتخطيط",
          "تحدد أبعاد الموقع والخدمات والأجهزة والحركة شكل التصميم.",
        ],
        [
          "تحديد المواصفات",
          "ننسق الواجهات والأسطح والتجهيزات الداخلية والإضاءة والمفصلات.",
        ],
        [
          "التصنيع والتركيب",
          "يتم تصنيع الخزائن وتركيبها ومحاذاتها بعناية في الموقع.",
        ],
      ],
    },
  },
  washrooms: {
    collection: "washroom-tiles" as CatalogOffering["collection"],
    en: {
      eyebrow: "Washroom renovation",
      title: "Beautiful surfaces, precisely resolved.",
      intro:
        "NESTRO connects tile selection with site assessment, preparation, setting-out, installation, grouting and finishing for a washroom that feels considered as a whole.",
      hero: "/images/collections/washroom-tiles.webp",
      section: "A finish for every washroom mood.",
      material: "Surfaces coordinated from tile to final joint.",
      materials: [
        "Marble-look porcelain",
        "Stone-look porcelain",
        "Feature ceramics",
        "Porcelain mosaic",
        "Low-slip floor finishes",
        "Coordinated grout",
      ],
      steps: [
        [
          "Consult",
          "We understand the room, preferred atmosphere and renovation scope.",
        ],
        [
          "Assess & prepare",
          "Existing surfaces, dimensions, access and substrate condition are reviewed.",
        ],
        [
          "Set out",
          "Tile format, pattern direction, joints, trims and transitions are planned.",
        ],
        [
          "Install & finish",
          "Tiles are cut and fitted, then grouted, finished and handed over.",
        ],
      ],
    },
    ar: {
      eyebrow: "تجديد الحمامات",
      title: "أسطح جميلة بتفاصيل محسوبة.",
      intro:
        "تربط نسترو اختيار البلاط بمعاينة الموقع والتحضير والتخطيط والتركيب والجراوت والتشطيب لحمام متناسق ككل.",
      hero: "/images/collections/washroom-tiles.webp",
      section: "تشطيب يناسب كل أجواء الحمام.",
      material: "أسطح منسقة من البلاطة حتى الفاصل النهائي.",
      materials: [
        "بورسلان بمظهر الرخام",
        "بورسلان بمظهر الحجر",
        "سيراميك مميز",
        "فسيفساء بورسلان",
        "تشطيبات أرضية مقاومة للانزلاق",
        "جراوت متناسق",
      ],
      steps: [
        ["الاستشارة", "نفهم المساحة والأجواء المطلوبة ونطاق التجديد."],
        [
          "المعاينة والتحضير",
          "نراجع الأسطح الحالية والأبعاد وسهولة الوصول وحالة القاعدة.",
        ],
        ["التخطيط", "نحدد المقاس واتجاه النقشة والفواصل والحواف والانتقالات."],
        [
          "التركيب والتشطيب",
          "يتم قص البلاط وتركيبه ثم تنفيذ الجراوت والتشطيب والتسليم.",
        ],
      ],
    },
  },
};

export function InteriorCategoryHub({
  kind,
  locale = "en",
}: {
  kind: HubKind;
  locale?: Locale;
}) {
  const ar = locale === "ar",
    page = content[kind][locale],
    Arrow = ar ? ArrowLeft : ArrowRight;
  const offerings = catalog.filter(
    (item) => item.collection === content[kind].collection,
  );
  return (
    <div dir={ar ? "rtl" : "ltr"}>
      <section className="relative min-h-[72svh] overflow-hidden bg-charcoal text-white">
        <Image
          src={page.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="photo-overlay absolute inset-0" />
        <div className="container-site relative flex min-h-[72svh] items-end py-16 md:items-center">
          <div data-motion="fade-rise" className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[.2em] text-brass">
              {page.eyebrow}
            </span>
            <h1 className="display mt-6">{page.title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75">
              {page.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ConsultationButton className="button button-primary" />
              <Link
                href="#offerings"
                className="button button-ivory"
              >
                {ar ? "استكشف الخيارات" : "Explore options"} <Arrow size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="offerings" className="section">
        <div className="container-site">
          <span className="eyebrow">{ar ? "المجموعة" : "The collection"}</span>
          <h2 className="heading mt-5">{page.section}</h2>
          <div data-motion-group="stagger" className="mt-12 grid gap-5 md:grid-cols-3">
            {offerings.map((item) => (
              <ProductCard key={item.slug} product={item} locale={locale} />
            ))}
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container-site grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div data-motion="slide-start">
            <span className="eyebrow">
              {ar ? "الخامات والتشطيبات" : "Materials & finishes"}
            </span>
            <h2 className="heading mt-5">{page.material}</h2>
          </div>
          <div data-motion-group="stagger" className="grid gap-3 sm:grid-cols-2">
            {page.materials.map((material) => (
              <div
                className="surface-card flex items-center gap-3 p-5"
                key={material}
              >
                <CheckCircle2 className="shrink-0 text-brass" size={19} />
                <span className="font-medium">{material}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-bronze">
        <div className="container-site">
          <span className="text-xs font-bold uppercase tracking-[.18em] text-brass">
            {ar ? "من الفكرة إلى التسليم" : "From idea to handover"}
          </span>
          <div data-motion-group="stagger" className="mt-10 grid gap-3 md:grid-cols-4">
            {page.steps.map(([title, copy], index) => (
              <div className="process-stage-card p-7 text-charcoal" key={title}>
                <small className="process-number-badge">0{index + 1}</small>
                <h3 className="mt-5 text-xl font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/60">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div data-motion-group="stagger" className="container-site grid gap-7 text-center md:grid-cols-3">
          {[
            ar ? "دبي" : "Dubai",
            ar ? "أبوظبي" : "Abu Dhabi",
            ar ? "الشارقة والإمارات الشمالية" : "Sharjah & Northern Emirates",
          ].map((area) => (
            <div className="surface-card p-7" key={area}>
              <MapPin className="mx-auto text-brass" />
              <h3 className="mt-4 text-xl font-medium">{area}</h3>
              <p className="mt-2 text-sm text-black/55">
                {ar
                  ? "استشارة وقياس وتركيب."
                  : "Consultation, measurement and installation."}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="px-4 pb-4">
        <div data-motion="scale-in" className="consultation-gold-panel relative mx-auto max-w-[95rem] overflow-hidden rounded-3xl px-6 py-16 text-center text-white md:py-24">
          <h2 className="heading mx-auto max-w-3xl">
            {ar
              ? "ابدأ بمساحتك. وسنساعدك في حل كل التفاصيل."
              : "Begin with your space. We’ll resolve every detail."}
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-charcoal/65">
            {ar
              ? "شاركنا الأبعاد والصور وأفكارك للحصول على مقترح مصمم حسب مشروعك."
              : "Share dimensions, photographs and references for a proposal shaped around your project."}
          </p>
          <ConsultationButton className="button button-dark mt-8" />
        </div>
      </section>
    </div>
  );
}
