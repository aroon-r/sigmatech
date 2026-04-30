import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/metadata";
import { SERVICES } from "@/data/content/services";
import { CASE_STUDIES } from "@/data/content/work";
import { BLOG_POSTS } from "@/data/content/blog";

type ChangeFreq =
  | "always" | "hourly" | "daily"
  | "weekly" | "monthly" | "yearly" | "never";

function route(
  path: string,
  priority: number,
  lastModified: Date | string,
  changeFrequency: ChangeFreq = "monthly",
): MetadataRoute.Sitemap[number] {
  return {
    url:             `${BASE_URL}${path}`,
    lastModified:    new Date(lastModified),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const static_routes: MetadataRoute.Sitemap = [
    route("/",        1.0, new Date(), "weekly"),
    route("/contact", 0.9, new Date(), "monthly"),
    route("/services",0.9, new Date(), "monthly"),
    route("/work",    0.9, new Date(), "weekly"),
    route("/about",   0.8, new Date(), "monthly"),
    route("/blog",    0.8, new Date(), "daily"),
    route("/privacy", 0.3, new Date(), "yearly"),
    route("/terms",   0.3, new Date(), "yearly"),
  ];

  const service_routes: MetadataRoute.Sitemap = SERVICES.map((s) =>
    route(`/services/${s.slug}`, 0.8, s.updatedAt, "monthly"),
  );

  const case_study_routes: MetadataRoute.Sitemap = CASE_STUDIES
    .filter((cs) => cs.status === "published")
    .map((cs) => route(`/work/${cs.slug}`, 0.7, cs.updatedAt, "monthly"));

  const blog_routes: MetadataRoute.Sitemap = BLOG_POSTS
    .filter((p) => p.status === "published")
    .map((p) => route(`/blog/${p.slug}`, 0.6, p.updatedAt, "weekly"));

  return [
    ...static_routes,
    ...service_routes,
    ...case_study_routes,
    ...blog_routes,
  ];
}
