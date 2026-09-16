import Image from "next/image";
import Link from "@/components/shared/StaticLink";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/shop/ProductCard";
import { catalog, catalogCollections } from "@/lib/catalog";
export function generateStaticParams() {
  return catalogCollections.map((x) => ({ slug: x.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params, collection = catalogCollections.find((item) => item.slug === slug); return { title: collection?.name.ar || "مجموعة NESTRO", description: collection ? `استكشف ${collection.count} خياراً ضمن مجموعة ${collection.name.ar} من NESTRO.` : undefined, alternates: { canonical: `/ar/collections/${slug}/`, languages: { en: `/collections/${slug}/`, ar: `/ar/collections/${slug}/` } } }; }
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params,
    c = catalogCollections.find((x) => x.slug === slug);
  if (!c) notFound();
  const items = catalog.filter((x) => x.collection === slug);
  return (
    <div dir="rtl">
      <section className="relative min-h-[560px] bg-charcoal text-white">
        <Image
          src={c.image}
          alt={c.name.ar}
          fill
          className="object-cover opacity-60"
        />
        <div className="photo-overlay absolute inset-0" />
        <div className="container-site relative flex min-h-[560px] items-end py-16">
          <div>
            <p>{c.count} خياراً حسب الطلب</p>
            <h1 className="display mt-5">{c.name.ar}</h1>
            <Link
              href={`/ar/shop?collection=${c.slug}`}
              className="button mt-8 bg-ivory text-charcoal"
            >
              صفِّ هذه المجموعة
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-site grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((x) => (
            <ProductCard key={x.slug} product={x} locale="ar" />
          ))}
        </div>
      </section>
    </div>
  );
}
import type { Metadata } from "next";
