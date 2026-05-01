"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

// ─── Data ─────────────────────────────────────────────────────────────────────

// Specific delivery commitments — not generic reassurances.
const TRUST_POINTS = [
  "Written scope before development",
  "Staging environment early in the build",
  "Full IP transfer on delivery",
] as const;

// ─── Background ───────────────────────────────────────────────────────────────

function CTABackground() {
  return (
    <>
      {/* Dot grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-texture opacity-[0.18]"
      />

      {/* Top-edge hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.08) 25%, rgba(10,132,255,0.25) 50%, rgba(255,255,255,0.08) 75%, transparent)",
        }}
      />

      {/* Static top-centre glow — single light source, no animation */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-48 h-[560px] w-[560px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(10,132,255,0.18) 0%, rgba(10,132,255,0.04) 55%, transparent 75%)",
          filter: "blur(72px)",
        }}
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
    <section aria-label="Start a project with Nexora" id="cta" className="py-28">
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
                "radial-gradient(ellipse 110% 75% at 50% -15%, rgba(10,132,255,0.16) 0%, transparent 58%)",
                "#000B1E",
              ].join(", "),
            }}
          >
            <CTABackground />

            {/* Content — delayed entrance after the card has started appearing */}
            <motion.div
              className="relative"
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.60, delay: 0.22, ease: [0, 0, 0.2, 1] }}
            >

              {/* Headline */}
              <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold
                            tracking-tight text-white sm:text-5xl lg:text-6xl">
                Have something that{" "}
                <span className="text-gradient-hero">needs building?</span>
              </h2>

              {/* Sub-headline */}
              <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/55">
                Send a brief. We&apos;ll read it, ask what we need to understand, and come back
                with how we&apos;d approach it — and whether we&apos;re the right fit.
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
                  Send a brief
                </Button>

                {/* White-outline ghost on electric background */}
                <Button
                  href="#how-we-work"
                  variant="outline"
                  size="lg"
                  className="border-white/25 text-white hover:bg-white/10
                             hover:border-white/40 hover:text-white
                             focus-visible:outline-white/50"
                >
                  See how we work
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
