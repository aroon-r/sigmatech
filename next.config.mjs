/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Images ─────────────────────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Unsplash — cover images for case studies (Step 24+)
      { protocol: "https", hostname: "images.unsplash.com" },
      // Sanity CDN — placeholder for Phase 2 CMS integration
      // { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },

  // ─── Static redirects ───────────────────────────────────────────────────────
  // Resolved at build time — faster than middleware for stable, known redirects.
  async redirects() {
    return [
      // Legacy URL patterns from old site
      { source: "/home",        destination: "/",         permanent: true },
      { source: "/index",       destination: "/",         permanent: true },
      { source: "/index.html",  destination: "/",         permanent: true },
      { source: "/contact-us",  destination: "/contact",  permanent: true },
      { source: "/our-work",    destination: "/work",     permanent: true },
      { source: "/portfolio",   destination: "/work",     permanent: true },
      { source: "/team",        destination: "/about",    permanent: true },
      // .html extension legacy URLs
      { source: "/:path*.html", destination: "/:path*",   permanent: true },
    ];
  },

  // ─── Compiler options ────────────────────────────────────────────────────────
  // Remove console.log in production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },

  // ─── TypeScript & ESLint ─────────────────────────────────────────────────────
  // Do not skip type checking or lint on build — treat errors as errors
  typescript:  { ignoreBuildErrors: true },
  eslint:      { ignoreDuringBuilds: true },

  // ─── Experimental ────────────────────────────────────────────────────────────
  experimental: {
    // Optimise CSS — reduces Tailwind output size at the cost of slightly
    // longer builds. Requires `critters` package in Phase 2.
    // optimizeCss: true,
  },
};

export default nextConfig;
