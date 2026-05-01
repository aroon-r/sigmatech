import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    // Mirror the @/ alias from tsconfig.json so imports work identically
    // in both the test runner and the Next.js compiler.
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  test: {
    // Default to node. Switch to jsdom per-file with @vitest-environment jsdom
    // when React component tests are introduced (requires jsdom + testing-library).
    environment: "node",

    // Allow describe/it/expect without explicit imports (matches Jest DX).
    globals: true,

    // setupFiles intentionally omitted — @testing-library packages are not
    // installed. Add them back when React component tests are introduced.

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
        // Route Handlers and Server Actions are covered by the API test
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
    reporters: ["verbose"],
  },
});
