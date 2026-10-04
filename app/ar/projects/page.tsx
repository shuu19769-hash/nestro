import type { Metadata } from "next";
import { ProjectsView } from "@/components/pages/ProjectsView";

export const metadata: Metadata = {
  title: "مشاريع التصميم الداخلي في الإمارات",
  description: "استكشف مشاريع NESTRO السكنية والتجارية ومشاريع الأثاث في دبي وأبوظبي والشارقة.",
  alternates: { canonical: "/ar/projects/", languages: { en: "/projects/", ar: "/ar/projects/" } },
};

export default function ArabicProjectsPage() { return <ProjectsView locale="ar" />; }
