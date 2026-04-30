"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TRUST_POINTS = [
  "No lock-in contracts",
  "Transparent scope and pricing",
  "Clear, direct communication",
] as const;

// ─── Background ───────────────────────────────────────────────────────────────
// Isolated so the animated blobs are the only reason this file is "use client".

function CTABackground({ reduced }: { reduced: boolean }) {
  return (
    <>
      {/* Dot grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-texture opacity-[0.18]"
      />

      {/* Top-edge prismatic highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.14) 25%, rgba(10,132,255,0.70) 50%, rgba(255,255,255,0.14) 75%, transparent)",
        }}
      />

      {/* Primary blob — large breathing glow, top-centre */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-48 h-[560px] w-[560px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(10,132,255,0.60) 0%, rgba(10,132,255,0.10) 55%, transparent 75%)",
          filter: "blur(72px)",
        }}
        animate={reduced ? {} : { scale: [1, 1.16, 1], opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary blob — bottom-right accent */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 -right-20 h-[320px] w-[320px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(48,145,255,0.40) 0%, transparent 70%)",
          filter: "blur(56px)",
        }}
        animate={reduced ? {} : { x: [0, -28, 0], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Bottom fade — blends card into page background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-b-3xl"
        style={{
          background:
            "linear-gradient(to top, rgba(0,11,30,0.80) 0%, transparent 100%)",
        }}
      />
    </>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FinalCTA() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <section aria-label="Start a project with SigmaTech" id="cta" className="py-24">
      <Container>

        {/* Card entrance — slides up once on scroll-into-view */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 48 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.70, ease: [0, 0, 0.2, 1] }}
        >
          {/* ── Card ── */}
          <div
            className="relative overflow-hidden rounded-3xl px-6 py-20 text-center
                       sm:px-14 lg:px-24"
            style={{
              // Three-layer gradient: electric radial glow from above +
              // softer secondary from below-right + deep-navy base.
              background: [
                "radial-gradient(ellipse 110% 75% at 50% -15%, rgba(10,132,255,0.52) 0%, transparent 58%)",
                "radial-gradient(ellipse 55% 45% at 85% 110%, rgba(48,145,255,0.24) 0%, transparent 55%)",
                "#000B1E",
              ].join(", "),
            }}
          >
            <CTABackground reduced={prefersReduced} />

            {/* Content — delayed entrance after the card has started appearing */}
            <motion.div
              className="relative"
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.60, delay: 0.22, ease: [0, 0, 0.2, 1] }}
            >

              {/* Badge */}
              <div className="mb-5 flex justify-center">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1
                             text-xs font-semibold text-white/75"
                  style={{
                    background:     "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                    border:         "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  <Zap
                    className="h-3 w-3 shrink-0 text-electric-300"
                    aria-hidden="true"
                  />
                  Start your project
                </span>
              </div>

              {/* Headline */}
              <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold
                            tracking-tight text-white sm:text-5xl lg:text-6xl">
                Ready to build something{" "}
                <span className="text-gradient-hero">you&apos;re proud of?</span>
              </h2>

              {/* Sub-headline */}
              <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/55">
                Tell us what you&apos;re building. We&apos;ll come back with a clear assessment — not a proposal full of buzzwords.
              </p>

              {/* ── CTAs ── */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                {/*
                 * White-fill button on electric background.
                 * className overrides primary variant's electric-500 fill via
                 * tailwind-merge so we get a white surface without adding a
                 * new Button variant just for this one context.
                 */}
                <Button
                  href="/contact"
                  size="lg"
                  rightIcon={
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  }
                  className="bg-white text-charcoal-950 shadow-2xl shadow-black/40
                             hover:bg-charcoal-50 active:bg-charcoal-100
                             focus-visible:outline-white"
                >
                  Start a conversation
                </Button>

                {/* White-outline ghost on electric background */}
                <Button
                  href="/work"
                  variant="outline"
                  size="lg"
                  className="border-white/25 text-white hover:bg-white/10
                             hover:border-white/40 hover:text-white
                             focus-visible:outline-white/50"
                >
                  View our work
                </Button>
              </div>

              {/* ── Trust signals ── */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
                {TRUST_POINTS.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-1.5 text-sm text-white/40"
                  >
                    <CheckCircle2
                      className="h-3.5 w-3.5 shrink-0 text-electric-400/60"
                      aria-hidden="true"
                    />
                    {point}
                  </div>
                ))}
              </div>

            </motion.div>
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
