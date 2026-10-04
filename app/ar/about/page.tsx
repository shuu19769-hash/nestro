import type { Metadata } from "next";
import { AboutView } from "@/components/pages/AboutView";

export const metadata: Metadata = {
  title: "عن NESTRO",
  description: "تعرّف إلى NESTRO، استوديو إماراتي للأثاث والتصميم الداخلي قائم على التصميم المدروس والخامات الصادقة والحِرفة التي تدوم.",
  alternates: { canonical: "/ar/about/", languages: { en: "/about/", ar: "/ar/about/" } },
};

export default function ArabicAboutPage() { return <AboutView locale="ar" />; }
