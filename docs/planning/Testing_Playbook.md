# Step 16 — Testing Playbook

**Status:** ✅ Approved  
**Owner:** Aroon (Software Tester)  
**Stack:** Vitest · React Testing Library · axe-core · Playwright  
**Coverage target:** ≥ 80% lines/functions, ≥ 75% branches

---

## 1. Testing Philosophy

> **Test behaviour, not implementation.** A button test asserts "clicking Submit calls the handler with the right data" — not "the `onClick` prop is attached to the `<button>` element." Tests that know too much about internals break on every refactor.

**Four-layer pyramid:**

```
        ┌─────────────────────┐
        │   E2E (Playwright)  │  ← Fewest, slowest, highest confidence
        ├─────────────────────┤
        │  Integration (RTL)  │  ← Multi-component flows, form submissions
        ├─────────────────────┤
        │   Unit (Vitest)     │  ← Validation logic, utilities, data schemas
        ├─────────────────────┤
        │ Content Integrity   │  ← Static data invariants, referential integrity
        └─────────────────────┘
```

**What each layer owns:**

| Layer | Files tested | Runs in |
|-------|-------------|---------|
| Unit | `src/lib/**`, `src/data/schemas/**` | Vitest (jsdom) |
| Content Integrity | `src/data/content/**` | Vitest (node) |
| Integration | `src/components/**`, `src/app/actions/**` | Vitest (jsdom) + RTL |
| E2E | Full user journeys across pages | Playwright (Chromium) |

---

## 2. Installation

```bash
# Unit + Integration testing
npm install -D vitest @vitejs/plugin-react jsdom
npm install -D @testing-library/react @testing-library/user-event @testing-library/jest-dom

# Accessibility testing (unit layer)
npm install -D @axe-core/react jest-axe

# E2E testing
npm install -D @playwright/test
npx playwright install chromium  # install browser binaries
```

**Add to `package.json` scripts:**

```json
{
  "scripts": {
    "test":            "vitest run",
    "test:watch":      "vitest",
    "test:coverage":   "vitest run --coverage",
    "test:integrity":  "vitest run src/__tests__/content",
    "test:e2e":        "playwright test",
    "test:e2e:ui":     "playwright test --ui",
    "prebuild":        "vitest run src/__tests__/content"
  }
}
```

> The `prebuild` hook runs **content integrity tests before every `next build`**, so a bad data edit is caught before deployment rather than after.

---

## 3. Directory Structure

```
src/
├── __tests__/
│   ├── validations/
│   │   └── contact.test.ts          ← Zod schema validation (42 cases)
│   ├── content/
│   │   └── integrity.test.ts        ← Static data invariants
│   └── components/
│       ├── Button.test.tsx           ← Unit + a11y
│       ├── GlassCard.test.tsx
│       └── ContactForm.test.tsx     ← Integration (form submission flow)
├── test/
│   └── setup.ts                     ← jest-dom matchers, global stubs
e2e/
├── journeys/
│   └── contact-flow.spec.ts         ← Landing → Service → Contact
├── fixtures/
│   └── contact.ts                   ← Test data for E2E
└── playwright.config.ts
vitest.config.ts
```

---

## 4. Unit Testing: Validation Logic

**File:** [src/\_\_tests\_\_/validations/contact.test.ts](../../src/__tests__/validations/contact.test.ts)

The contact form Zod schema has **42 test cases** across 9 describe blocks:

| Block | What it verifies |
|-------|-----------------|
| `valid submissions` | Full form, minimal form, email normalisation, whitespace trimming, multi-service |
| `fullName` | Min/max length, empty string, boundary values (2 and 100 chars) |
| `email` | 5 malformed formats, max length, subdomain support |
| `services` | Empty array, unknown slug, all 6 canonical slugs |
| `budgetRange` | Unknown value, all 7 canonical values |
| `message` | Min/max length, exact boundary values (20 and 2000 chars) |
| `privacyConsent` | `false`, missing, string `"true"`, number `1` |
| `phone (optional)` | E.164 UK, E.164 US, empty string, undefined, no country code |
| `error structure` | Multi-field failure shape, human-readable string arrays |

**Run:**

```bash
vitest run src/__tests__/validations
```

---

## 5. Content Integrity Tests

**File:** [src/\_\_tests\_\_/content/integrity.test.ts](../../src/__tests__/content/integrity.test.ts)

These tests enforce business-rule invariants that TypeScript's type system cannot express. They run as part of `prebuild` so a bad data edit never reaches production.

### What is checked

