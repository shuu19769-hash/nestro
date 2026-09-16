import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/shared/StaticLink";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ConsultationButton } from "@/components/shared/ClientActions";
import { projectsFor } from "@/lib/editorial";
import type { Locale } from "@/types";

export function generateStaticParams() {
  return projectsFor("en").map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsFor("en").find((item) => item.slug === slug);
  return { title: project?.title || "Project", description: project?.summary };
}
export async function ProjectView({ params, locale = "en" }: { params: Promise<{ slug: string }>; locale?: Locale }) {
  const ar = locale === "ar";
  const projects = projectsFor(locale);
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug)!;
  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];
  return (
    <div dir={ar ? "rtl" : "ltr"}>
      <div className="container-site py-5">
        <Link
          href={`${ar ? "/ar" : ""}/projects`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-black/55"
        >
          <ArrowLeft className={ar ? "rotate-180" : ""} size={15} /> {ar ? "كل المشاريع" : "All projects"}
        </Link>
      </div>
      <section className="container-site pb-16 pt-8">
        <p className="eyebrow">
          {project.type} · {project.location}
        </p>
        <h1 className="display mt-6 max-w-5xl">{project.title}</h1>
        <p className="subheading mt-7">{project.summary}</p>
      </section>
      <div className="relative aspect-[16/9] min-h-[480px] w-full max-w-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-sage">
              {ar ? "تفاصيل المشروع" : "Project details"}
            </p>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-black/45">{ar ? "الموقع" : "Location"}</dt>
                <dd className="mt-1 font-medium">
                  {project.location}, {project.emirate}
                </dd>
              </div>
              <div>
                <dt className="text-black/45">{ar ? "الأسلوب" : "Style"}</dt>
                <dd className="mt-1 font-medium">{project.style}</dd>
              </div>
              <div>
                <dt className="text-black/45">{ar ? "نطاق عمل NESTRO" : "NESTRO scope"}</dt>
                <dd className="mt-1 font-medium">
                  {project.services.join(", ")}
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="heading">{ar ? "مساحة تتشكل من الداخل إلى الخارج." : "A space shaped from the inside out."}</h2>
            <p className="mt-6 leading-8 text-black/65">
              {ar ? "بدأنا بالإحساس والوظيفة المطلوبين للمساحة، ثم طورنا مجموعة هادئة من الخامات تنقل هذه الرؤية عبر الأثاث ومعالجات النوافذ والتفاصيل. وعالجنا العناصر المخصصة بالتوازي مع العمارة حتى تبدو كل النسب أصيلة في مكانها وليست مضافة إليه." : "We began with the way the space needed to feel and function, then developed a restrained material palette to carry that intention through furniture, window treatments and detail. Custom elements were resolved alongside the architecture so every proportion felt settled rather than added."}
            </p>
            <p className="mt-5 leading-8 text-black/65">
              {ar ? "ضمن التنسيق الدقيق خلال اختيار العينات والتصنيع والتركيب أن تحافظ الغرفة النهائية على وضوح الفكرة الأصلية وأن تلائم الحياة اليومية بجمال." : "Close coordination through sampling, making and installation ensured the final room retained the clarity of the original idea while standing up beautifully to everyday life."}
            </p>
            <ConsultationButton className="button button-dark mt-8">
              {ar ? "استفسر عن مشروع مشابه" : "Inquire about a similar project"}
            </ConsultationButton>
          </div>
        </div>
      </section>
      <section className="container-site grid gap-5 pb-24 md:grid-cols-2">
        {project.gallery.map((image, imageIndex) => (
          <div
            key={image}
            className={`relative overflow-hidden rounded-2xl ${imageIndex % 3 === 0 ? "aspect-[4/5]" : "aspect-square"}`}
          >
            <Image
              src={image}
              alt={ar ? `تفصيل ${imageIndex + 1} من ${project.title}` : `${project.title} detail ${imageIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </section>
      <section className="border-t fine-border">
        <Link
          href={`${ar ? "/ar" : ""}/projects/${next.slug}`}
          className="container-site flex items-center justify-between py-12"
        >
          <span>
            <small className="text-xs font-bold uppercase tracking-[.16em] text-sage">
              {ar ? "المشروع التالي" : "Next project"}
            </small>
            <strong className="mt-2 block text-2xl font-medium">
              {next.title}
            </strong>
          </span>
          <ArrowRight className={ar ? "rotate-180" : ""} />
        </Link>
      </section>
    </div>
  );
}
