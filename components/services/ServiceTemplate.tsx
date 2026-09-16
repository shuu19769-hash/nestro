import Image from "next/image";
import Link from "@/components/shared/StaticLink";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ConsultationButton } from "@/components/shared/ClientActions";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { processFor } from "@/lib/editorial";
import type { Locale } from "@/types";

type ServiceTemplateProps = {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  benefits: { title: string; copy: string }[];
  materials: string[];
  startingPrice?: string;
  children?: React.ReactNode;
  locale?: Locale;
};

export function ServiceTemplate({
  eyebrow,
  title,
  intro,
  image,
  benefits,
  materials,
  startingPrice,
  children,
  locale = "en",
}: ServiceTemplateProps) {
  const ar = locale === "ar";
  const process = processFor(locale);
  return (
    <div dir={ar ? "rtl" : "ltr"}>
      <section className="container-site grid gap-10 py-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:py-20">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="display mt-6">{title}</h1>
          <p className="subheading mt-7">{intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ConsultationButton />
            <Link href="#process" className="button button-outline">
              {ar ? "اطّلع على عمليتنا" : "See our process"} <ArrowRight className={ar ? "rotate-180" : ""} size={16} />
            </Link>
          </div>
        </div>
        <div className="card-image relative aspect-[5/4] overflow-hidden rounded-3xl">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        </div>
      </section>
      <section className="section section-soft border-y fine-border">
        <div className="container-site">
          <SectionHeading
            eyebrow={ar ? "لماذا NESTRO" : "Why NESTRO"}
            title={ar ? "تصميم متقن. وصناعة بعناية." : "Designed well. Made with care."}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="surface-card interactive-card p-7"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-sage/10 text-sage">
                  {index === 0 ? (
                    <Sparkles size={20} />
                  ) : index === 1 ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <ShieldCheck size={20} />
                  )}
                </span>
                <h3 className="mt-6 text-xl font-medium">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/55">
                  {benefit.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="process" className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow={ar ? "كيف نعمل" : "How it works"}
            title={ar ? "مسار واضح من الفكرة إلى التركيب." : "A clear path from idea to installation."}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {process.map((step) => (
              <div
                key={step.number}
                className="surface-card interactive-card p-6"
              >
                <span className="text-xs font-bold text-brass">
                  {step.number}
                </span>
                <h3 className="mt-6 text-lg font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/55">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow={ar ? "مكتبة الخامات" : "Material library"}
            title={ar ? "مجموعة خامات مصممة حول منزلك." : "A palette built around your home."}
            copy={ar ? "يساعدك الاستوديو على مقارنة اللون والملمس والأداء وطريقة التقادم، لا المظهر وحده." : "Our studio helps you compare colour, texture, performance and ageing—not just appearance."}
          />
          <div className="grid grid-cols-2 gap-3">
            {materials.map((material, index) => (
              <div
                key={material}
                className="rounded-2xl p-6 shadow-sm"
                style={{
                  background: [
                    "var(--surface-secondary)",
                    "var(--gold-100)",
                    "var(--gold-300)",
                    "var(--gold-500)",
                    "var(--gold-700)",
                    "var(--gold-800)",
                  ][index % 6],
                  color: index > 3 ? "var(--text-on-bronze)" : "var(--text-on-gold)",
                }}
              >
                <span className="text-xs font-bold uppercase tracking-[.12em]">
                  {material}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {children}
      {startingPrice && (
        <section className="section">
          <div className="container-site surface-card p-8 md:flex md:items-center md:justify-between md:p-12">
            <div>
              <span className="eyebrow">{ar ? "عرض مخصص" : "A tailored proposal"}</span>
              <h2 className="mt-5 text-3xl font-medium">
                {ar ? `تسعير استرشادي ${startingPrice}` : `Indicative pricing ${startingPrice}`}
              </h2>
              <p className="mt-3 text-sm text-black/55">
                {ar ? "يعكس السعر النهائي الأبعاد والخامات والتشطيب ومتطلبات التركيب." : "Final pricing reflects dimensions, materials, finish and installation requirements."}
              </p>
            </div>
            <ConsultationButton className="button button-dark mt-7 md:mt-0">
              {ar ? "اطلب عرض سعر" : "Request a quote"}
            </ConsultationButton>
          </div>
        </section>
      )}
      <section className="section section-gold">
        <div className="container-site grid gap-8 text-center md:grid-cols-3">
          {(ar ? ["دبي", "أبوظبي", "الشارقة والإمارات الشمالية"] : ["Dubai", "Abu Dhabi", "Sharjah & Northern Emirates"]).map((area) => (
            <div key={area}>
              <MapPin className="mx-auto text-brass" />
              <h3 className="mt-4 text-xl font-medium">{area}</h3>
              <p className="mt-2 text-sm text-white/60">
                {ar ? "استشارة وقياس وتركيب." : "Consultation, measurement and installation."}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container-site max-w-4xl text-center">
          <span className="eyebrow before:hidden">{ar ? "ابدأ المحادثة" : "Start a conversation"}</span>
          <h2 className="heading mt-6">
            {ar ? "شاركنا الغرفة، وسنساعدك على حسم التفاصيل." : "Bring us the room. We’ll help resolve the details."}
          </h2>
          <ConsultationButton className="button button-primary mt-8" />
        </div>
      </section>
    </div>
  );
}
