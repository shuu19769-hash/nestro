import type { Metadata } from "next";
import { HomeView } from "@/components/pages/HomeView";

export const metadata: Metadata = {
  title: "NESTRO — أثاث وتصميم داخلي في الإمارات",
  description: "أثاث حسب الطلب ومطابخ وستائر وتنجيد وتشطيبات حمامات مصممة للمساحات في دولة الإمارات.",
  alternates: { canonical: "/ar/", languages: { en: "/", ar: "/ar/" } },
  openGraph: {
    title: "NESTRO — أثاث وتصميم داخلي في الإمارات",
    description: "أثاث وتصميمات داخلية مدروسة حول طريقة حياتك في الإمارات.",
    images: ["/images/nestro-hero.webp"],
    locale: "ar_AE",
  },
};

export default function ArabicHomePage() {
  return <HomeView locale="ar" />;
}
