"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Code2, Cloud, ShieldCheck, Palette, Lightbulb, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Service } from "@/data/schemas";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

// ─── Icon registry ────────────────────────────────────────────────────────────

const iconMap: Record<string, LucideIcon> = {
  Code2, Cloud, ShieldCheck, Palette, Lightbulb, Users,
};

// ─── Background ───────────────────────────────────────────────────────────────

function HeroBackground() {
  return (
    <>
      {/* Top-centre radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px]"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(10,132,255,0.18) 0%, transparent 70%)",
        }}
      />
      {/* Bottom fade into page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-bg))",
        }}
      />
      {/* Dot grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-texture opacity-[0.12]"
      />
    </>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ServiceHeroProps {
  service:  Service;
  /** Slot for <Breadcrumbs> — passed from the Server Component page. */
  children: React.ReactNode;
}

export default function ServiceHero({ service, children }: ServiceHeroProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const Icon = iconMap[service.icon] ?? Code2;

  const contentVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0, 0, 0.2, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.70, delay: 0.18, ease: [0, 0, 0.2, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden pb-20 pt-8">
      <HeroBackground />

      <Container>
        {/* ── Breadcrumbs ── */}
        <div className="relative mb-10">{children}</div>

        {/* ── Split layout ── */}
        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_420px]">

          {/* Left: Text content */}
          <motion.div
            initial={prefersReduced ? "visible" : "hidden"}
            animate="visible"
            variants={prefersReduced ? {} : contentVariants}
          >
            {/* Service badge */}
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
              style={{
                background: "rgba(10,132,255,0.10)",
                border:     "1px solid rgba(10,132,255,0.28)",
              }}
            >
              <Icon className="h-3.5 w-3.5 text-electric-400" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider text-electric-400">
                Service
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-4xl font-bold tracking-tight text-charcoal-50 sm:text-5xl lg:text-6xl">
              {service.name}
            </h1>

            {/* Tagline */}
            <p className="mt-3 text-xl font-medium text-electric-300">
              {service.tagline}
            </p>

            {/* Description */}
            <p className="mt-5 max-w-xl text-lg leading-8 text-charcoal-300">
              {service.description}
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-3">
              {service.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl px-4 py-3"
                  style={{
                    background:           "rgba(255,255,255,0.03)",
                    backdropFilter:       "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border:               "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <p className="font-display text-2xl font-bold text-charcoal-50">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-charcoal-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                href={`/contact?service=${service.slug}`}
                size="lg"
                rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              >
                Get a quote
              </Button>
              <Button href="/work" variant="outline" size="lg">
                View our work
              </Button>
            </div>
          </motion.div>

          {/* Right: Cover image */}
          {service.coverImageUrl && (
            <motion.div
              className="hidden lg:block"
              initial={prefersReduced ? "visible" : "hidden"}
              animate="visible"
              variants={prefersReduced ? {} : imageVariants}
            >
              <div
                className="relative h-[460px] overflow-hidden rounded-3xl"
                style={{
                  border:     "1px solid rgba(255,255,255,0.08)",
                  boxShadow:  "0 24px 64px rgba(0,0,0,0.50)",
                }}
              >
                <Image
                  src={service.coverImageUrl}
                  alt={service.coverImageAlt ?? service.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="420px"
                />
                {/* Bottom gradient — keeps image from clashing with page bg */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-48"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,14,22,0.85) 0%, transparent 100%)",
                  }}
                />

                {/* Top-edge prismatic highlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(255,255,255,0.18) 30%, rgba(10,132,255,0.55) 50%, rgba(255,255,255,0.18) 70%, transparent)",
                  }}
                />
              </div>
            </motion.div>
          )}

        </div>
      </Container>
    </section>
  );
}