**Services (12 assertions per run):**
- Unique slugs and IDs
- Minimum 4 FAQs per service (AEO requirement)
- Minimum 3 deliverables per service
- Minimum 2 stats per service
- Non-empty name, tagline, description
- All `relatedServiceSlugs` point to real slugs (no broken cross-references)
- No service links to itself
- SEO title ≤ 70 chars, description ≤ 160 chars
- `SERVICE_BY_SLUG` lookup consistency

**Case Studies:**
- Minimum 2 `metrics` entries (Before/After rule)
- Every metric has non-empty `before`, `after`, `improvement`
- All `servicesSlugs` reference known services
- Non-empty client name and `coverImageUrl`

**Blog Posts:**
- Every `author.id` exists in `AUTHORS`
- `updatedAt` is not earlier than `publishedAt`
- Positive `readingTimeMinutes`
- Valid ISO datetime strings for all dates

**Authors:**
- Unique IDs
- Non-empty `name`, `bio`, `designation`
- `AUTHOR_BY_ID` lookup consistency with the `AUTHORS` array

### Adding new content safely

When a team member adds a new entry to any content file, the integrity tests immediately catch:

```
✗ Case studies content integrity > "my-new-study" has fewer than 2 metrics
✗ Services content integrity > "new-service" → unknown relatedServiceSlug "typo-service"
✗ Blog posts content integrity > Post "draft-post" references unknown author id "auth-999"
```

They do not need to know the rules — the tests tell them exactly what to fix.

---

## 6. Component Testing (React Testing Library + a11y)

### 6.1 Setup pattern

Every component test file follows this structure:

```tsx
// src/__tests__/components/Button.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { expect, describe, it, vi } from "vitest";
import { Button } from "@/components/ui/Button";

expect.extend(toHaveNoViolations);

describe("Button", () => {
  // ── Rendering ──────────────────────────────────────────────────────────
  it("renders its label", () => {
    render(<Button>Get in touch</Button>);
    expect(screen.getByRole("button", { name: "Get in touch" })).toBeInTheDocument();
  });

  // ── Variants ───────────────────────────────────────────────────────────
  it("applies the 'primary' variant class", () => {
    render(<Button variant="primary">Submit</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-primary");
  });

  // ── Interaction ────────────────────────────────────────────────────────
  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Disabled</Button>);
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  // ── Accessibility ──────────────────────────────────────────────────────
  it("has no axe violations", async () => {
    const { container } = render(<Button>Accessible</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("is keyboard focusable", () => {
    render(<Button>Focus me</Button>);
    screen.getByRole("button").focus();
    expect(document.activeElement).toBe(screen.getByRole("button"));
  });
});
```

### 6.2 Glass Card component test checklist

```tsx
describe("GlassCard", () => {
  it("renders children inside the card", () => { ... });
  it("applies backdrop-filter glass class", () => { ... });
  it("renders with the correct ARIA landmark when 'as' prop is 'article'", () => { ... });
  it("has no axe violations", async () => { ... });
  it("keyboard focus ring is visible (glow-ring class applied on focus-within)", () => { ... });
});
```

### 6.3 Accessibility rules enforced via axe

| Rule | Why |
|------|-----|
| `color-contrast` | Charcoal-900 bg + electric-50 text must pass WCAG AA (4.5:1) |
| `button-name` | Every `<button>` must have an accessible name |
| `image-alt` | All `<img>` must have non-empty `alt` attributes |
| `label` | Every form input must be associated with a `<label>` |
| `link-name` | All `<a>` elements must have descriptive text |
| `aria-required-attr` | ARIA attributes must have their required counterparts |

### 6.4 Responsive behaviour strategy

jsdom does not implement layout. For responsive tests:

- **Visual regression:** Use Playwright's `page.setViewportSize()` in E2E to test at `375 × 812` (mobile) and `1440 × 900` (desktop).
- **CSS class assertions:** RTL tests assert that responsive utility classes are present (`sm:grid-cols-2`, `lg:hidden`). Verifying layout is the browser's job, not the test runner's.
- **Framer Motion:** Stub `useReducedMotion` to return `true` in tests to skip animations and make assertions synchronous.

---

## 7. Integration Testing: Contact Form

