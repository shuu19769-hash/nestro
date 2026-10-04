import Image from "next/image";
import Link from "@/components/shared/StaticLink";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { localized } from "@/lib/catalog";
import type { CatalogOffering, Locale } from "@/types";

export function ProductCard({
  product,
  locale = "en",
}: {
  product: CatalogOffering;
  locale?: Locale;
}) {
  const ar = locale === "ar";
  const prefix = ar ? "/ar" : "";
  const Arrow = ar ? ArrowLeft : ArrowRight;

  return (
    <article
      data-motion="scale-in"
      className="group surface-card interactive-card overflow-hidden"
      dir={ar ? "rtl" : "ltr"}
    >
      <Link
        prefetch={false}
        href={`${prefix}/shop/${product.slug}`}
        className="block"
      >
        <div className="card-image relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={localized(product.name, locale)}
            fill
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute start-3 top-3 rounded-full border border-white/50 bg-ivory/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-charcoal shadow-sm backdrop-blur">
            {ar ? "حسب الطلب" : "Made to measure"}
          </span>
          <span className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl bg-ivory/92 px-4 py-3 text-sm font-bold text-charcoal shadow-lg backdrop-blur-sm">
            <span>{ar ? "عرض الخدمة" : "Explore service"}</span>
            <Arrow size={17} />
          </span>
        </div>
        <div className="p-5">
          <p className="text-[10px] font-bold uppercase tracking-[.16em] text-sage">
            {localized(product.badges[0], locale)}
          </p>
          <h2 className="mt-2 text-xl font-medium leading-snug">
            {localized(product.name, locale)}
          </h2>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/55">
            {localized(product.summary, locale)}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.materials.slice(0, 2).map((material) => (
              <span
                key={material.name.en}
                className="pill !px-2.5 !py-1 text-[10px]"
              >
                {localized(material.name, locale)}
              </span>
            ))}
            {product.motorization && (
              <span className="pill !px-2.5 !py-1 text-[10px]">
                {ar ? "خيار آلي" : "Motorized option"}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
