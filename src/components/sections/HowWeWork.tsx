"use client";

import { m, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const STEPS = [
  {
    number: "01",
    title:  "Brief before commitment",
    body:   "Send a brief. We read it, ask what we need to understand, and come back with a scoped proposal. If we think we're not the right fit, we say so — before any time is wasted on either side.",
  },
  {
    number: "02",
    title:  "Scope before code",
    body:   "Before development starts, we write exactly what is being built, how long it takes, and what done means. That document is what we're held to — not a vague brief that quietly expands mid-sprint.",
  },
  {
    number: "03",
    title:  "Staging from sprint one",
    body:   "We deploy to a staging environment early in the build — usually within the first two sprints, depending on infrastructure complexity. You see the actual build, in the environment it will go to production in — not something tidied up for a review call.",
  },
  {
    number: "04",
    title:  "Handover that doesn't need us",
    body:   "We document the significant decisions: why we chose this structure, what the edge cases are, what to watch over time. The code we leave should be workable by your team without needing us on a call to explain it.",
  },
] as const;

export default function HowWeWork() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <section aria-label="How we work" id="how-we-work" className="pt-20 pb-20">
      <Container>
        <m.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0, 0, 0.2, 1] }}
        >
          <SectionHeading
            overline="How we work"
            title="A process that reduces surprises"
            subtitle="We don't manage clients. We do the work, keep you informed, and hand over something your team can maintain without us."
            align="left"
          />
        </m.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {STEPS.map((step, i) => (
            <m.div
              key={step.number}
              initial={prefersReduced ? false : { opacity: 0, y: 28 }}
              whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.09, ease: [0, 0, 0.2, 1] }}
              className="relative overflow-hidden rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.018)" }}
            >
              {/* Decorative large step number */}
              <p
                className="pointer-events-none absolute -top-4 -left-2 select-none font-display
                           text-7xl font-bold leading-none text-charcoal-50/[0.04]"
                aria-hidden="true"
              >
                {step.number}
              </p>

              <p className="text-xs font-semibold uppercase tracking-widest text-electric-400">
                {step.number}
              </p>
              <h3 className="mt-2 font-display text-lg font-bold text-charcoal-50">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-400">
                {step.body}
              </p>
            </m.div>
          ))}
        </div>

        <p className="mt-12 text-sm leading-relaxed text-charcoal-600">
          We don&apos;t take fixed-price engagements for requirements that are still being
          discovered. If the scope isn&apos;t clear enough to write down, a paid discovery
          sprint is the right starting point — not a build contract.
        </p>
      </Container>
    </section>
  );
}
