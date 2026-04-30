/**
 * Central barrel export for all domain schemas.
 * Import from "@/data/schemas" — never import schema files directly.
 *
 * Phase 2 (Sanity CMS): replace these static-file implementations with
 * Sanity client queries while keeping all interface contracts identical.
 */

export * from "./shared";
export * from "./service.schema";
export * from "./caseStudy.schema";
export * from "./blog.schema";
export * from "./contact.schema";