```tsx
// src/__tests__/components/ContactForm.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import ContactForm from "@/components/sections/ContactForm";
import * as actions from "@/app/actions/contact";

vi.mock("@/app/actions/contact");

describe("ContactForm — integration", () => {
  const user = userEvent.setup();

  async function fillValidForm() {
    await user.type(screen.getByLabelText(/full name/i), "Jane Smith");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.click(screen.getByLabelText(/web.*development/i)); // service checkbox
    await user.selectOptions(screen.getByLabelText(/budget/i), "15k_to_30k");
    await user.type(
      screen.getByLabelText(/message/i),
      "We need a new company website built with Next.js.",
    );
    await user.click(screen.getByLabelText(/privacy policy/i));
  }

  it("shows field-level errors without touching the network on invalid submit", async () => {
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByText(/name must be at least/i)).toBeInTheDocument();
  });

  it("calls the Server Action with validated data on a valid submit", async () => {
    vi.mocked(actions.submitContactForm).mockResolvedValue({
      success: true,
      submissionId: "abc123",
    });
    render(<ContactForm />);
    await fillValidForm();
    await user.click(screen.getByRole("button", { name: /send message/i }));
    await waitFor(() => expect(actions.submitContactForm).toHaveBeenCalled());
  });

  it("shows a success state after a successful submission", async () => {
    vi.mocked(actions.submitContactForm).mockResolvedValue({
      success: true,
      submissionId: "abc123",
    });
    render(<ContactForm />);
    await fillValidForm();
    await user.click(screen.getByRole("button", { name: /send message/i }));
    await waitFor(() =>
      expect(screen.getByText(/we've received your message/i)).toBeInTheDocument(),
    );
  });

  it("shows a server error message when the action returns failure", async () => {
    vi.mocked(actions.submitContactForm).mockResolvedValue({
      success: false,
      error: "Too many submissions.",
    });
    render(<ContactForm />);
    await fillValidForm();
    await user.click(screen.getByRole("button", { name: /send message/i }));
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(/too many submissions/i),
    );
  });

  it("has no axe violations on initial render", async () => {
    const { axe, toHaveNoViolations } = await import("jest-axe");
    expect.extend(toHaveNoViolations);
    const { container } = render(<ContactForm />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
```

---

## 8. E2E Strategy: Playwright

### 8.1 Playwright config

```ts
// e2e/playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir:   "./e2e/journeys",
  outputDir: "./e2e/results",
  timeout:   30_000,
  retries:   process.env.CI ? 2 : 0,

  use: {
    baseURL:     process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    screenshot:  "only-on-failure",
    video:       "retain-on-failure",
    trace:       "on-first-retry",
  },

  projects: [
    { name: "Desktop Chrome", use: { ...devices["Desktop Chrome"] } },
    { name: "Mobile Safari",  use: { ...devices["iPhone 13"] } },
  ],

  // Start the Next.js dev server automatically before tests
  webServer: {
    command: "npm run dev",
    url:     "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

### 8.2 Critical journey: Landing → Service → Contact Form

```
Homepage (/)
    │  user clicks "Web & App Development" service card
    ▼
Service Detail (/services/web-development)
    │  user clicks "Get in touch" CTA button
    ▼
Contact Page (/contact)
    │  user fills the form:
    │    fullName, email, services (pre-selected), budgetRange, message, privacy consent
    │  user submits
    ▼
Success State
    │  "We've received your message" confirmation shown
    ▼
✓  Journey complete
```

### 8.3 E2E test file

```ts
// e2e/journeys/contact-flow.spec.ts
import { test, expect } from "@playwright/test";

const VALID_CONTACT = {
  fullName: "Playwright Test",
  email:    "playwright@sigmatech-test.com",
  message:  "This is an automated E2E test submission. Please disregard.",
};

