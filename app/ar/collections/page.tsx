import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/shared/StaticLink";
import { catalogCollections } from "@/lib/catalog";
export const metadata: Metadata = { title: "مجموعات NESTRO", description: "استكشف سبع مجموعات متخصصة للأثاث والمطابخ والستائر والتنجيد وبلاط الحمامات.", alternates: { canonical: "/ar/collections/", languages: { en: "/collections/", ar: "/ar/collections/" } } };
export default function Page() {
  return (
    <div dir="rtl">
      <section className="container-site pb-14 pt-20">
        <span className="eyebrow">سبع مجموعات متخصصة</span>
        <h1 className="display mt-6">
          مصمم للمقاس.
          <br />
          مصنوع لينتمي.
        </h1>
      </section>
      <section className="container-site grid gap-5 pb-24 md:grid-cols-2">
        {catalogCollections.map((c) => (
          <Link href={`/ar/collections/${c.slug}`} key={c.slug}>
            <div className="card-image relative aspect-[4/3] rounded-2xl">
              <Image
                src={c.image}
                alt={c.name.ar}
                fill
                className="object-cover"
              />
              <div className="photo-overlay-bottom absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <h2 className="text-3xl font-medium">{c.name.ar}</h2>
                <p className="mt-2 text-sm text-white/60">{c.count} خياراً</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
