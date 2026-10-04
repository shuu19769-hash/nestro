import type { Metadata } from "next";
import { InteriorSolutionsView } from "@/components/pages/InteriorSolutionsView";

export const metadata: Metadata = {
  title: "حلول التصميم الداخلي في الإمارات",
  description: "حلول NESTRO للتصميم الداخلي للمنازل ومساحات الضيافة والمكاتب والمشاريع التجارية في الإمارات.",
  alternates: { canonical: "/ar/interior-solutions/", languages: { en: "/interior-solutions/", ar: "/ar/interior-solutions/" } },
};

export default function ArabicInteriorSolutionsPage() { return <InteriorSolutionsView locale="ar" />; }