test.describe("Critical user journey: Landing → Service → Contact", () => {

  test("user navigates from homepage to a service page via the service strip", async ({ page }) => {
    await page.goto("/");

    // Service strip card is visible and linked
    const webDevCard = page.getByRole("link", { name: /web.*app development/i }).first();
    await expect(webDevCard).toBeVisible();
    await webDevCard.click();

    await expect(page).toHaveURL(/\/services\/web-development/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Web & App Development");
  });

  test("service page CTA navigates to the contact page", async ({ page }) => {
    await page.goto("/services/web-development");

    await page.getByRole("link", { name: /get in touch|start a project/i }).first().click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test("contact form validates required fields client-side before submission", async ({ page }) => {
    await page.goto("/contact");

    await page.getByRole("button", { name: /send message/i }).click();

    // Field errors appear without a network request
    await expect(page.getByText(/name must be at least/i)).toBeVisible();
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test("full journey: homepage → service → filled contact form → success", async ({ page }) => {
    // ── Step 1: Homepage ──────────────────────────────────────────────────
    await page.goto("/");
    await page.getByRole("link", { name: /web.*app development/i }).first().click();
    await expect(page).toHaveURL(/\/services\/web-development/);

    // ── Step 2: Service page → Contact ───────────────────────────────────
    await page.getByRole("link", { name: /get in touch|start a project/i }).first().click();
    await expect(page).toHaveURL(/\/contact/);

    // ── Step 3: Fill and submit the form ──────────────────────────────────
    await page.getByLabel(/full name/i).fill(VALID_CONTACT.fullName);
    await page.getByLabel(/email/i).fill(VALID_CONTACT.email);
    await page.getByLabel(/web.*development/i).check();           // service checkbox
    await page.getByLabel(/budget/i).selectOption("15k_to_30k");
    await page.getByLabel(/message/i).fill(VALID_CONTACT.message);
    await page.getByLabel(/privacy policy/i).check();

    await page.getByRole("button", { name: /send message/i }).click();

    // ── Step 4: Success state ─────────────────────────────────────────────
    await expect(page.getByText(/we've received your message/i)).toBeVisible({ timeout: 8_000 });
  });

  test("mobile: full journey completes on iPhone 13 viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto("/");
    // Open mobile nav drawer
    await page.getByRole("button", { name: /open menu|menu/i }).click();
    await page.getByRole("link", { name: /contact/i }).click();
    await expect(page).toHaveURL(/\/contact/);

    await page.getByLabel(/full name/i).fill(VALID_CONTACT.fullName);
    await page.getByLabel(/email/i).fill(VALID_CONTACT.email);
    await page.getByLabel(/web.*development/i).check();
    await page.getByLabel(/budget/i).selectOption("15k_to_30k");
    await page.getByLabel(/message/i).fill(VALID_CONTACT.message);
    await page.getByLabel(/privacy policy/i).check();
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText(/we've received your message/i)).toBeVisible({ timeout: 8_000 });
  });
});

test.describe("Accessibility: axe-core scans on critical pages", () => {
  const criticalRoutes = ["/", "/services", "/services/web-development", "/work", "/contact"];

  for (const route of criticalRoutes) {
    test(`${route} has no critical axe violations`, async ({ page }) => {
      await page.goto(route);
      const { checkA11y } = await import("axe-playwright");
      await checkA11y(page, undefined, {
        detailedReport: true,
        axeOptions: {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
        },
      });
    });
  }
});
```

### 8.4 Page Object Model (Phase 2)

As the test suite grows, extract selectors into Page Objects to eliminate repetition:

```ts
// e2e/pages/ContactPage.ts
export class ContactPage {
  constructor(private page: Page) {}

  async goto()                        { await this.page.goto("/contact"); }
  async fillFullName(name: string)    { await this.page.getByLabel(/full name/i).fill(name); }
  async fillEmail(email: string)      { await this.page.getByLabel(/email/i).fill(email); }
  async fillMessage(msg: string)      { await this.page.getByLabel(/message/i).fill(msg); }
  async selectService(label: RegExp)  { await this.page.getByLabel(label).check(); }
  async selectBudget(value: string)   { await this.page.getByLabel(/budget/i).selectOption(value); }
  async acceptPrivacy()               { await this.page.getByLabel(/privacy policy/i).check(); }
  async submit()                      { await this.page.getByRole("button", { name: /send/i }).click(); }
  async successMessage()              { return this.page.getByText(/we've received your message/i); }
}
```

---

## 9. CI Integration (GitHub Actions)

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  unit:
    name: Unit & Integration (Vitest)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20", cache: "npm" }
      - run: npm ci
      - run: npm run test:coverage
      - uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/

  integrity:
    name: Content Integrity
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20", cache: "npm" }
      - run: npm ci
      - run: npm run test:integrity

  e2e:
    name: E2E (Playwright)
    runs-on: ubuntu-latest
    needs: [unit]          # only run E2E if unit tests pass
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20", cache: "npm" }
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run build
      - run: npm run test:e2e
        env:
          PLAYWRIGHT_BASE_URL: http://localhost:3000
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 10. Coverage Targets

| Layer | Lines | Functions | Branches |
|-------|-------|-----------|----------|
| Validation logic (`src/lib/`) | ≥ 95% | ≥ 95% | ≥ 90% |
| UI Components (`src/components/`) | ≥ 80% | ≥ 80% | ≥ 75% |
| Data schemas (`src/data/schemas/`) | ≥ 70% | ≥ 70% | ≥ 65% |
| **Overall** | **≥ 80%** | **≥ 80%** | **≥ 75%** |

Coverage excludes: route handlers, server actions, static data files, Next.js layout files. These are covered by E2E rather than unit coverage.

---

## 11. Quick Reference

```bash
# Run all unit + integration tests
npm test

# Watch mode during development
npm run test:watch

# Coverage report (opens in browser)
npm run test:coverage && open coverage/index.html

# Content integrity only (also runs as prebuild)
npm run test:integrity

# E2E tests (requires running dev server or built app)
npm run test:e2e

# E2E with interactive UI
npm run test:e2e:ui

# Run a single test file
npx vitest run src/__tests__/validations/contact.test.ts

# Run tests matching a pattern
npx vitest run --reporter=verbose -t "privacyConsent"
```
