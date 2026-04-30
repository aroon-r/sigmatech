import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, ExternalLink, MapPin } from "lucide-react";
import { CASE_STUDIES, CASE_STUDY_BY_SLUG } from "@/data/content/work";
import type { CaseStudy, CaseStudyGalleryItem, Testimonial } from "@/data/schemas";
import { SERVICE_SLUG_LABELS } from "@/data/schemas";
import { BASE_URL } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import MetricsGrid from "@/components/sections/work/MetricsGrid";
import ServiceFAQ from "@/components/sections/service/ServiceFAQ";

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return CASE_STUDIES
    .filter((cs) => cs.status === "published")
    .map((cs) => ({ slug: cs.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: { slug: string } },
): Promise<Metadata> {
  const study = CASE_STUDY_BY_SLUG[params.slug];
  if (!study) return {};

  const url = `${BASE_URL}/work/${study.slug}`;

  return {
    title:       study.seo.title,
    description: study.seo.description,
    keywords:    study.seo.keywords,
    alternates:  { canonical: url },
    openGraph: {
      title:       study.seo.title,
      description: study.seo.description,
      url,
      siteName:    "SigmaTech",
      type:        "article",
      images: study.seo.ogImageUrl
        ? [{ url: study.seo.ogImageUrl, alt: study.title, width: 1200, height: 630 }]
        : [],
    },
    twitter: {
      card:        "summary_large_image",
      title:       study.seo.title,
      description: study.seo.description,
      images:      study.seo.ogImageUrl ? [study.seo.ogImageUrl] : [],
    },
  };
}

// ─── Section: Hero ────────────────────────────────────────────────────────────

function CaseStudyHero({
  study,
  children,
}: {
  study:    CaseStudy;
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-0 pt-8">
      {/* Breadcrumbs — rendered above the image */}
      <Container>
        <div className="relative mb-6">{children}</div>
      </Container>

      {/* Cover image */}
      <div className="relative h-[480px] lg:h-[580px]">
        <Image
          src={study.coverImageUrl}
          alt={study.coverImageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        {/* Gradient: subtle at top, heavy at bottom to reveal content */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,11,30,0.15) 0%, rgba(0,11,30,0.60) 55%, var(--color-bg) 100%)",
          }}
        />

        {/* Content overlaid at the bottom of the image */}
        <div className="absolute inset-x-0 bottom-0 pb-10">
          <Container>
            {/* Industry + client chips */}
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-electric-300"
                style={{
                  background: "rgba(10,132,255,0.15)",
                  border:     "1px solid rgba(10,132,255,0.35)",
                }}
              >
                {study.industry}
              </span>
              <span className="text-sm text-charcoal-400">
                {study.client.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-charcoal-50 sm:text-5xl lg:text-6xl">
              {study.title}
            </h1>

            {/* Tagline */}
            <p className="mt-3 max-w-2xl text-xl font-medium text-electric-300">
              {study.tagline}
            </p>

            {/* Meta: duration, country, services */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-1.5 text-sm text-charcoal-400">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {study.duration}
              </div>
              {study.client.country && (
                <div className="flex items-center gap-1.5 text-sm text-charcoal-400">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {study.client.country}
                </div>
              )}
              {study.servicesSlugs.map((slug) => (
                <span
                  key={slug}
                  className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-charcoal-500"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  {SERVICE_SLUG_LABELS[slug]}
                </span>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Body narrative + sidebar ───────────────────────────────────────
// Parses the Markdown subset in body:
//   ## headings → <h2>
//   blank-line separated paragraphs → <p>

function CaseStudyBody({ study }: { study: CaseStudy }) {
  const blocks = study.body.trim().split(/\n\n+/);

  const completedDate = study.projectEndDate
    ? new Date(study.projectEndDate + "-01").toLocaleDateString("en-GB", {
        month: "long",
        year:  "numeric",
      })
    : "Ongoing";

  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">

          {/* Markdown narrative */}
          <div className="prose-service">
            {blocks.map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="mb-4 mt-10 font-display text-xl font-bold tracking-tight text-charcoal-50 first:mt-0"
                  >
                    {block.slice(3)}
                  </h2>
                );
              }
              return (
                <p key={i} className="mb-6 leading-8 text-charcoal-300 last:mb-0">
                  {block}
                </p>
              );
            })}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:pt-1">

            {/* Project meta card */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.025)",
                border:     "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-charcoal-500">
                Project details
              </p>
              <dl className="space-y-3.5">
                <div>
                  <dt className="text-xs text-charcoal-600">Client</dt>
                  <dd className="mt-0.5 text-sm font-medium text-charcoal-200">
                    {study.client.name}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-charcoal-600">Industry</dt>
                  <dd className="mt-0.5 text-sm font-medium capitalize text-charcoal-200">
                    {study.industry}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-charcoal-600">Duration</dt>
                  <dd className="mt-0.5 text-sm font-medium text-charcoal-200">
                    {study.duration}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-charcoal-600">Completed</dt>
                  <dd className="mt-0.5 text-sm font-medium text-charcoal-200">
                    {completedDate}
                  </dd>
                </div>
                {study.client.websiteUrl && (
                  <div>
                    <dt className="text-xs text-charcoal-600">Website</dt>
                    <dd className="mt-0.5">
                      <a
                        href={study.client.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-electric-400 hover:text-electric-300 transition-colors"
                      >
                        Visit site
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Tech stack card */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.025)",
                border:     "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-charcoal-500">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {study.techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium text-charcoal-400"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </Container>
    </section>
  );
}

// ─── Section: Testimonial ─────────────────────────────────────────────────────

function CaseStudyTestimonial({ testimonial }: { testimonial: Testimonial }) {
  const initial = testimonial.authorName.charAt(0).toUpperCase();

  return (
    <section className="py-20">
      {/* Separator */}
      <div
        className="mb-20 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-border) 20%, var(--color-border) 80%, transparent)",
        }}
      />
      <Container>
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-14 sm:px-14"
          style={{
            background: [
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(10,132,255,0.12) 0%, transparent 60%)",
              "#000B1E",
            ].join(", "),
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Decorative opening quote — large background ornament */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-8 top-4 select-none font-display text-[140px] leading-none text-charcoal-900"
          >
            &ldquo;
          </div>

          {/* Top-edge prismatic highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.10) 25%, rgba(10,132,255,0.50) 50%, rgba(255,255,255,0.10) 75%, transparent)",
            }}
          />

          <figure className="relative max-w-3xl">
            <blockquote className="font-display text-xl leading-9 text-charcoal-100 sm:text-2xl sm:leading-10">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <figcaption className="mt-8 flex items-center gap-4">
              {/* Author initial avatar */}
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-electric-400"
                style={{
                  background: "rgba(10,132,255,0.15)",
                  border:     "1px solid rgba(10,132,255,0.35)",
                }}
                aria-hidden="true"
              >
                {initial}
              </div>
              <div>
                <p className="font-semibold text-charcoal-50">
                  {testimonial.authorName}
                </p>
                <p className="text-sm text-charcoal-500">
                  {testimonial.authorTitle}, {testimonial.authorCompany}
                </p>
              </div>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}

// ─── Section: Image gallery ───────────────────────────────────────────────────

function CaseStudyGallery({ gallery }: { gallery: CaseStudyGalleryItem[] }) {
  return (
    <section className="py-20">
      {/* Separator */}
      <div
        className="mb-20 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-border) 20%, var(--color-border) 80%, transparent)",
        }}
      />
      <Container>
        <p className="section-label mb-8">Project screenshots</p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {gallery.map((item, i) => (
            <figure
              key={i}
              className="overflow-hidden rounded-2xl"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="relative h-60">
                <Image
                  src={item.url}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
              {item.caption && (
                <figcaption className="px-4 py-3 text-sm text-charcoal-500"
                  style={{ background: "rgba(0,0,0,0.30)" }}>
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── Section: Next project navigation ────────────────────────────────────────

function NextProject({ study }: { study: CaseStudy }) {
  return (
    <section className="py-20">
      {/* Separator */}
      <div
        className="mb-16 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-border) 20%, var(--color-border) 80%, transparent)",
        }}
      />
      <Container>
        <p className="section-label mb-8 text-center">Next project</p>

        <Link href={`/work/${study.slug}`} className="group block">
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Cover image */}
            <div className="relative h-60 lg:h-72">
              <Image
                src={study.coverImageUrl}
                alt={study.coverImageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 1200px, 100vw"
              />
              {/* Left-to-right gradient so text is readable */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,11,30,0.88) 0%, rgba(0,11,30,0.50) 55%, transparent 100%)",
                }}
              />

              {/* Text content */}
              <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-8 lg:p-12">
                <p className="mb-2 text-sm text-charcoal-400">
                  {study.client.name}
                </p>
                <h3 className="max-w-md font-display text-2xl font-bold text-charcoal-50 lg:text-3xl">
                  {study.title}
                </h3>
                <p className="mt-2 font-medium text-electric-300">
                  {study.tagline}
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-electric-400 transition-all duration-200 group-hover:gap-4">
                  View case study
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Container>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = CASE_STUDY_BY_SLUG[params.slug];

  if (!study || study.status !== "published") {
    notFound();
  }

  // Find the next published study by sortOrder, wrapping around
  const published = CASE_STUDIES
    .filter((cs) => cs.status === "published")
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const currentIdx  = published.findIndex((cs) => cs.slug === study.slug);
  const nextStudy   = published[(currentIdx + 1) % published.length];

  const hasGallery     = (study.gallery?.length ?? 0) > 0;
  const hasFaqs        = (study.faqs?.length ?? 0) > 0;
  const hasTestimonial = !!study.testimonial;

  return (
    <main>
      {/* ── Hero — cinematic cover image + title + meta ── */}
      <CaseStudyHero study={study}>
        <Breadcrumbs
          items={[
            { label: "Work", href: "/work" },
            { label: study.title },
          ]}
        />
      </CaseStudyHero>

      {/* ── Narrative body (Context → Challenge → Approach → Outcome) + sidebar ── */}
      <Reveal>
        <CaseStudyBody study={study} />
      </Reveal>

      {/* ── Results metrics grid ── */}
      <Reveal yOffset={24}>
        <MetricsGrid metrics={study.metrics} />
      </Reveal>

      {/* ── Client testimonial ── */}
      {hasTestimonial && (
        <Reveal yOffset={24}>
          <CaseStudyTestimonial testimonial={study.testimonial!} />
        </Reveal>
      )}

      {/* ── Project gallery ── */}
      {hasGallery && (
        <Reveal yOffset={24}>
          <CaseStudyGallery gallery={study.gallery!} />
        </Reveal>
      )}

      {/* ── FAQ accordion ── */}
      {hasFaqs && (
        <Reveal yOffset={24}>
          <ServiceFAQ faqs={study.faqs!} />
        </Reveal>
      )}

      {/* ── Next project navigation ── */}
      <Reveal yOffset={24}>
        <NextProject study={nextStudy} />
      </Reveal>
    </main>
  );
}
