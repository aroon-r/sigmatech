import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { PAGE_METADATA } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import QuickContactForm from "@/components/contact/QuickContactForm";

export const metadata: Metadata = PAGE_METADATA.contact;

// ─── Config ───────────────────────────────────────────────────────────────────
// Replace with your actual Cal.com username and event slug.
const CAL_URL = "https://cal.com/nexora/discovery-call";

// ─── Static content ───────────────────────────────────────────────────────────

const CONTACT_DETAILS = [
  { Icon: Mail, label: "Email", value: "hello@nexora.dev", href: "mailto:hello@nexora.dev" },
] as const;

const SOCIAL_LINKS = [
  { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/nexora" },
  { Icon: Github,   label: "GitHub",   href: "https://github.com/nexora"           },
  { Icon: Twitter,  label: "Twitter",  href: "https://twitter.com/nexora"          },
] as const;

const COMMITMENTS = [
  "Free initial consultation",
  "No lock-in contracts",
  "Clear scope and pricing",
  "Direct communication",
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main>
      <section className="relative py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[320px]"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(10,132,255,0.12) 0%, transparent 70%)",
          }}
        />

        <Container>
          {/* ── Header ── */}
          <div className="relative mb-16 text-center">
            <p className="section-label mb-3">Get in touch</p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-charcoal-50 sm:text-5xl">
              Start your project
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-charcoal-400">
              Send a quick message or book a 30-minute discovery call — whichever works for you.
            </p>
          </div>

          {/* ── Two-option layout ── */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* Option A — Quick message ────────────────────────────────────── */}
            <div
              className="flex flex-col rounded-2xl border border-charcoal-800 bg-charcoal-900/40 p-8"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-charcoal-500">
                Option A
              </p>
              <h2 className="mb-1 font-display text-xl font-bold text-charcoal-50">
                Send a message
              </h2>
              <p className="mb-8 text-sm text-charcoal-400">
                Prefer async? Fill in the form and we'll get back to you.
              </p>

              <QuickContactForm />
            </div>

            {/* Option B — Book a call ───────────────────────────────────────── */}
            <div
              className="flex flex-col rounded-2xl border border-charcoal-800 bg-charcoal-900/40 p-8"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-charcoal-500">
                Option B
              </p>
              <h2 className="mb-1 font-display text-xl font-bold text-charcoal-50">
                Book a free call
              </h2>
              <p className="mb-8 text-sm text-charcoal-400">
                Pick a time that works for you. 30 minutes, no prep needed, no sales pitch.
              </p>

              {/* Cal.com booking card */}
              <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-xl border border-charcoal-700 p-8 text-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(10,132,255,0.12)", border: "1px solid rgba(10,132,255,0.22)" }}
                >
                  <CalendarDays className="h-8 w-8 text-electric-400" aria-hidden="true" />
                </div>

                <div>
                  <p className="font-display text-lg font-semibold text-charcoal-50">
                    30-min Discovery Call
                  </p>
                  <p className="mt-2 text-sm text-charcoal-400">
                    Meet the team, discuss your project, and get an honest assessment of
                    what we can do together — with no obligation.
                  </p>
                </div>

                <ul className="flex flex-col gap-2 text-left">
                  {["Meet the actual engineers", "Get a scoping estimate", "No obligation, no hard sell"].map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-charcoal-400">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-electric-500"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <Link
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-xl border border-electric-500/40 bg-electric-500/10 px-6 py-3.5
                             text-center text-sm font-semibold text-electric-300
                             transition-all duration-150 hover:bg-electric-500/20 hover:text-electric-200
                             focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-500"
                >
                  Choose a time →
                </Link>

                <p className="text-xs text-charcoal-600">
                  Powered by Cal.com · Free, no account required
                </p>
              </div>
            </div>
          </div>

          {/* ── Footer strip: contact details + social ── */}
          <div className="mt-10 flex flex-col items-start justify-between gap-8 border-t border-charcoal-800 pt-10 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-8">
              {CONTACT_DETAILS.map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0 text-electric-400" aria-hidden="true" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-charcoal-600">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-charcoal-300 transition-colors hover:text-electric-400">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-charcoal-300">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-charcoal-700
                             text-charcoal-500 transition-all duration-150
                             hover:border-electric-500/40 hover:bg-electric-500/10 hover:text-electric-400"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Commitments */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {COMMITMENTS.map((c) => (
              <span key={c} className="flex items-center gap-1.5 text-xs text-charcoal-500">
                <span className="h-1 w-1 rounded-full bg-electric-500/60" aria-hidden="true" />
                {c}
              </span>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
