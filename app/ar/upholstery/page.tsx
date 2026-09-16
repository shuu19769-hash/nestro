import type { Metadata } from "next";
import { CatalogServiceHub } from "@/components/services/CatalogServiceHub";
export const metadata: Metadata = { title: "تنجيد داخلي وخارجي في الإمارات", description: "استكشف خدمات NESTRO لتنجيد الأرائك والأسرّة والكراسي والجدران والجلسات الخارجية.", alternates: { canonical: "/ar/upholstery/", languages: { en: "/upholstery/", ar: "/ar/upholstery/" } } };
export default function Page(){return <CatalogServiceHub kind="upholstery" locale="ar"/>}
