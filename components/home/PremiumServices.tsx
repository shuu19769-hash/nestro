"use client";

import Image from "next/image";
import Link from "@/components/shared/StaticLink";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import type { Locale } from "@/types";

const filters = ["All services", "Custom furniture", "Blinds", "Curtains", "Upholstery"] as const;
type Filter = (typeof filters)[number];

const services = [
  { title: "Custom furniture", text: "Furniture composed to your proportions, materials and way of living.", href: "/custom-furniture", image: "/images/collections/custom-furniture.webp", filters: ["Custom furniture"] },
  { title: "Blinds & curtains", text: "Made-to-measure window treatments, from layered sheers to motorized systems.", href: "/blinds-curtains", image: "/images/collections/curtains.webp", filters: ["Blinds", "Curtains"] },
  { title: "Upholstery services", text: "Restoration and tailored indoor and outdoor upholstery for every requirement.", href: "/upholstery", image: "/images/collections/indoor-upholstery.webp", filters: ["Upholstery"] },
  { title: "Kitchen cabinetry", text: "Measured, planned and installed cabinetry shaped around storage and daily movement.", href: "/kitchens", image: "/images/collections/kitchen-cabinets.webp", filters: ["Custom furniture"] },
  { title: "Washroom tiles", text: "Tile selection, renovation preparation and precise installation resolved as one service.", href: "/washroom-tiles", image: "/images/collections/washroom-tiles.webp", filters: ["Custom furniture"] },
];

export function PremiumServices({ locale = "en" }: { locale?: Locale }) {
  const ar = locale === "ar";
  const [activeFilter, setActiveFilter] = useState<Filter>("All services");
  const visibleServices = activeFilter === "All services" ? services : services.filter((service) => service.filters.includes(activeFilter));
  const filterLabels: Record<Filter, string> = { "All services": "كل الخدمات", "Custom furniture": "أثاث حسب الطلب", Blinds: "ستائر عصرية", Curtains: "ستائر", Upholstery: "تنجيد" };
  const serviceArabic: Record<string, [string, string]> = {
    "Custom furniture": ["أثاث حسب الطلب", "أثاث مصمم وفق مقاساتك وخاماتك وطريقة حياتك."],
    "Blinds & curtains": ["الستائر والحجب", "معالجات نوافذ حسب المقاس، من الطبقات الشفافة إلى الأنظمة الآلية."],
    "Upholstery services": ["خدمات التنجيد", "ترميم وتنجيد داخلي وخارجي حسب كل احتياج."],
    "Kitchen cabinetry": ["خزائن المطابخ", "خزائن مقاسة ومخططة ومركبة حول التخزين والحركة اليومية."],
    "Washroom tiles": ["بلاط الحمامات", "اختيار البلاط وتحضير التجديد والتركيب الدقيق كخدمة واحدة متكاملة."],
  };
  return <section id="services" className="section scroll-mt-28 overflow-hidden" dir={ar ? "rtl" : "ltr"}><div className="container-site"><div className="mx-auto max-w-5xl text-center"><span className="eyebrow">{ar ? "ما نقدمه" : "What we offer"}</span><h2 className="heading mt-5">{ar ? "خدماتنا المميزة" : "Our Premium Services"}</h2><p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-black/60 md:text-lg">{ar ? "من تصنيع الأثاث حسب الطلب إلى التركيب الاحترافي، نقدم حِرفة راقية لكل مشروع في أنحاء الإمارات." : "From custom furniture manufacturing to professional installation, we bring refined craft to every project across the UAE."}</p><div className="mt-8 flex flex-wrap justify-center gap-2.5" role="tablist" aria-label={ar ? "فئات الخدمات" : "Service categories"}>{filters.map((filter) => <button key={filter} type="button" role="tab" aria-selected={activeFilter === filter} onClick={() => setActiveFilter(filter)} className={`rounded-full px-5 py-3 text-sm font-semibold transition ${activeFilter === filter ? "bg-brand text-on-gold shadow-[0_10px_24px_rgba(111,78,25,.2)]" : "bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:bg-[var(--gold-100)] hover:text-[var(--gold-900)]"}`}>{ar ? filterLabels[filter] : filter}</button>)}</div></div><div data-motion-group="stagger" className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">{visibleServices.map((service) => { const translated = serviceArabic[service.title]; return <Link href={`${ar ? "/ar" : ""}${service.href}`} key={service.title} data-motion="scale-in" className="group relative min-h-[390px] overflow-hidden rounded-xl"><Image src={service.image} alt={ar ? translated[0] : service.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 20vw" className="object-cover transition duration-700 group-hover:scale-105" /><div className="photo-overlay-bottom absolute inset-0" /><span className="absolute start-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-bold text-on-gold shadow-sm"><Sparkles size={13} /> {ar ? "شائع" : "Popular"}</span><div className="absolute inset-x-0 bottom-0 p-6 text-white"><h3 className="text-2xl font-medium">{ar ? translated[0] : service.title}</h3><p className="mt-2 text-sm leading-6 text-white/75">{ar ? translated[1] : service.text}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-[var(--gold-100)]">{ar ? "اكتشف" : "Discover"} <ArrowRight className={ar ? "rotate-180" : ""} size={15} /></span></div></Link>;})}</div></div></section>;
}
