import type { Metadata } from "next";
import Link from "@/components/shared/StaticLink";
import { ArrowRight } from "lucide-react";
import { ServiceTemplate } from "@/components/services/ServiceTemplate";
const categories = {
  sofas: {
    title: "Custom sofas & seating",
    intro:
      "Every comfort decision—from seat depth and cushion feel to arm height and fabric performance—is resolved around your room and the people who use it.",
    image: "/images/catalog/custom-sofa-chair.webp",
  },
  beds: {
    title: "Custom beds & headboards",
    intro:
      "Restful proportions, tactile upholstery and integrated details tailored to the architecture of your bedroom.",
    image: "/images/catalog/custom-bed-headboard.webp",
  },
  wardrobes: {
    title: "Custom wardrobes & storage",
    intro:
      "Quiet, architectural storage designed from the inside out—around your collection, routine and available space.",
    image: "/images/catalog/wardrobe-cabinet.webp",
  },
};
export function generateStaticParams() {
  return Object.keys(categories).map((category) => ({ category }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params,
    data = categories[category as keyof typeof categories];
  return { title: data.title, description: data.intro };
}
export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params,
    data = categories[category as keyof typeof categories];
  return (
    <ServiceTemplate
      eyebrow="Made to measure"
      title={data.title}
      intro={data.intro}
      image={data.image}
      startingPrice="across AED 150–300, AED 300–600 and AED 600+ tiers"
      benefits={[
        {
          title: "Designed around you",
          copy: "Ergonomics and proportions respond to your body, room and daily rituals.",
        },
        {
          title: "A guided material edit",
          copy: "We narrow the possibilities into a confident, coherent palette.",
        },
        {
          title: "Made by specialists",
          copy: "Every material and finish is confirmed before production.",
        },
      ]}
      materials={[
        "Walnut",
        "Oak",
        "Bouclé",
        "Linen",
        "Velvet",
        "Performance weave",
      ]}
    >
      <section className="section section-bronze">
        <div className="container-site text-center">
          <h2 className="heading">Have a reference in mind?</h2>
          <p className="mx-auto mt-5 max-w-xl text-white/60">
            Share dimensions, a rough drawing or an image. We’ll help translate
            it into a piece that truly fits.
          </p>
          <Link
            href="/custom-furniture#wizard"
            className="button mt-8 bg-ivory text-charcoal"
          >
            Create a custom brief <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </ServiceTemplate>
  );
}
