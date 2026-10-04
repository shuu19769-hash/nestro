import type { Metadata } from "next";
import { CatalogServiceHub } from "@/components/services/CatalogServiceHub";
export const metadata: Metadata = { title: "ستائر وحجب ضوء حسب المقاس في الإمارات", description: "استكشف ستائر NESTRO والأنظمة الآلية وخدمات القياس والتركيب في أنحاء الإمارات.", alternates: { canonical: "/ar/blinds-curtains/", languages: { en: "/blinds-curtains/", ar: "/ar/blinds-curtains/" } } };
export default function Page(){return <CatalogServiceHub kind="windows" locale="ar"/>}
