import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopClient } from "@/components/shop/ShopClient";
import { catalog } from "@/lib/catalog";
export const metadata: Metadata = {
  title: "Furniture, Kitchens, Curtains, Upholstery & Tiles",
  description:
    "Explore all 49 NESTRO furniture, kitchen, window-treatment, upholstery and washroom-tile offerings in the UAE.",
  alternates: {
    canonical: "/shop",
    languages: { en: "/shop", ar: "/ar/shop" },
  },
};
export default function ShopPage() {
  return (
    <>
      <section className="container-site pb-12 pt-16 md:pb-16 md:pt-24">
        <span className="eyebrow">The complete NESTRO service directory</span>
        <h1 className="display mt-6 max-w-5xl">
          Forty-six specialist ways
          <br />to resolve your space.
        </h1>
        <p className="subheading mt-7">
          Explore made-to-measure furniture, kitchens, window treatments,
          upholstery and washroom surfaces, then begin with a design consultation.
        </p>
      </section>
      <Suspense
        fallback={
          <div className="container-site min-h-96 py-12">
            Loading catalogue…
          </div>
        }
      >
        
        <ShopClient products={catalog} />
      </Suspense>
    </>
  );
}
