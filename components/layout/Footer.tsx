"use client";

import Image from "next/image";
import Link from "@/components/shared/StaticLink";
import { ArrowUpRight, Instagram } from "lucide-react";
import { usePathname } from "next/navigation";
import site from "@/data/site-config.json";
import { CONTACT, whatsappUrl } from "@/lib/constants";
import { mailtoHref } from "@/lib/enquiry";

const arabicLocations = [
  { city: "دبي", address: "القوز · بموعد مسبق" },
  { city: "أبوظبي", address: "استشارات التصميم · بموعد مسبق" },
  { city: "الشارقة", address: "زيارات منزلية متاحة" },
];

const englishNav = [
  { label: "Collections", href: "/collections" },
  { label: "Custom furniture", href: "/custom-furniture" },
  { label: "Kitchens", href: "/kitchens" },
  { label: "Washroom tiles", href: "/washroom-tiles" },
  { label: "Contact", href: "/contact" },
];

const arabicNav = [
  { label: "المجموعات", href: "/collections" },
  { label: "أثاث حسب الطلب", href: "/custom-furniture" },
  { label: "المطابخ", href: "/kitchens" },
  { label: "بلاط الحمامات", href: "/washroom-tiles" },
  { label: "تواصل معنا", href: "/contact" },
];

export function Footer() {
  const ar = usePathname().startsWith("/ar");
  const prefix = ar ? "/ar" : "";
  const locations = ar ? arabicLocations : site.locations;
  const nav = ar ? arabicNav : englishNav;

  return (
    <footer className="showroom-footer text-white" dir={ar ? "rtl" : "ltr"}>
      <div className="h-px bg-gold-gradient" />
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_.7fr] lg:py-24">
        <div>
          <Link href={prefix || "/"} className="inline-flex w-[133px]" aria-label={ar ? "الصفحة الرئيسية لنسترو" : "NESTRO home"}>
            <Image src="/brand/nestro-full-lockup-ivory.png" alt="NESTRO" width={133} height={96} className="h-auto w-full object-contain" />
          </Link>
          <p className="mt-7 max-w-md text-sm leading-7 text-white/70">
            {ar ? "أثاث ومطابخ وتشطيبات داخلية مصممة لإيقاع الحياة في الإمارات، بعناية وهدف واضح." : "Furniture, kitchens and interior finishes shaped around the rhythm of life in the UAE. Designed with care, crafted with purpose."}
          </p>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 border-b border-brand pb-1 text-sm text-brass transition hover:text-white">
            {ar ? "ابدأ محادثة" : "Start a conversation"}<ArrowUpRight size={16} />
          </a>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-brass">{ar ? "استكشف" : "Explore"}</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/75">
            {nav.map((item) => <Link href={`${prefix}${item.href}`} key={item.href} className="transition hover:text-brass">{item.label}</Link>)}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-brass">{ar ? "تواصل معنا" : "Visit & connect"}</p>
          <div className="mt-5 space-y-4 text-sm text-white/70">
            {locations.map((location) => <p key={location.city}><strong className="block font-medium text-white">{location.city}</strong>{location.address}</p>)}
            <p>{ar ? "السبت–الخميس · 8:00 صباحاً–9:00 مساءً" : site.hours}</p>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="block transition hover:text-brass" dir="ltr">{CONTACT.phone}</a>
            <a href={mailtoHref(ar ? "ar" : "en")} className="block break-all transition hover:text-brass" dir="ltr">{CONTACT.email}</a>
          </div>
        </div>
      </div>
      <div className="container-site flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} NESTRO. {ar ? "جميع الحقوق محفوظة." : "All rights reserved."}</p>
        <div className="flex items-center gap-5"><Link href={`${prefix}/contact`}>{ar ? "الخصوصية" : "Privacy"}</Link><Link href={`${prefix}/contact`}>{ar ? "الشروط" : "Terms"}</Link><a href="#" aria-label="Instagram"><Instagram size={16} /></a></div>
      </div>
    </footer>
  );
}
