import Image from "next/image";
import Link from "@/components/shared/StaticLink";
import { ArrowRight } from "lucide-react";
import { catalogCollections } from "@/lib/catalog";
export default function Page() {
  return (
    <>
      <section className="container-site pb-14 pt-20">
        <span className="eyebrow">Seven specialist collections</span>
        <h1 className="display mt-6">
          Made to fit.
          <br />
          Built to belong.
        </h1>
        <p className="subheading mt-7">
          Move from broad inspiration to a practical specification across
          furniture, kitchens, window treatments, upholstery and washroom
          surfaces.
        </p>
      </section>
      <section className="container-site grid gap-5 pb-24 md:grid-cols-2">
        {catalogCollections.map((c, i) => (
          <Link
            href={`/collections/${c.slug}`}
            key={c.slug}
            className={i === 0 ? "md:col-span-2" : ""}
          >
            <div
              className={`card-image relative rounded-2xl ${i === 0 ? "aspect-[16/7]" : "aspect-[4/3]"}`}
            >
              <Image
                src={c.image}
                alt={c.name.en}
                fill
                className="object-cover"
              />
              <div className="photo-overlay-bottom absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <p className="text-xs uppercase tracking-widest text-white/60">
                  {c.count} offerings
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <h2 className="text-3xl font-medium">{c.name.en}</h2>
                  <ArrowRight />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
