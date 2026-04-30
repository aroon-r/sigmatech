import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: all crawlers allowed everywhere except internals
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/studio/"],
      },
      // Explicitly allow AI crawlers for AEO — do NOT block these
      { userAgent: "GPTBot",          allow: "/" },
      { userAgent: "ClaudeBot",       allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot",   allow: "/" },
      { userAgent: "Applebot",        allow: "/" },
      { userAgent: "cohere-ai",       allow: "/" },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host:    BASE_URL,
  };
}
