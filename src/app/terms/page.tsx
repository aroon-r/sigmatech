import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = createMetadata({
  title:   "Terms of Service",
  description:
    "Terms and conditions governing the use of Nexora's website and software development services.",
  path:    "/terms",
  noIndex: false,
});

// ─── Shared section styles ─────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="mb-4 font-display text-xl font-bold text-charcoal-50">{title}</h2>
      <div className="space-y-3 text-sm leading-7 text-charcoal-300">{children}</div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TermsPage() {
  return (
    <main>
      <section className="relative overflow-hidden py-20 pb-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[300px]"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(10,132,255,0.10) 0%, transparent 70%)",
          }}
        />
        <Container>
          <div className="relative max-w-2xl">
            <p className="section-label mb-3">Legal</p>
            <h1 className="font-display text-4xl font-bold text-charcoal-50">Terms of Service</h1>
            <p className="mt-4 text-charcoal-400">Last updated: 26 April 2026</p>
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div
            className="max-w-2xl rounded-2xl p-8 sm:p-10"
            style={{
              background: "rgba(255,255,255,0.02)",
              border:     "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Section title="1. Acceptance of terms">
              <p>
                By accessing this website or engaging our services, you agree to these Terms.
                If you do not agree, do not use this website.
              </p>
            </Section>

            <Section title="2. Services">
              <p>
                Nexora provides software development, consulting, and related services. The
                exact scope, deliverables, timelines, and pricing will be defined separately
                for each engagement.
              </p>
            </Section>

            <Section title="3. Intellectual property">
              <p>
                All content on this website, including text, design, graphics, and code, is
                owned by or licensed to Nexora.
              </p>
              <p>Unless otherwise agreed in writing:</p>
              <ul className="ml-4 list-disc space-y-1 text-charcoal-300">
                <li>Client-delivered work becomes the client&apos;s property upon full payment</li>
                <li>Nexora retains ownership of pre-existing tools, frameworks, and methodologies</li>
              </ul>
            </Section>

            <Section title="4. Confidentiality">
              <p>
                Both parties agree to keep confidential information secure and use it only
                for the purpose of the engagement.
              </p>
            </Section>

            <Section title="5. Payments">
              <p>
                Payment terms are defined per project. Invoices must be paid within the
                agreed timeframe.
              </p>
            </Section>

            <Section title="6. Limitation of liability">
              <p>
                To the maximum extent permitted, Nexora is not liable for indirect,
                incidental, or consequential damages arising from use of the website or
                services.
              </p>
            </Section>

            <Section title="7. Changes to these terms">
              <p>
                We may update these Terms from time to time. Continued use of the website
                means you accept the updated Terms.
              </p>
            </Section>

            <Section title="8. Governing framework">
              <p>
                These Terms are governed by generally applicable laws. No specific
                jurisdiction is claimed.
              </p>
            </Section>

            <Section title="9. Contact">
              <p>
                For questions about these Terms:{" "}
                <a
                  href="mailto:hello@nexora.dev"
                  className="text-electric-400 hover:text-electric-300 transition-colors"
                >
                  hello@nexora.dev
                </a>
              </p>
            </Section>
          </div>
        </Container>
      </section>
    </main>
  );
}
