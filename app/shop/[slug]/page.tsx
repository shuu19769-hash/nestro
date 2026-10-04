import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferingDetail } from "@/components/shop/OfferingDetail";
import { bySlug, catalog } from "@/lib/catalog";
export function generateStaticParams() {
  return catalog.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params,
    item = bySlug(slug);
  if (!item) return {};
  return {
    title: item.seo.title.en,
    description: item.seo.description.en,
    alternates: {
      canonical: `/shop/${slug}`,
      languages: { en: `/shop/${slug}`, ar: `/ar/shop/${slug}` },
    },
    openGraph: {
      title: item.seo.title.en,
      description: item.seo.description.en,
      images: [item.images[0]],
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params,
    item = bySlug(slug);
  if (!item) notFound();
  const related = item.related.map(bySlug).filter(Boolean);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.name.en,
    description: item.description.en,
    image: item.images,
    areaServed: "United Arab Emirates",
    serviceType: item.subcollection,
  };
  return (
    <>
      <OfferingDetail
        item={item}
        related={related as typeof catalog}
        locale="en"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: item.faqs.map((f) => ({
              "@type": "Question",
              name: f.question.en,
              acceptedAnswer: { "@type": "Answer", text: f.answer.en },
            })),
          }),
        }}
      />
    </>
  );
}
