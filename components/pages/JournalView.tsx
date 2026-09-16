import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/shared/StaticLink";
import { ArrowRight } from "lucide-react";
import { journalFor } from "@/lib/editorial";
import type { Locale } from "@/types";

export const metadata: Metadata = { title: "The NESTRO Journal", description: "Ideas on interiors, furniture, materials and considered living in the UAE." };

export function JournalView({ locale = "en" }: { locale?: Locale }) {
  const ar = locale === "ar", prefix = ar ? "/ar" : "";
  const [featured, ...posts] = journalFor(locale);
  return <div dir={ar ? "rtl" : "ltr"}>
    <section className="container-site pb-12 pt-16 md:pb-20 md:pt-24"><span className="eyebrow">{ar ? "المجلة" : "The journal"}</span><h1 className="display mt-6">{ar ? "ملاحظات لحياة أكثر عناية." : "Notes for considered living."}</h1><p className="subheading mt-7">{ar ? "أفكار وخامات وإرشادات عملية لتجعل الغرف أجمل وتحافظ عليها كذلك." : "Ideas, materials and practical guidance for making rooms feel better—and keeping them that way."}</p></section>
    <section className="container-site pb-16"><Link href={`${prefix}/journal/${featured.slug}`} className="group section-bronze grid overflow-hidden rounded-3xl lg:grid-cols-[1.2fr_.8fr]"><div className="relative min-h-[420px]"><Image src={featured.image} alt={featured.title} fill priority className="object-cover" /></div><div className="flex flex-col justify-center p-8 md:p-12"><p className="text-xs font-bold uppercase tracking-[.16em] text-white/55">{ar ? "مختار" : "Featured"} · {featured.category}</p><h2 className="mt-5 text-4xl font-medium">{featured.title}</h2><p className="mt-5 text-sm leading-7 text-white/65">{featured.excerpt}</p><span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">{ar ? "اقرأ المقال" : "Read story"} <ArrowRight className={ar ? "rotate-180" : ""} size={17} /></span></div></Link></section>
    <section className="container-site grid gap-x-5 gap-y-14 pb-24 sm:grid-cols-2 lg:grid-cols-3">{posts.map((post) => <Link key={post.slug} href={`${prefix}/journal/${post.slug}`} className="group"><div className="card-image relative aspect-[4/3] rounded-2xl"><Image src={post.image} alt={post.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" /></div><p className="mt-5 text-[10px] font-bold uppercase tracking-[.16em] text-sage">{post.category} · {post.readTime}</p><h2 className="mt-2 text-2xl font-medium">{post.title}</h2><p className="mt-3 text-sm leading-6 text-black/55">{post.excerpt}</p></Link>)}</section>
  </div>;
}
