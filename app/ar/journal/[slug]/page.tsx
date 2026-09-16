import type { Metadata } from "next";
import { JournalPostView, generateStaticParams } from "@/components/pages/JournalDetailView";
import { journalFor } from "@/lib/editorial";

export { generateStaticParams };

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = journalFor("ar").find((item) => item.slug === slug);
  return {
    title: post?.title || "مجلة NESTRO",
    description: post?.excerpt,
    alternates: { canonical: `/ar/journal/${slug}/`, languages: { en: `/journal/${slug}/`, ar: `/ar/journal/${slug}/` } },
    openGraph: post ? { title: post.title, description: post.excerpt, images: [{ url: post.image, alt: post.title }], type: "article", locale: "ar_AE", publishedTime: slug === "curtains-in-dubai-complete-buying-guide" ? "2026-09-01" : undefined } : undefined,
  };
}

export default function ArabicJournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  return <JournalPostView params={params} locale="ar" />;
}
