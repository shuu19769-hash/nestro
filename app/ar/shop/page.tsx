import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopClient } from "@/components/shop/ShopClient";
import { catalog } from "@/lib/catalog";
export const metadata: Metadata = {
  title: "أثاث ومطابخ وستائر وتنجيد وبلاط",
  description:
    "استكشف جميع خيارات نسترو الـ49 للأثاث والمطابخ والستائر والتنجيد وبلاط الحمامات في الإمارات.",
  alternates: {
    canonical: "/ar/shop",
    languages: { en: "/shop", ar: "/ar/shop" },
  },
};
export default function Page() {
  return (
    <div dir="rtl">
      <section className="container-site pb-12 pt-16 md:pb-16 md:pt-24">
        <span className="eyebrow">كتالوج نسترو الكامل</span>
        <h1 className="display mt-6 max-w-5xl">
          49 طريقة
          <br />
          لتجعل المكان يعبر عنك.
        </h1>
        <p className="subheading mt-7">
          قارن الأثاث والمطابخ والستائر والتنجيد وتشطيبات الحمامات، ثم جهز طلب
          عرض سعر واضحاً لمشروعك.
        </p>
      </section>
      <Suspense
        fallback={
          <div className="container-site min-h-96 py-12">
            جارٍ تحميل الكتالوج…
          </div>
        }
      >
        <ShopClient products={catalog} locale="ar" />
      </Suspense>
    </div>
  );
}
