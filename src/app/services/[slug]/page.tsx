import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SERVICES, SERVICE_BY_SLUG } from "@/data/content/services";
import { SERVICE_PROCESS, type ProcessStep } from "@/data/content/service-process";
import type { Service, Deliverable, FAQ } from "@/data/schemas";
import { BASE_URL } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import ServiceHero from "@/components/sections/service/ServiceHero";
import ServiceFAQ from "@/components/sections/service/ServiceFAQ";

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return SERVICES
    .filter((s) => s.status === "published" && s.isActive)
    .map((s) => ({ slug: s.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: { slug: string } },
): Promise<Metadata> {
  const service = SERVICE_BY_SLUG[params.slug];
  if (!service) return {};

  const url = `${BASE_URL}/services/${service.slug}`;

  return {
    title:       service.seo.title,
    description: service.seo.description,
    keywords:    service.seo.keywords,
    alternates:  { canonical: url },
    openGraph: {
      title:       service.seo.title,
      description: service.seo.description,
      url,
      siteName:    "SigmaTech",
      type:        "website",
      images: service.coverImageUrl
        ? [{ url: service.coverImageUrl, alt: service.coverImageAlt ?? service.name, width: 1200, height: 675 }]
        : [],
    },
    twitter: {
      card:        "summary_large_image",
      title:       service.seo.title,
      description: service.seo.description,
      images:      service.coverImageUrl ? [service.coverImageUrl] : [],
    },
  };
}

// ─── Section: Long-form overview ─────────────────────────────────────────────
// Parses the Markdown subset used in longDescription:
//   ## headings  → <h2>
//   blank-line separated paragraphs → <p>

function ServiceOverview({ service }: { service: Service }) {
  const blocks = service.longDescription.trim().split(/\n\n+/);

  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto grid grid-cols-1 gap-12 lg:grid-cols-[1fr_260px]">

          {/* Long description — rendered Markdown subset */}
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

          {/* Tech stack sidebar */}
          <aside className="lg:pt-1">
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.02)",
                border:     "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-charcoal-500">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech) => (
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

// ─── Section: Deliverables ────────────────────────────────────────────────────

function DeliverableCard({ deliverable }: { deliverable: Deliverable }) {
  return (
    <div
      className="group flex flex-col gap-3 rounded-2xl p-5 transition-all duration-200
                 border border-[rgba(255,255,255,0.06)] hover:border-[rgba(10,132,255,0.30)]"
      style={{ background: "rgba(255,255,255,0.025)" }}
    >
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{ background: "rgba(10,132,255,0.12)", border: "1px solid rgba(10,132,255,0.25)" }}
      >
        <CheckCircle2 className="h-4 w-4 text-electric-400" aria-hidden="true" />
      </div>
      <div>
        <p className="font-semibold text-charcoal-50">{deliverable.title}</p>
        {deliverable.detail && (
          <p className="mt-1 text-sm leading-relaxed text-charcoal-500">
            {deliverable.detail}
          </p>
        )}
      </div>
    </div>
  );
}

