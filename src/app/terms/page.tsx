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
            <Section title="Acceptance of terms">
              <p>
                By accessing this website or engaging Nexora Ltd ("Nexora", "we", "us")
                for services, you agree to be bound by these Terms of Service and all applicable
                laws. If you do not agree, please do not use this website or our services.
              </p>
            </Section>

            <Section title="Services">
              <p>
                Nexora provides software development, cloud infrastructure, QA testing,
                UI/UX design, technology consulting, and staff augmentation services. The
                specific scope, deliverables, timeline, and fees for each engagement are set
                out in a separate Statement of Work ("SOW") or project agreement signed by
                both parties.
              </p>
              <p>
                These Terms apply to use of this website. Separate contractual terms govern
                client engagements and take precedence over these Terms for those matters.
              </p>
            </Section>

            <Section title="Intellectual property">
              <p>
                All content on this website — including text, graphics, logos, and code — is
                owned by or licensed to Nexora and is protected by UK copyright law.
              </p>
              <p>
                Unless otherwise agreed in writing, client-commissioned work products are owned
                by the client upon receipt of full payment. Nexora retains ownership of
                pre-existing tools, libraries, frameworks, and methodologies used during delivery.
              </p>
            </Section>

            <Section title="Confidentiality">
              <p>
                Each party agrees to keep the other's confidential information secure and to
                use it only for the purpose of the engagement. This obligation survives
                termination of any project agreement for a period of three years.
              </p>
            </Section>

            <Section title="Payment">
              <p>
                Fees and payment schedules are agreed in each SOW. Invoices are due within
                30 days of the invoice date unless otherwise specified. Late payments may
                attract interest at 8% above the Bank of England base rate under the Late
                Payment of Commercial Debts (Interest) Act 1998.
              </p>
            </Section>

            <Section title="Limitation of liability">
              <p>
                To the fullest extent permitted by law, Nexora's total liability for any
                claim arising from or relating to our services will not exceed the fees paid
                by you in the three months preceding the event giving rise to the claim.
              </p>
              <p>
                We are not liable for indirect, consequential, incidental, or punitive damages,
                including loss of profits, data, or business opportunity.
              </p>
            </Section>

            <Section title="Disclaimer of warranties">
              <p>
                This website and its content are provided "as is" without warranties of any
                kind, express or implied. We make no representation that the site will be
                uninterrupted, error-free, or free of viruses.
              </p>
            </Section>

            <Section title="Governing law">
              <p>
                These Terms are governed by the laws of England and Wales. Any disputes arising
                under or in connection with these Terms shall be subject to the exclusive
                jurisdiction of the courts of England and Wales.
              </p>
            </Section>

            <Section title="Changes to these terms">
              <p>
                We may revise these Terms at any time by updating this page. Continued use of
                the website after changes are posted constitutes your acceptance of the revised
                Terms.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Questions about these Terms?{" "}
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
