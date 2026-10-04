import type { Metadata } from "next";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { projectsFor } from "@/lib/editorial";
import type { Locale } from "@/types";

export const metadata: Metadata = { title: "Interior Design Projects UAE", description: "Explore NESTRO residential, commercial and furniture projects across Dubai, Abu Dhabi and Sharjah." };

export function ProjectsView({ locale = "en" }: { locale?: Locale }) {
  const ar = locale === "ar";
  return <div dir={ar ? "rtl" : "ltr"}><section className="container-site pb-12 pt-16 md:pb-20 md:pt-24"><span className="eyebrow">{ar ? "أعمال مختارة" : "Selected work"}</span><h1 className="display mt-6 max-w-5xl">{ar ? "غرف تبقى في الذاكرة." : "Rooms made memorable."}</h1><p className="subheading mt-7">{ar ? "مجموعة من المنازل ومساحات العمل والقطع المجددة بعناية، شكّلها أصحابها وأماكنها." : "A portfolio of homes, workplaces and carefully renewed pieces—each shaped by its people and place."}</p></section><section className="container-site pb-24"><ProjectGrid projects={projectsFor(locale)} locale={locale} /></section></div>;
}

