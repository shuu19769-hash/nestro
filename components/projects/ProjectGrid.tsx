"use client";

import Image from "next/image";
import Link from "@/components/shared/StaticLink";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import type { Locale, Project } from "@/types";

export function ProjectGrid({ projects, locale = "en" }: { projects: Project[]; locale?: Locale }) {
  const ar = locale === "ar";
  const [type, setType] = useState("All");
  const [emirate, setEmirate] = useState("All");
  const types = [
    "All",
    ...Array.from(new Set(projects.map((project) => project.type))),
  ];
  const emirates = [
    "All",
    ...Array.from(new Set(projects.map((project) => project.emirate))),
  ];
  const filtered = projects.filter(
    (project) =>
      (type === "All" || project.type === type) &&
      (emirate === "All" || project.emirate === emirate),
  );
  return (
    <>
      <div className="flex flex-col gap-4 border-y fine-border py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {types.map((value) => (
            <button
              key={value}
              onClick={() => setType(value)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${value === type ? "bg-brand text-charcoal shadow-sm" : "border fine-border hover:border-brand hover:text-brand-dark"}`}
            >
              {ar && value === "All" ? "الكل" : value}
            </button>
          ))}
        </div>
        <select
          aria-label={ar ? "تصفية حسب الإمارة" : "Filter by emirate"}
          value={emirate}
          onChange={(event) => setEmirate(event.target.value)}
          className="rounded-xl border fine-border bg-transparent px-4 py-2 text-sm"
        >
          {emirates.map((value) => (
            <option key={value} value={value}>{ar && value === "All" ? "كل الإمارات" : value}</option>
          ))}
        </select>
      </div>
      <div className="mt-10 grid gap-x-5 gap-y-12 md:grid-cols-2">
        {filtered.map((project, index) => (
          <Link
            key={project.slug}
            href={`${ar ? "/ar" : ""}/projects/${project.slug}`}
            className={`group ${index % 2 ? "md:mt-16" : ""}`}
          >
            <div className="card-image relative aspect-[5/4] rounded-2xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[.16em] text-sage">
              {project.type} · {project.location}
            </p>
            <div className="mt-2 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-medium">{project.title}</h2>
              <ArrowRight className={ar ? "rotate-180" : ""} size={19} />
            </div>
            <p className="mt-3 max-w-xl text-sm leading-6 text-black/55">
              {project.summary}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
