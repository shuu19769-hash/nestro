import type { Metadata } from "next";
import { ProjectView, generateStaticParams } from "@/components/pages/ProjectDetailView";
import { projectsFor } from "@/lib/editorial";

export { generateStaticParams };

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsFor("ar").find((item) => item.slug === slug);
  return {
    title: project?.title || "مشروع NESTRO",
    description: project?.summary,
    alternates: { canonical: `/ar/projects/${slug}/`, languages: { en: `/projects/${slug}/`, ar: `/ar/projects/${slug}/` } },
    openGraph: project ? { title: project.title, description: project.summary, images: [project.image], locale: "ar_AE" } : undefined,
  };
}

export default function ArabicProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  return <ProjectView params={params} locale="ar" />;
}
