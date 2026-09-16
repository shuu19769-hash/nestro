import { Award, BriefcaseBusiness, MapPinned, Users } from "lucide-react";
const content = {
  en: {
    eyebrow: "Why choose NESTRO",
    title: "Experience you can trust.",
    copy: "Decades of specialist experience, thousands of customers and one accountable service from consultation through installation.",
    items: [
      {
        value: "25+",
        label: "Years of experience",
        copy: "More than 25 years serving homes and businesses with specialist interior solutions.",
        icon: Award,
      },
      {
        value: "5,000+",
        label: "Customers served",
        copy: "Thousands of residential and commercial customers supported from consultation to installation.",
        icon: Users,
      },
      {
        value: "49",
        label: "Specialist offerings",
        copy: "Furniture, kitchens, window treatments, upholstery and washroom finishes through one team.",
        icon: BriefcaseBusiness,
      },
      {
        value: "7",
        label: "Emirates served",
        copy: "Measurement, delivery and professional installation throughout the UAE.",
        icon: MapPinned,
      },
    ],
  },
  ar: {
    eyebrow: "لماذا نسترو",
    title: "خبرة يمكنك الوثوق بها.",
    copy: "عقود من الخبرة المتخصصة وآلاف العملاء وخدمة متكاملة من الاستشارة حتى التركيب.",
    items: [
      {
        value: "+25",
        label: "عاماً من الخبرة",
        copy: "أكثر من 25 عاماً في خدمة المنازل والأعمال بحلول داخلية متخصصة.",
        icon: Award,
      },
      {
        value: "+5,000",
        label: "عميل تمت خدمتهم",
        copy: "آلاف العملاء في المشاريع السكنية والتجارية من الاستشارة حتى التركيب.",
        icon: Users,
      },
      {
        value: "49",
        label: "خياراً متخصصاً",
        copy: "أثاث ومطابخ وستائر وتنجيد وتشطيبات حمامات من خلال فريق واحد.",
        icon: BriefcaseBusiness,
      },
      {
        value: "7",
        label: "إمارات نخدمها",
        copy: "القياس والتوصيل والتركيب الاحترافي في جميع أنحاء الإمارات.",
        icon: MapPinned,
      },
    ],
  },
};
export function TrustBar({ locale = "en" }: { locale?: "en" | "ar" }) {
  const section = content[locale];
  return (
    <section
      className="border-b border-sage/20 bg-ivory"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="container-site py-12 md:py-16">
        <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <span className="eyebrow">{section.eyebrow}</span>
            <h2 className="mt-5 text-3xl font-medium leading-tight md:text-4xl">
              {section.title}
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-black/60 lg:justify-self-end md:text-base">
            {section.copy}
          </p>
        </div>
        <div data-motion-group="stagger" className="mt-9 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {section.items.map((item) => (
            <div key={item.label} data-motion="counter" className="surface-card p-4 sm:p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sage text-ivory">
                <item.icon size={18} />
              </span>
              <strong data-counter={item.value} className="mt-5 block text-xl font-medium leading-tight text-charcoal sm:text-2xl">
                {item.value}
              </strong>
              <span className="mt-2 block text-[10px] font-bold uppercase tracking-[.13em] text-sage">
                {item.label}
              </span>
              <p className="mt-3 hidden text-xs leading-6 text-black/55 sm:block">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
