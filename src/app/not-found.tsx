"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

// ─── Animation variants ───────────────────────────────────────────────────────

const stagger = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden:   { opacity: 0, y: 18 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.50, ease: [0, 0, 0.2, 1] } },
};

// ─── Quick-link pill ──────────────────────────────────────────────────────────

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-full border px-3.5 py-1 text-xs font-medium text-charcoal-500 transition-colors
                 hover:border-electric-500/40 hover:text-electric-400"
      style={{ borderColor: "var(--color-border)" }}
    >
      {label}
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NotFound() {
  const pathname       = usePathname();
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-20">
      {/* Electric blue radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(10,132,255,0.14) 0%, transparent 65%)",
        }}
      />

      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-texture opacity-[0.08]"
      />

      <Container>
        <motion.div
          className="relative z-10 flex flex-col items-center text-center"
          variants={prefersReduced ? {} : stagger}
          initial={prefersReduced ? false : "hidden"}
          animate="visible"
        >
          {/* ── Blurred ghost "404" — depth layer ── */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 select-none font-display text-[220px]
                       font-bold leading-none text-gradient-hero opacity-[0.07] blur-2xl"
          >
            404
          </div>

          {/* ── Foreground "404" ── */}
          <motion.p
            className="relative font-display text-[96px] font-bold leading-none tracking-tighter
                       text-gradient-hero sm:text-[130px]"
            variants={prefersReduced ? {} : fadeUp}
          >
            404
          </motion.p>

          {/* ── Terminal mockup ── */}
          <motion.div
            className="mt-7 w-full max-w-md overflow-hidden rounded-xl text-left font-mono text-sm"
            style={{
              background: "rgba(255,255,255,0.025)",
              border:     "1px solid rgba(255,255,255,0.07)",
            }}
            variants={prefersReduced ? {} : fadeUp}
          >
            {/* Traffic lights */}
            <div
              className="flex items-center gap-1.5 px-4 py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/60"    aria-hidden="true" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" aria-hidden="true" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/60"  aria-hidden="true" />
              <span className="ml-2 text-[10px] text-charcoal-600">bash — nexora</span>
            </div>

            {/* Terminal output */}
            <div className="px-4 py-4 leading-6">
              <p className="text-charcoal-600">
                <span className="text-electric-400">❯</span>{" "}
                GET{" "}
                <span className="text-charcoal-300">{pathname}</span>
              </p>
              <p className="mt-2 text-red-400">
                ✕ RouteError: Page not found (HTTP 404)
              </p>
              <p className="mt-1 text-yellow-500/80">
                ⚠ This route hasn't been tested yet.
              </p>
              <p className="mt-0.5 text-charcoal-700">
                &nbsp;&nbsp;0 assertions · 0 tests ran · 0 snapshots
              </p>
              <p className="mt-2.5 flex items-center gap-1.5 text-charcoal-600">
                <span className="text-electric-400">❯</span>{" "}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
                >
                  ▋
                </motion.span>
              </p>
            </div>
          </motion.div>

          {/* ── Headline ── */}
          <motion.h1
            className="mt-8 font-display text-2xl font-bold tracking-tight text-charcoal-50 sm:text-3xl"
            variants={prefersReduced ? {} : fadeUp}
          >
            Looks like this page went missing.
          </motion.h1>

          {/* ── Subtext ── */}
          <motion.p
            className="mt-3 max-w-sm text-base leading-7 text-charcoal-400"
            variants={prefersReduced ? {} : fadeUp}
          >
            The URL might be mistyped, or the page may have been moved or removed.
            Here are some places to start:
          </motion.p>

          {/* ── Quick links ── */}
          <motion.div
            className="mt-5 flex flex-wrap items-center justify-center gap-2"
            variants={prefersReduced ? {} : fadeUp}
          >
            <QuickLink href="/services" label="/services" />
            <QuickLink href="/work"     label="/work"     />
            <QuickLink href="/blog"     label="/blog"     />
            <QuickLink href="/contact"  label="/contact"  />
          </motion.div>

          {/* ── Primary CTAs ── */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            variants={prefersReduced ? {} : fadeUp}
          >
            <Button
              href="/"
              size="lg"
              leftIcon={<Home className="h-4 w-4" aria-hidden="true" />}
            >
              Back to Home
            </Button>
            <Button href="/services" variant="outline" size="lg">
              View our services
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
