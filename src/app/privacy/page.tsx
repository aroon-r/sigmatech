import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = createMetadata({
  title:   "Privacy Policy",
  description:
    "How SigmaTech collects, uses, and protects your personal data. We are committed to your privacy and full compliance with UK GDPR.",
  path:    "/privacy",
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

export default function PrivacyPage() {
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
            <h1 className="font-display text-4xl font-bold text-charcoal-50">Privacy Policy</h1>
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
            <Section title="Who we are">
              <p>
                SigmaTech Ltd ("SigmaTech", "we", "us") is the data controller for personal
                information collected through this website. We are registered in England and
                Wales. You can contact us regarding data matters at{" "}
                <a
                  href="mailto:hello@sigmatech.co.uk"
                  className="text-electric-400 hover:text-electric-300 transition-colors"
                >
                  hello@sigmatech.co.uk
                </a>
                .
              </p>
            </Section>

            <Section title="What data we collect">
              <p>We collect personal data only when you choose to provide it:</p>
              <ul className="ml-4 list-disc space-y-1 text-charcoal-300">
                <li><strong className="text-charcoal-200">Contact enquiries</strong> — name, email address, company name, and the message you write in our contact form.</li>
                <li><strong className="text-charcoal-200">Analytics</strong> — aggregated, anonymised usage data (page views, session duration) collected via privacy-respecting analytics. No cookies are set without your consent.</li>
              </ul>
              <p>We do not collect payment information, sensitive personal data, or data about children.</p>
            </Section>

            <Section title="How we use your data">
              <p>We use the information you provide solely to:</p>
              <ul className="ml-4 list-disc space-y-1 text-charcoal-300">
                <li>Respond to your enquiry or project request.</li>
                <li>Understand how our website is used so we can improve it.</li>
              </ul>
              <p>We will never sell, rent, or share your personal data with third parties for marketing purposes.</p>
            </Section>

            <Section title="Legal basis for processing">
              <p>
                Under UK GDPR, our lawful basis for processing contact enquiry data is{" "}
                <strong className="text-charcoal-200">legitimate interests</strong> — responding
                to a business enquiry you have voluntarily submitted. For analytics, the basis
                is <strong className="text-charcoal-200">consent</strong> where required.
              </p>
            </Section>

            <Section title="How long we keep your data">
              <p>
                We retain contact enquiry data for a maximum of 24 months after your last
                communication with us, after which it is securely deleted. Anonymised analytics
                data has no fixed retention limit as it cannot identify you.
              </p>
            </Section>

            <Section title="Your rights">
              <p>Under UK GDPR, you have the right to:</p>
              <ul className="ml-4 list-disc space-y-1 text-charcoal-300">
                <li><strong className="text-charcoal-200">Access</strong> — request a copy of the personal data we hold about you.</li>
                <li><strong className="text-charcoal-200">Rectification</strong> — ask us to correct inaccurate data.</li>
                <li><strong className="text-charcoal-200">Erasure</strong> — ask us to delete your data where we have no overriding legitimate reason to retain it.</li>
                <li><strong className="text-charcoal-200">Objection</strong> — object to our processing your data under legitimate interests.</li>
                <li><strong className="text-charcoal-200">Portability</strong> — receive your data in a commonly used format.</li>
              </ul>
              <p>
                To exercise any of these rights, email us at{" "}
                <a
                  href="mailto:hello@sigmatech.co.uk"
                  className="text-electric-400 hover:text-electric-300 transition-colors"
                >
                  hello@sigmatech.co.uk
                </a>
                . We will respond within 30 days.
              </p>
            </Section>

            <Section title="Cookies">
              <p>
                This website uses only essential, functional cookies required to make the site
                work. No third-party advertising or tracking cookies are set. Where analytics
                cookies are used, they require your explicit consent and collect no personally
                identifiable information.
              </p>
            </Section>

            <Section title="Changes to this policy">
              <p>
                We may update this policy when our data practices change. Material changes will
                be announced on this page with an updated "last updated" date. We encourage you
                to review this page periodically.
              </p>
            </Section>

            <Section title="Contact & complaints">
              <p>
                For any privacy-related questions, contact us at{" "}
                <a
                  href="mailto:hello@sigmatech.co.uk"
                  className="text-electric-400 hover:text-electric-300 transition-colors"
                >
                  hello@sigmatech.co.uk
                </a>
                . You also have the right to lodge a complaint with the UK Information
                Commissioner&apos;s Office (ICO) at{" "}
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric-400 hover:text-electric-300 transition-colors"
                >
                  ico.org.uk
                </a>
                .
              </p>
            </Section>
          </div>
        </Container>
      </section>
    </main>
  );
}
