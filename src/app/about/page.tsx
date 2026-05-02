import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, TrendingUp, Zap, ShieldCheck, Layers } from "lucide-react";
import { PAGE_METADATA } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import TrustSection from "@/components/sections/TrustSection";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = PAGE_METADATA.about;

// ─── Data ─────────────────────────────────────────────────────────────────────

const VALUES = [
  {
    title: "Craft over shortcut",
    body:  "We don't ship code we aren't proud of. Cutting corners creates debt someone has to pay — usually you, six months from now.",
  },
  {
    title: "Outcomes over output",
    body:  "Lines of code, velocity points, and PR counts are vanity. We measure success by the metrics that matter to your business.",
  },
  {
    title: "Transparent by default",
    body:  "We tell you what we find, even when it's uncomfortable. Honest early beats pleasant late every time.",
  },
  {
    title: "Senior-led delivery",
    body:  "The people you meet in scoping are the people who build your product. No bait-and-switch staffing.",
  },
] as const;

const PROCESS = [
  {
    step: "01",
    title: "Discover",
    duration: "Weeks 1–2",
    body: "We review your codebase, interview your heaviest users, and map every constraint that matters. The output is an architectural proposal — not a sales deck.",
  },
  {
    step: "02",
    title: "Design & Build",
    duration: "Weeks 3–12",
    body: "Sprint-based delivery with staging from day one. You validate against real workflows, not synthetic test cases. Edge cases surface early, not after launch.",
  },
  {
    step: "03",
    title: "Ship & Handover",
    duration: "Final week",
    body: "Zero-drama deployment with an instant rollback path active throughout. Full documentation and walkthrough for your team. We don't disappear at go-live.",
  },
] as const;

const STATS = [
  { Icon: TrendingUp,  metric: "Fast",     label: "Performance-first delivery" },
  { Icon: Zap,         metric: "Clean",    label: "Maintainable, typed codebases" },
  { Icon: ShieldCheck, metric: "Reliable", label: "Production-grade reliability" },
  { Icon: Layers,      metric: "Direct",   label: "No account managers in the way" },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-24 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(10,132,255,0.14) 0%, transparent 65%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-texture opacity-[0.08]"
        />
        <Container>
          <div className="relative mx-auto max-w-3xl">
            <p className="section-label mb-4">About Nexora</p>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              We build software that{" "}
              <span className="text-gradient-hero">earns trust</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-charcoal-300">
              Nexora is a software engineering studio. We partner with product teams to design,
              build, and ship web applications, APIs, and digital products —
              with written scope, early staging, and documented handovers.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button
                href="/contact"
                size="lg"
                rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              >
                Start a project
              </Button>
              <Button href="/work" variant="outline" size="lg">
                View our work
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Stats ── */}
      <Reveal>
        <section aria-label="Company statistics" className="border-y border-charcoal-800 py-14">
          <Container>
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {STATS.map(({ Icon, metric, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <div
                    className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: "rgba(10,132,255,0.12)" }}
                  >
                    <Icon className="h-5 w-5 text-electric-400" aria-hidden="true" />
                  </div>
                  <p className="font-display text-3xl font-bold text-[var(--color-text-primary)]">{metric}</p>
                  <p className="text-sm text-charcoal-400">{label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </Reveal>

      {/* ── Values ── */}
      <Reveal>
        <section className="py-24">
          <Container>
            <SectionHeading
              overline="How we think"
              title="Principles we don't compromise on"
              subtitle="These aren't wall-art values. They're the decisions we make when the deadline is tight and the easy path is tempting."
            />
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {VALUES.map(({ title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl p-6"
                  style={{
                    background:           "rgba(255,255,255,0.03)",
                    backdropFilter:       "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border:               "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="mb-3 flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-electric-400"
                      aria-hidden="true"
                    />
                    <h3 className="font-display text-lg font-semibold">{title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-charcoal-400">{body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </Reveal>

      {/* ── Process ── */}
      <Reveal>
        <section className="border-t border-charcoal-800 py-24">
          <Container>
            <SectionHeading
              overline="How we work"
              title="A process built around your risk"
              subtitle="Every step is designed to surface problems early, when they're cheap — not at go-live, when they're not."
            />
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
              {PROCESS.map(({ step, title, duration, body }) => (
                <div
                  key={step}
                  className="relative rounded-2xl p-6"
                  style={{
                    background:           "rgba(255,255,255,0.025)",
                    backdropFilter:       "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border:               "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Step number — decorative */}
                  <p
                    className="pointer-events-none absolute -top-4 -left-2 select-none font-display
                               text-7xl font-bold leading-none text-charcoal-50/[0.04]"
                    aria-hidden="true"
                  >
                    {step}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-electric-400">
                    {step}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold">{title}</h3>
                  <p className="mt-1 text-xs font-medium text-charcoal-500">{duration}</p>
                  <p className="mt-4 text-sm leading-relaxed text-charcoal-400">{body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </Reveal>

      {/* ── Studio ── */}
      <Reveal>
        <section className="border-t border-charcoal-800 py-24">
          <Container>
            <SectionHeading
              overline="The studio"
              title="Small team, senior delivery"
            />
            <p className="mt-8 max-w-[75ch] mx-auto text-center text-lg leading-relaxed text-charcoal-300">
              Nexora is a small engineering studio. Every project is scoped, built, and
              handed over by the same people — there is no handoff between a sales team
              and a delivery team. The focus is on well-engineered software with clear
              documentation, not on headcount.
            </p>
            <TrustSection />
          </Container>
        </section>
      </Reveal>

      {/* ── CTA ── */}
      <Reveal>
        <section className="pb-24">
          <Container>
            <div
              className="rounded-2xl p-10 text-center sm:p-16"
              style={{
                background:           "rgba(10,132,255,0.06)",
                backdropFilter:       "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border:               "1px solid rgba(10,132,255,0.18)",
              }}
            >
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                Ready to work with us?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-charcoal-300">
                Fill in our 60-second form. We'll respond within one business day with a
                straight answer — not a sales pitch.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button
                  href="/contact"
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                >
                  Get in touch
                </Button>
                <Button href="/services" variant="outline" size="lg">
                  Explore services
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>
    </main>
  );
}
