import { NextRequest, NextResponse } from "next/server";

// ─── Security header values ───────────────────────────────────────────────────

const CSP = [
  "default-src 'self'",
  // Next.js requires 'unsafe-inline' for hydration scripts in production.
  // Tighten to nonce-based CSP in Phase 2.
  "script-src 'self' 'unsafe-inline' https://eu.i.posthog.com https://app.posthog.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self'",
  "connect-src 'self' https://api.resend.com https://eu.i.posthog.com",
  "media-src 'none'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS: Record<string, string> = {
  // Prevent embedding in iframes — stops clickjacking
  "X-Frame-Options":           "DENY",
  // Prevent MIME-type sniffing
  "X-Content-Type-Options":    "nosniff",
  // Minimal referrer info to third parties
  "Referrer-Policy":           "strict-origin-when-cross-origin",
  // Disable unused browser APIs
  "Permissions-Policy":        "camera=(), microphone=(), geolocation=(), payment=()",
  // Allow DNS prefetch for performance
  "X-DNS-Prefetch-Control":    "on",
  // HSTS — force HTTPS for 2 years, include subdomains, eligible for preload list
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  // Content Security Policy
  "Content-Security-Policy":   CSP,
};

// ─── Static redirects (pattern-based — complement next.config.mjs) ───────────

const REDIRECTS: { from: RegExp; to: string; permanent?: boolean }[] = [
  // Normalise any double-slash paths
  { from: /\/\/+/, to: "/", permanent: true },
];

// ─── Middleware ───────────────────────────────────────────────────────────────

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Trailing slash normalisation (except root "/")
  if (pathname !== "/" && pathname.endsWith("/")) {
    const clean = new URL(pathname.slice(0, -1), request.url);
    // Preserve query string
    clean.search = request.nextUrl.search;
    return NextResponse.redirect(clean, { status: 301 });
  }

  // 2. Pattern-based redirects
  for (const rule of REDIRECTS) {
    if (rule.from.test(pathname)) {
      const destination = new URL(pathname.replace(rule.from, rule.to), request.url);
      return NextResponse.redirect(destination, { status: rule.permanent ? 301 : 302 });
    }
  }

  // 3. Pass request through — apply security headers to response
  const response = NextResponse.next();

  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // 4. Expose visitor country for geo-based content (Phase 2 — read in Server Components)
  const country = request.geo?.country ?? "GB";
  response.headers.set("x-visitor-country", country);

  return response;
}

// Run middleware on all routes except Next.js internals and static files
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons/|images/|og/).*)",
  ],
};
