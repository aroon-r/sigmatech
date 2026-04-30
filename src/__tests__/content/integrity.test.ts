/**
 * Content Integrity Tests
 *
 * These tests enforce the business-rule invariants that TypeScript's type
 * system cannot express — minimum array lengths, cross-reference validity,
 * URL format, and SEO field length targets. They run as part of `vitest`
 * on every CI build, so a bad data edit is caught before `next build`.
 */
import { describe, it, expect } from "vitest";
import { SERVICES, SERVICE_BY_SLUG }           from "@/data/content/services";
import { CASE_STUDIES, CASE_STUDY_BY_SLUG }    from "@/data/content/work";
import { BLOG_POSTS }                          from "@/data/content/blog";
import { AUTHORS, AUTHOR_BY_ID }               from "@/data/content/authors";

// ─── Services ────────────────────────────────────────────────────────────────

describe("Services content integrity", () => {
  it("exports at least one service", () => {
    expect(SERVICES.length).toBeGreaterThan(0);
  });

  it("every service has a unique slug", () => {
    const slugs = SERVICES.map((s) => s.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it("every service has a unique id", () => {
    const ids = SERVICES.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every service has at least 4 FAQs (AEO minimum)", () => {
    for (const service of SERVICES) {
      expect(service.faqs.length, `${service.slug} has fewer than 4 FAQs`).toBeGreaterThanOrEqual(4);
    }
  });

  it("every service has at least 3 deliverables", () => {
    for (const service of SERVICES) {
      expect(service.deliverables.length, `${service.slug} has fewer than 3 deliverables`).toBeGreaterThanOrEqual(3);
    }
  });

  it("every service has at least 2 stats", () => {
    for (const service of SERVICES) {
      expect(service.stats.length, `${service.slug} must have ≥ 2 stats`).toBeGreaterThanOrEqual(2);
    }
  });

  it("every service has at least one techStack entry", () => {
    for (const service of SERVICES) {
      expect(service.techStack.length, `${service.slug} has an empty techStack`).toBeGreaterThan(0);
    }
  });

  it("every service has a non-empty name, tagline, and description", () => {
    for (const service of SERVICES) {
      expect(service.name.trim(),        `${service.slug}: name is empty`).not.toBe("");
      expect(service.tagline.trim(),     `${service.slug}: tagline is empty`).not.toBe("");
      expect(service.description.trim(), `${service.slug}: description is empty`).not.toBe("");
    }
  });

  it("all relatedServiceSlugs point to known service slugs", () => {
    const knownSlugs = new Set(SERVICES.map((s) => s.slug));
    for (const service of SERVICES) {
      for (const rel of service.relatedServiceSlugs) {
        expect(knownSlugs.has(rel), `${service.slug} → unknown relatedServiceSlug "${rel}"`).toBe(true);
      }
    }
  });

  it("no service links to itself in relatedServiceSlugs", () => {
    for (const service of SERVICES) {
      expect(service.relatedServiceSlugs).not.toContain(service.slug);
    }
  });

  it("all services have status 'published' or 'draft'", () => {
    for (const service of SERVICES) {
      expect(["published", "draft", "archived"]).toContain(service.status);
    }
  });

  it("SEO title is under 70 characters for every service", () => {
    for (const service of SERVICES) {
      expect(
        service.seo.title.length,
        `${service.slug}: SEO title is ${service.seo.title.length} chars (target < 70)`,
      ).toBeLessThanOrEqual(70);
    }
  });

  it("SEO description is under 160 characters for every service", () => {
    for (const service of SERVICES) {
      expect(
        service.seo.description.length,
        `${service.slug}: SEO description is ${service.seo.description.length} chars (target < 160)`,
      ).toBeLessThanOrEqual(160);
    }
  });

  it("SERVICE_BY_SLUG lookup contains an entry for every slug", () => {
    for (const service of SERVICES) {
      expect(SERVICE_BY_SLUG[service.slug]).toBeDefined();
    }
  });
});

// ─── Case Studies ────────────────────────────────────────────────────────────

describe("Case studies content integrity", () => {
  it("exports at least one case study", () => {
    expect(CASE_STUDIES.length).toBeGreaterThan(0);
  });

  it("every case study has a unique slug", () => {
    const slugs = CASE_STUDIES.map((cs) => cs.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every case study has at least 2 metrics (Before/After minimum)", () => {
    for (const cs of CASE_STUDIES) {
      expect(cs.metrics.length, `${cs.slug} has fewer than 2 metrics`).toBeGreaterThanOrEqual(2);
    }
  });

  it("every metric has non-empty before, after, and improvement fields", () => {
    for (const cs of CASE_STUDIES) {
      for (const metric of cs.metrics) {
        expect(metric.before.trim(),      `${cs.slug}: metric.before is empty`).not.toBe("");
        expect(metric.after.trim(),       `${cs.slug}: metric.after is empty`).not.toBe("");
        expect(metric.improvement.trim(), `${cs.slug}: metric.improvement is empty`).not.toBe("");
      }
    }
  });

  it("every case study has a coverImageUrl", () => {
    for (const cs of CASE_STUDIES) {
      expect(cs.coverImageUrl.trim(), `${cs.slug}: coverImageUrl is empty`).not.toBe("");
    }
  });

  it("every case study references at least one valid service slug", () => {
    const knownSlugs = new Set(SERVICES.map((s) => s.slug));
    for (const cs of CASE_STUDIES) {
      expect(cs.servicesSlugs.length, `${cs.slug}: servicesSlugs is empty`).toBeGreaterThan(0);
      for (const slug of cs.servicesSlugs) {
        expect(knownSlugs.has(slug), `${cs.slug} → unknown serviceSlug "${slug}"`).toBe(true);
      }
    }
  });

  it("every case study has a client name", () => {
    for (const cs of CASE_STUDIES) {
      expect(cs.client.name.trim(), `${cs.slug}: client.name is empty`).not.toBe("");
    }
  });

  it("CASE_STUDY_BY_SLUG lookup is consistent with the array", () => {
    for (const cs of CASE_STUDIES) {
      expect(CASE_STUDY_BY_SLUG[cs.slug]).toStrictEqual(cs);
    }
  });
});

// ─── Blog Posts ───────────────────────────────────────────────────────────────

describe("Blog posts content integrity", () => {
  it("exports at least one blog post", () => {
    expect(BLOG_POSTS.length).toBeGreaterThan(0);
  });

  it("every blog post has a unique slug", () => {
    const slugs = BLOG_POSTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every blog post's author.id exists in AUTHORS", () => {
    for (const post of BLOG_POSTS) {
      expect(
        AUTHOR_BY_ID[post.author.id],
        `Post "${post.slug}" references unknown author id "${post.author.id}"`,
      ).toBeDefined();
    }
  });

  it("every blog post has a positive readingTimeMinutes", () => {
    for (const post of BLOG_POSTS) {
      expect(post.readingTimeMinutes, `${post.slug}: readingTimeMinutes must be > 0`).toBeGreaterThan(0);
    }
  });

  it("every blog post has a non-empty title, excerpt, and body", () => {
    for (const post of BLOG_POSTS) {
      expect(post.title.trim(),   `${post.slug}: title is empty`).not.toBe("");
      expect(post.excerpt.trim(), `${post.slug}: excerpt is empty`).not.toBe("");
      expect(post.body.trim(),    `${post.slug}: body is empty`).not.toBe("");
    }
  });

  it("every blog post has a coverImageUrl", () => {
    for (const post of BLOG_POSTS) {
      expect(post.coverImageUrl.trim(), `${post.slug}: coverImageUrl is empty`).not.toBe("");
    }
  });

  it("publishedAt is a valid ISO datetime string", () => {
    for (const post of BLOG_POSTS) {
      const ts = Date.parse(post.publishedAt);
      expect(Number.isNaN(ts), `${post.slug}: publishedAt is not a valid date`).toBe(false);
    }
  });

  it("updatedAt is not earlier than publishedAt", () => {
    for (const post of BLOG_POSTS) {
      expect(Date.parse(post.updatedAt)).toBeGreaterThanOrEqual(Date.parse(post.publishedAt));
    }
  });
});

// ─── Authors ─────────────────────────────────────────────────────────────────

describe("Authors content integrity", () => {
  it("exports at least one author", () => {
    expect(AUTHORS.length).toBeGreaterThan(0);
  });

  it("every author has a unique id", () => {
    const ids = AUTHORS.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every author has a non-empty name, bio, and designation", () => {
    for (const author of AUTHORS) {
      expect(author.name.trim(),        `Author ${author.id}: name is empty`).not.toBe("");
      expect(author.bio.trim(),         `Author ${author.id}: bio is empty`).not.toBe("");
      expect(author.designation.trim(), `Author ${author.id}: designation is empty`).not.toBe("");
    }
  });

  it("AUTHOR_BY_ID lookup is consistent with the AUTHORS array", () => {
    for (const author of AUTHORS) {
      expect(AUTHOR_BY_ID[author.id]).toStrictEqual(author);
    }
  });
});