function ServiceDeliverables({ deliverables }: { deliverables: Deliverable[] }) {
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
        <div className="mb-2">
          <p className="section-label mb-3">What you get</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-charcoal-50 sm:text-4xl">
            Everything included
          </h2>
          <p className="mt-4 max-w-xl text-charcoal-400">
            Every deliverable is specified in your statement of work before we start — no
            vague "consulting" hours.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((d) => (
            <DeliverableCard key={d.title} deliverable={d} />
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── Section: Process Timeline ────────────────────────────────────────────────

function ProcessStepItem({
  step,
  isLast,
}: {
  step:   ProcessStep;
  isLast: boolean;
}) {
  return (
    <div className="relative flex gap-6">
      {/* Vertical connector line */}
      {!isLast && (
        <div
          aria-hidden="true"
          className="absolute left-5 top-10 w-px"
          style={{
            bottom: "-1.5rem",
            background:
              "linear-gradient(to bottom, rgba(10,132,255,0.40) 0%, rgba(10,132,255,0.08) 100%)",
          }}
        />
      )}

      {/* Step number circle */}
      <div
        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center
                   rounded-full text-sm font-bold text-electric-400"
        style={{
          background:   "rgba(10,132,255,0.10)",
          border:       "2px solid rgba(10,132,255,0.45)",
          boxShadow:    "0 0 16px rgba(10,132,255,0.15)",
        }}
      >
        {step.step}
      </div>

      {/* Content */}
      <div className={isLast ? "pb-0" : "pb-10"}>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-semibold text-charcoal-50">{step.title}</h3>
          <span
            className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-charcoal-500"
            style={{ borderColor: "var(--color-border)" }}
          >
            {step.duration}
          </span>
        </div>
        <p className="mt-2 leading-relaxed text-charcoal-400">{step.description}</p>
      </div>
    </div>
  );
}

function ServiceProcess({ steps }: { steps: ProcessStep[] }) {
  if (steps.length === 0) return null;

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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr]">

          {/* Heading + intro */}
          <div>
            <p className="section-label mb-3">How we work</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-charcoal-50 sm:text-4xl">
              Our delivery process
            </h2>
            <p className="mt-4 leading-8 text-charcoal-400">
              A transparent, step-by-step process built from dozens of client
              engagements — so you always know what's happening and what's next.
            </p>
          </div>

          {/* Timeline */}
          <div>
            {steps.map((step, i) => (
              <ProcessStepItem
                key={step.step}
                step={step}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}

// ─── Section: Page-level CTA band ────────────────────────────────────────────

function ServiceCTA({ service }: { service: Service }) {
  const headline    = service.ctaHeadline    ?? "Ready to get started?";
  const subheadline = service.ctaSubheadline ?? "Tell us about your project and we'll respond within 1 business day.";

  return (
    <section className="py-24">
      <Container>
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-14"
          style={{
            background: [
              "radial-gradient(ellipse 110% 75% at 50% -15%, rgba(10,132,255,0.48) 0%, transparent 58%)",
              "radial-gradient(ellipse 55% 45% at 85% 110%, rgba(48,145,255,0.22) 0%, transparent 55%)",
              "#000B1E",
            ].join(", "),
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Top-edge prismatic highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.14) 25%, rgba(10,132,255,0.70) 50%, rgba(255,255,255,0.14) 75%, transparent)",
            }}
          />

          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {headline}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/55">
            {subheadline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href={`/contact?service=${service.slug}`}
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              className="bg-white text-charcoal-950 shadow-2xl shadow-black/40
                         hover:bg-charcoal-50 active:bg-charcoal-100
                         focus-visible:outline-white"
            >
              Contact us today
            </Button>
            <Button
              href="/work"
              variant="outline"
              size="lg"
              className="border-white/25 text-white hover:bg-white/10
                         hover:border-white/40 hover:text-white
                         focus-visible:outline-white/50"
            >
              See our work
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICE_BY_SLUG[params.slug];

  if (!service || service.status !== "published" || !service.isActive) {
    notFound();
  }

  const processSteps = SERVICE_PROCESS[service.slug] ?? [];

  // FAQ structured data — helps Google show FAQ rich results in search
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main>
        {/* ── Hero — cover image, title, stats, CTAs ── */}
        <ServiceHero service={service}>
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: service.name },
            ]}
          />
        </ServiceHero>

        {/* ── Long-form service overview + tech stack ── */}
        <Reveal>
          <ServiceOverview service={service} />
        </Reveal>

        {/* ── Deliverables grid ── */}
        <Reveal yOffset={24}>
          <ServiceDeliverables deliverables={service.deliverables} />
        </Reveal>

        {/* ── Delivery process timeline ── */}
        <Reveal yOffset={24}>
          <ServiceProcess steps={processSteps} />
        </Reveal>

        {/* ── FAQ accordion (client component for animation) ── */}
        <Reveal yOffset={24}>
          <ServiceFAQ faqs={service.faqs} />
        </Reveal>

        {/* ── Service-specific CTA band ── */}
        <Reveal yOffset={24}>
          <ServiceCTA service={service} />
        </Reveal>
      </main>
    </>
  );
}
