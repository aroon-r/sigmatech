import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    // Mirror the @/ alias from tsconfig.json so imports work identically
    // in both the test runner and the Next.js compiler.
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  test: {
    // jsdom provides browser-like globals (document, window, fetch) for
    // component and validation tests. E2E tests use Playwright instead.
    environment: "jsdom",

    // Loaded before every test file — sets up jest-dom matchers and cleanup.
    setupFiles: ["./src/test/setup.ts"],

    // Allow describe/it/expect without explicit imports (matches Jest DX).
    globals: true,

    // ─── Coverage ────────────────────────────────────────────────────────
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      reportsDirectory: "./coverage",

      // Minimum thresholds — CI fails if any drop below these.
      thresholds: {
        lines:      80,
        functions:  80,
        branches:   75,
        statements: 80,
      },

      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        // Type-only files and test infrastructure
        "src/**/*.d.ts",
        "src/test/**",
        "src/**/__tests__/**",
        // Route Handlers and Server Actions are covered by E2E (Playwright)
        "src/app/api/**",
        "src/app/actions/**",
        // Static data is covered by content integrity tests, not line coverage
        "src/data/content/**",
        "src/data/schemas/**",
        // Next.js internals
        "src/app/layout.tsx",
        "src/app/sitemap.ts",
        "src/app/robots.ts",
      ],
    },

    // ─── File discovery ───────────────────────────────────────────────────
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next", "e2e/**"],

    // Friendly output: show each test name, not just a summary
    reporter: "verbose",
  },
});
