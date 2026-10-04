import type { Metadata } from "next";
import { CustomFurnitureView } from "@/components/pages/CustomFurnitureView";

export const metadata: Metadata = {
  title: "أثاث حسب الطلب في الإمارات",
  description: "صمم أرائك وأسرّة وألواح رأس وخزائن ووحدات تخزين حسب المقاس مع استوديو NESTRO للأثاث المخصص.",
  alternates: { canonical: "/ar/custom-furniture/", languages: { en: "/custom-furniture/", ar: "/ar/custom-furniture/" } },
};

export default function ArabicCustomFurniturePage() { return <CustomFurnitureView locale="ar" />; }
