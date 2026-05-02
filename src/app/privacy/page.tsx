import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = createMetadata({
  title:   "Privacy Policy",
  description:
    "How Nexora collects, uses, and protects information submitted through this site.",
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
            <Section title="1. Information we collect">
              <p>We only collect information you choose to provide, including:</p>
              <ul className="ml-4 list-disc space-y-1 text-charcoal-300">
                <li>Name</li>
                <li>Email address</li>
                <li>Company name, if provided</li>
                <li>Message content</li>
              </ul>
              <p>
                We may also collect basic usage data, such as page visits, to understand how
                visitors use the site.
              </p>
            </Section>

            <Section title="2. How we use your information">
              <p>We use submitted information to:</p>
              <ul className="ml-4 list-disc space-y-1 text-charcoal-300">
                <li>Respond to enquiries</li>
                <li>Communicate about potential work</li>
                <li>Improve the website and enquiry experience</li>
              </ul>
              <p>We do not sell or rent personal information.</p>
            </Section>

            <Section title="3. Data sharing">
              <p>
                We do not share personal information with third parties except when necessary to:
              </p>
              <ul className="ml-4 list-disc space-y-1 text-charcoal-300">
                <li>Operate essential services such as hosting, forms, analytics, or email delivery</li>
                <li>Comply with legal obligations</li>
              </ul>
            </Section>

            <Section title="4. Data retention">
              <p>
                We keep enquiry data only as long as needed to respond and maintain relevant
                communication. You may request deletion of your submitted information at any time.
              </p>
            </Section>

            <Section title="5. Cookies and analytics">
              <p>
                This website may use cookies or basic analytics tools to understand site usage
                and improve the experience. You can control cookies through your browser settings.
              </p>
            </Section>

            <Section title="6. Data security">
              <p>
                We take reasonable technical and organisational measures to protect submitted
                information from unauthorised access, misuse, or disclosure.
              </p>
            </Section>

            <Section title="7. Your choices">
              <p>
                You may contact us to request access, correction, or deletion of information
                you submitted through the website.
              </p>
            </Section>

            <Section title="8. Contact">
              <p>
                For privacy-related questions or requests, contact:{" "}
                <a
                  href="mailto:hello@nexora.dev"
                  className="text-electric-400 hover:text-electric-300 transition-colors"
                >
                  hello@nexora.dev
                </a>
              </p>
            </Section>

            <Section title="9. Changes to this policy">
              <p>
                We may update this policy when our data practices change. Updates will be
                posted on this page.
              </p>
            </Section>
          </div>
        </Container>
      </section>
    </main>
  );
}
