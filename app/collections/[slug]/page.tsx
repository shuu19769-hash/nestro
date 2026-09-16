import Image from "next/image";
import Link from "@/components/shared/StaticLink";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/shop/ProductCard";
import { catalog, catalogCollections } from "@/lib/catalog";
export function generateStaticParams() {
  return catalogCollections.map((x) => ({ slug: x.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params,
    c = catalogCollections.find((x) => x.slug === slug);
  if (!c) notFound();
  const items = catalog.filter((x) => x.collection === slug),
    materials = Array.from(
      new Set(items.flatMap((x) => x.materials.map((m) => m.name.en))),
    ).slice(0, 10);
  return (
    <>
      <section className="relative min-h-[620px] overflow-hidden bg-charcoal text-white">
        <Image
          src={c.image}
          alt={c.name.en}
          fill
          priority
          className="object-cover opacity-65"
        />
        <div className="photo-overlay absolute inset-0" />
        <div className="container-site relative flex min-h-[620px] items-end py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-white/65">
              {c.count} made-to-measure offerings
            </p>
            <h1 className="display mt-6">{c.name.en}</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/70">
              Compare types, materials and configurations, then use the
              estimator on each detail page to prepare a useful brief.
            </p>
            <Link
              href={`/shop?collection=${c.slug}`}
              className="button mt-8 bg-ivory text-charcoal"
            >
              Filter this collection
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-site">
          <p className="eyebrow">Material explorer</p>
          <h2 className="heading mt-5">
            Performance starts with the right surface.
          </h2>
          <div className="mt-9 flex flex-wrap gap-3">
            {materials.map((x) => (
              <span
                key={x}
                className="rounded-full border fine-border px-5 py-3 text-sm"
              >
                {x}
              </span>
            ))}
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((x) => (
              <ProductCard key={x.slug} product={x} />
            ))}
          </div>
        </div>
      </section>
      <section className="section section-bronze">
        <div className="container-site grid gap-5 md:grid-cols-4">
          {["Discover", "Measure", "Specify", "Make & fit"].map((x, i) => (
              <div key={x} className="rounded-2xl border border-white/20 bg-white/10 p-6">
                <small className="text-ivory">0{i + 1}</small>
              <h2 className="mt-4 text-2xl font-medium">{x}</h2>
              <p className="mt-3 text-sm leading-6 text-white/55">
                A clear checkpoint keeps choices, dimensions and site
                requirements aligned.
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
