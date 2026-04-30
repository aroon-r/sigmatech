// Re-export shim — keeps API route handlers pointing at a stable path.
// The source of truth is src/data/content/blog.ts.
export { BLOG_POSTS, BLOG_POSTS_FULL, BLOG_POST_BY_SLUG } from "./content/blog";
