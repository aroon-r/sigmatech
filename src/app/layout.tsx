import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { orgSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { AnalyticsConsent } from "@/components/ui/AnalyticsConsent";
import CookieBanner from "@/components/ui/CookieBanner";
import { BASE_URL, SITE_NAME } from "@/lib/metadata";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// ─── Fonts ────────────────────────────────────────────────────────────────────
// All three are variable fonts — one file covers every weight.
// CSS custom properties consumed in tailwind.config.ts fontFamily.

const inter = Inter({
  variable: "--font-sans",
  subsets:  ["latin"],
  display:  "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets:  ["latin"],
  display:  "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets:  ["latin"],
  display:  "swap",
});

// ─── Viewport ─────────────────────────────────────────────────────────────────
// Separated from `metadata` in Next.js 14 — required for themeColor to work.
// themeColor tints the browser chrome on mobile (tab bar / address bar).

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#0D0E16" }, // charcoal-950
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
  width:        "device-width",
  initialScale: 1,
};

// ─── Root Metadata ────────────────────────────────────────────────────────────
// Sets the title template and fallback values for every page in the app.
// Individual page.tsx files override this via their own `export const metadata`.

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default:  `${SITE_NAME} — Modern Software Solutions`,
    template: `%s | ${SITE_NAME}`,
  },

  description:
    "SigmaTech builds high-performance web applications, APIs, and digital products — engineered for reliability and built to scale.",

  robots: {
    index:               true,
    follow:              true,
    "max-snippet":       -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    siteName: SITE_NAME,
    type:     "website",
    locale:   "en_GB",
    url:      BASE_URL,
    images: [
      {
        url:    "/og-image.jpg",
        width:  1200,
        height: 630,
        alt:    `${SITE_NAME} — Modern Software Solutions`,
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    site:        "@sigmatech",
    creator:     "@sigmatech",
    images:      ["/og-image.jpg"],
  },

  icons: {
    icon: [
      { url: "/icons/favicon.ico",    sizes: "any" },
      { url: "/icons/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icons/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple:    "/icons/apple-touch-icon.png",
    shortcut: "/icons/favicon.ico",
  },

  manifest: "/site.webmanifest",
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
    >
      <body
        className={`
          ${inter.variable}
          ${plusJakartaSans.variable}
          ${jetbrainsMono.variable}
          font-sans antialiased
        `}
      >
        {/* Global structured data — present on every page */}
        <JsonLd schema={orgSchema()} />
        <JsonLd schema={websiteSchema()} />

        <MotionProvider>
          {/* Skip-to-content — visible only on keyboard focus, WCAG 2.1 AA */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] btn-primary btn-sm"
          >
            Skip to content
          </a>

          <Navbar />

          <main id="main-content">
            {children}
          </main>

          <Footer />
          <CookieBanner />
        </MotionProvider>

        {/* Analytics load only after the user grants consent */}
        <AnalyticsConsent />
      </body>
    </html>
  );
}
