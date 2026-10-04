import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/shared/StaticLink";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { journalFor } from "@/lib/editorial";
import type { Locale } from "@/types";
import { JournalArticleNavigator } from "@/components/pages/JournalArticleNavigator";

export function generateStaticParams() {
  return journalFor("en").map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = journalFor("en").find((item) => item.slug === slug);
  return {
    title: post?.title || "Journal",
    description: post?.excerpt,
    alternates: { canonical: `/journal/${slug}/`, languages: { en: `/journal/${slug}/`, ar: `/ar/journal/${slug}/` } },
    openGraph: post ? { title: post.title, description: post.excerpt, images: [{ url: post.image, alt: post.title }], type: "article", locale: "en_AE", publishedTime: "2026-09-01" } : undefined,
  };
}
export async function JournalPostView({ params, locale = "en" }: { params: Promise<{ slug: string }>; locale?: Locale }) {
  const ar = locale === "ar", journal = journalFor(locale), prefix = ar ? "/ar" : "";
  const { slug } = await params;
  const post = journal.find((item) => item.slug === slug)!;
  const index = journal.findIndex((item) => item.slug === slug);
  const next = journal[(index + 1) % journal.length];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.slug === "curtains-in-dubai-complete-buying-guide" ? "2026-09-01" : "2026-08-01",
    dateModified: "2026-09-01",
    author: { "@type": "Organization", name: "NESTRO" },
    publisher: { "@type": "Organization", name: "NESTRO" },
    mainEntityOfPage: `${prefix}/journal/${post.slug}/`,
  };
  return (
    <div dir={ar ? "rtl" : "ltr"}>
      <div className="container-site py-5">
        <Link
          href={`${prefix}/journal`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-black/55"
        >
          <ArrowLeft className={ar ? "rotate-180" : ""} size={15} /> {ar ? "المجلة" : "The journal"}
        </Link>
      </div>
      <article>
        <header className="container-site max-w-5xl py-14 text-center">
          <p className="text-xs font-bold uppercase tracking-[.17em] text-sage">
            {post.category} · {post.readTime}
          </p>
          <h1 className="display mt-6">{post.title}</h1>
          <p className="subheading mx-auto mt-7">{post.excerpt}</p>
          <p className="mt-6 text-xs text-black/45">{post.date}</p>
        </header>
        <div className="relative aspect-[16/8] min-h-[460px] w-full max-w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="container-site grid min-w-0 gap-12 py-12 lg:grid-cols-[minmax(15rem,19rem)_minmax(0,1fr)] lg:py-16">
          <JournalArticleNavigator posts={journal} post={post} locale={locale} />
          <div id="article-content" className="prose-nestro min-w-0 max-w-3xl text-lg">
            <div className="mb-12 border-s-2 border-sage/35 ps-6">
              {post.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {post.sections?.map((section) => <section id={section.id} key={section.id} className="scroll-mt-28 border-t fine-border py-10 first:border-t-0 first:pt-0">
              <h2 className="text-3xl font-medium leading-tight text-charcoal md:text-4xl">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.points?.length ? <ul className="mt-6 grid gap-3 sm:grid-cols-2">{section.points.map((point) => <li key={point} className="surface-card flex min-w-0 items-start gap-3 rounded-xl px-4 py-3 text-sm leading-6 text-black/65"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />{point}</li>)}</ul> : null}
              {section.subsections?.map((subsection) => <div key={subsection.heading} className="mt-8 rounded-2xl bg-black/[.025] p-5 md:p-6"><h3 className="text-xl font-semibold text-charcoal">{subsection.heading}</h3>{subsection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>)}
            </section>)}
          </div>
        </div>
      </article>
      <section className="border-t fine-border">
        <Link
          href={`${prefix}/journal/${next.slug}`}
          className="container-site flex items-center justify-between py-12"
        >
          <span>
            <small className="text-xs font-bold uppercase tracking-[.16em] text-sage">
              {ar ? "المقال التالي" : "Next story"}
            </small>
            <strong className="mt-2 block text-2xl font-medium">
              {next.title}
            </strong>
          </span>
          <ArrowRight className={ar ? "rotate-180" : ""} />
        </Link>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
