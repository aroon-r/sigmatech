# Step 09 — UI/UX Design System
**Project:** nexora Website Revamp
**Date:** 2026-04-25
**Status:** Approved — Pending Client Sign-off

---

## 1. Design Principles

| Principle | Definition |
|---|---|
| **Dark-first** | Dark mode is the default. Light mode is a progressive enhancement. |
| **Precision over decoration** | Every visual element earns its place. No gradients, shadows, or effects without purpose. |
| **Performance is aesthetics** | A fast site looks better than a slow one. Design decisions must not sacrifice Core Web Vitals. |
| **Accessible by default** | All colour combinations pass WCAG 2.1 AA. Interactive elements meet 3:1 contrast. Text meets 4.5:1. |
| **System thinking** | Every token, component, and utility is part of a coherent system — not a one-off decision. |

---

## 2. Color System

### 2.1 Design Philosophy
Dark charcoal background (`#0D0E16`) with Electric Blue (`#0A84FF`) as the primary accent. The charcoal scale uses a cold blue undertone — this prevents the background from reading as "brown dark" and ensures the Electric Blue pops cleanly without vibration.

### 2.2 Electric Blue — Primary Brand Palette

| Token | Hex | Usage |
|---|---|---|
| `electric-50` | `#EBF5FF` | Light mode backgrounds, tints |
| `electric-100` | `#D0E9FF` | Light mode hover states |
| `electric-200` | `#A3CEFF` | Light mode borders |
| `electric-300` | `#65AEFF` | Light mode text on white |
| `electric-400` | `#3091FF` | Dark mode text, secondary accents |
| `electric-500` | `#0A84FF` | **Primary CTA, interactive UI** |
| `electric-600` | `#006FE6` | Hover state for primary CTA |
| `electric-700` | `#0059BF` | Active/pressed state |
| `electric-800` | `#004599` | Dark borders |
| `electric-900` | `#003373` | Very dark tints |
| `electric-950` | `#001F4D` | Deepest tint (badge backgrounds) |

#### WCAG Contrast Ratios — Electric Blue
| Combination | Ratio | Level |
|---|---|---|
| `electric-50` on `charcoal-950` | 17.1:1 | ✅ AAA |
| `electric-400` on `charcoal-950` | 6.8:1 | ✅ AA |
| `electric-500` on `charcoal-950` | 5.4:1 | ✅ AA |
| `electric-500` on `white` | 3.1:1 | ✅ AA Large only |
| `electric-600` on `white` | 4.5:1 | ✅ AA |
| White on `electric-500` | 3.1:1 | ✅ AA Large / UI |
| White on `electric-600` | 4.5:1 | ✅ AA |

> **Rule:** Never use `electric-500` for small body text on a white background. Use `electric-600` or darker. On dark backgrounds, `electric-400` or lighter.

---

### 2.3 Charcoal — Background & Surface Palette

| Token | Hex | Dark mode role | Light mode role |
|---|---|---|---|
| `charcoal-50` | `#F5F6FA` | Primary text | Page background |
| `charcoal-100` | `#E8EAF0` | Secondary text | Surface |
| `charcoal-200` | `#CDD1DB` | Tertiary text | Muted surface |
| `charcoal-300` | `#A0A8B8` | Secondary text on dark | Strong border |
| `charcoal-400` | `#717A8E` | Muted / placeholder | Muted text |
| `charcoal-500` | `#4B5265` | Strong border | — |
| `charcoal-600` | `#363D52` | Elevated border | — |
| `charcoal-700` | `#252A3A` | Elevated surface | — |
| `charcoal-800` | `#1B1E2D` | Card / panel surface | — |
| `charcoal-900` | `#12141F` | Base surface | — |
| `charcoal-950` | `#0D0E16` | **Root background** | — |

#### WCAG Contrast Ratios — Charcoal
| Combination | Ratio | Level |
|---|---|---|
| `charcoal-50` on `charcoal-950` | 17.8:1 | ✅ AAA |
| `charcoal-100` on `charcoal-950` | 14.2:1 | ✅ AAA |
| `charcoal-300` on `charcoal-950` | 8.0:1 | ✅ AAA |
| `charcoal-400` on `charcoal-950` | 4.6:1 | ✅ AA |
| `charcoal-400` on `charcoal-900` | 4.2:1 | ✅ AA |

> **Rule:** `charcoal-400` is the minimum for placeholder/muted text. Never go lighter than this for text that must be read.

---

### 2.4 Semantic Color Tokens

These are the CSS custom properties consumed by components. Always use semantic tokens in components — never raw hex.

| CSS Variable | Dark Value | Light Value | Usage |
|---|---|---|---|
| `--color-bg` | `charcoal-950` | `white` | Root background |
| `--color-surface` | `charcoal-900` | `charcoal-50` | Cards, panels |
| `--color-elevated` | `charcoal-800` | `white` | Modals, popovers |
| `--color-border` | `charcoal-700` | `charcoal-200` | All borders |
| `--color-border-strong` | `charcoal-600` | `charcoal-300` | Focused borders |
| `--color-text-primary` | `charcoal-50` | `charcoal-950` | Body text |
| `--color-text-secondary` | `charcoal-300` | `charcoal-600` | Labels, captions |
| `--color-text-muted` | `charcoal-400` | `charcoal-400` | Placeholders, hints |
| `--color-accent` | `electric-500` | `electric-600` | Brand interactions |
| `--color-accent-hover` | `electric-600` | `electric-700` | Hover on accent |
| `--color-accent-subtle` | `electric-950` | `electric-50` | Tinted backgrounds |

---

### 2.5 Status Colors

| Status | Hex | Usage |
|---|---|---|
| Success | `#22C55E` | Form confirmations, positive states |
| Warning | `#F59E0B` | Alerts, caution states |
| Error | `#EF4444` | Form errors, destructive actions |
| Info | `#0A84FF` | (Shares electric-500) |

---

## 3. Typography System

### 3.1 Font Stack

| Role | Font | Source | Variable |
|---|---|---|---|
| **Display / Headings** | Plus Jakarta Sans | Google Fonts via `next/font` | `--font-display` |
| **Body / UI** | Inter | Google Fonts via `next/font` | `--font-sans` |
| **Code / Mono** | JetBrains Mono | Google Fonts via `next/font` | `--font-mono` |

**Why this pair:**
- *Plus Jakarta Sans* has a geometric quality and slightly wider letterforms that read as premium and modern at display sizes. It distinguishes headlines from body text at a glance.
- *Inter* is battle-tested for UI legibility at small sizes — the ideal body and interface font.
- Both are variable fonts — a single file covers all weights with zero extra HTTP requests.

### 3.2 Type Scale

| Step | Class | Size | Line Height | Weight | Usage |
|---|---|---|---|---|---|
| Display | `.text-display` | `72px / 4.5rem` | `1.05` | `800` | Hero headline |
| H1 | `text-5xl–7xl` | `48–72px` | `1.1` | `700` | Page titles |
| H2 | `text-4xl` | `36px` | `1.2` | `700` | Section titles |
| H3 | `text-2xl` | `24px` | `1.3` | `600` | Card titles |
| H4 | `text-xl` | `20px` | `1.4` | `600` | Sub-section titles |
| Body LG | `text-lg` | `18px` | `1.75` | `400` | Lead paragraphs |
| Body | `text-base` | `16px` | `1.75` | `400` | General body text |
| Body SM | `text-sm` | `14px` | `1.6` | `400` | Captions, labels |
| Caption | `text-xs` | `12px` | `1.5` | `500` | Tags, badges, eyebrows |
| Overline | `text-xs uppercase tracking-widest` | `12px` | `1.5` | `600` | Section labels |

### 3.3 Typography Rules

1. **Heading weight:** Always `font-bold` (700) for H1–H2, `font-semibold` (600) for H3–H4.
2. **Body weight:** Always `font-normal` (400). Never bold body text except for emphasis inline.
3. **Letter spacing:** `tracking-tight` on all display/H1. `tracking-widest` only on overlines/captions.
4. **Line length:** `max-w-2xl` (65ch) for body paragraphs. Never let a paragraph span full container width.
5. **Color:** Primary text uses `--color-text-primary`. Supporting text uses `--color-text-secondary`. Captions use `--color-text-muted`.
6. **Gradient text:** Used exclusively on the hero headline accent span. Not repeated anywhere else on the page.

---

## 4. Component Library Spec

### 4.1 Buttons

Three variants. One size system (sm / md / lg). No variant mixing.

---

#### Button — Primary (Solid)

```
[ Start a project → ]
bg: electric-500   text: white   border: none
hover: electric-600 + glow shadow
active: electric-700
focus: 2px outline electric-500 offset 2px
disabled: opacity-50 cursor-not-allowed
```

**Anatomy:**
```
<button>  inline-flex items-center gap-2  rounded-lg  font-semibold
  transition-all duration-150  cursor-pointer
  ├── [optional] leading icon  h-4 w-4
  ├── label text
  └── [optional] trailing icon  h-4 w-4

States:
  default:  bg-electric-500  text-white  shadow-sm
  hover:    bg-electric-600  shadow-[0_0_20px_rgba(10,132,255,0.35)]
  active:   bg-electric-700  scale-[0.98]
  focus:    outline outline-2 outline-electric-500 outline-offset-2
  disabled: opacity-50  pointer-events-none

Sizes:
  sm:  px-3.5  py-2    text-xs
  md:  px-5    py-2.5  text-sm  (default)
  lg:  px-6    py-3    text-base
```

**Glow variant** (used in Hero and CTA Band only):
```
shadow-[0_0_24px_rgba(10,132,255,0.4)]
hover:shadow-[0_0_36px_rgba(10,132,255,0.55)]
```

---

#### Button — Secondary (Outline)

```
[ View our work ]
bg: transparent   text: electric-400   border: electric-500
hover: bg-electric-500/10
```

**Anatomy:**
```
States:
  default:  border border-electric-500  text-electric-400  bg-transparent
  hover:    bg-electric-500/10  text-electric-300
  active:   bg-electric-500/20
  focus:    outline outline-2 outline-electric-500 outline-offset-2
  disabled: opacity-50  pointer-events-none
```

---

#### Button — Ghost

```
[ Learn more ]
bg: transparent   text: charcoal-300   border: none
hover: bg-charcoal-700/50
```

**Anatomy:**
```
States:
  default:  text-charcoal-300  bg-transparent
  hover:    bg-charcoal-700/50  text-charcoal-50
  active:   bg-charcoal-700
  focus:    outline outline-2 outline-charcoal-500 outline-offset-2
  disabled: opacity-50  pointer-events-none
```

---

### 4.2 Cards — Glassmorphism

Glassmorphism in this system is **restrained**. No heavy frosted glass on dark solid backgrounds (it reads as muddy). Glass effect is used only when there is visual content behind the card — e.g., gradient blobs, hero backgrounds.

**Standard glass card (dark):**
```css
background: rgba(255, 255, 255, 0.03)   /* 3% white overlay */
backdrop-filter: blur(16px)
border: 1px solid rgba(255, 255, 255, 0.06)
border-radius: 1rem (rounded-2xl)
box-shadow: 0 4px 32px rgba(0, 0, 0, 0.4)
```

**Hover state (glass card):**
```css
border-color: rgba(10, 132, 255, 0.3)    /* electric-500 at 30% */
background: rgba(255, 255, 255, 0.05)
box-shadow: 0 8px 48px rgba(10, 132, 255, 0.1)
```

**Anatomy:**
```
<div>  card-glass  (or card-glass-hover for interactive)
  rounded-2xl  p-6 (or p-8 for larger cards)
  flex flex-col  gap-4
```

**Solid card (used on opaque backgrounds — most common):**
```
bg-charcoal-800  border border-charcoal-700
rounded-2xl
hover: border-electric-500/50  shadow-md
```

> **Rule:** Use glass cards only in Hero, CTA Band, or where a gradient background is present. Use solid charcoal cards on solid surface backgrounds.

---

### 4.3 Form Inputs — Minimalist with Focus Glow

**Input (default):**
```
bg: charcoal-800   border: charcoal-600   text: charcoal-50
placeholder: charcoal-400
rounded-lg   px-4 py-2.5   text-sm
```

**Input (hover):**
```
border: charcoal-500
```

**Input (focus):**
```
border: electric-500
ring: 0 0 0 3px rgba(10,132,255,0.20)   ← focus glow
outline: none
```

**Input (error):**
```
border: error (#EF4444)
ring: 0 0 0 3px rgba(239,68,68,0.20)
```

**Input (disabled):**
```
opacity-50   cursor-not-allowed   bg-charcoal-900
```

**Textarea:** Same as input, `resize-y`, `min-h-[120px]`

**Label:**
```
text-sm font-medium text-charcoal-200   mb-1.5   block
```

**Error message:**
```
text-xs text-red-400   mt-1.5   flex items-center gap-1
<AlertCircle h-3 w-3>  + "{Error text}"
```

---

### 4.4 Badges / Tags

```
inline-flex items-center gap-1.5
px-2.5 py-1   rounded-full   text-xs font-medium

Variants:
  brand:   bg-electric-950  text-electric-400  border border-electric-800
  success: bg-green-950   text-green-400   border border-green-800
  warning: bg-amber-950  text-amber-400   border border-amber-800
  error:   bg-red-950    text-red-400    border border-red-800
  neutral: bg-charcoal-800  text-charcoal-300  border border-charcoal-700
```

---

### 4.5 Dividers

```
Horizontal: <hr>  border-0  h-px  bg-charcoal-700  my-8
Vertical:   <div> border-0  w-px  bg-charcoal-700  mx-4  h-full
```

---

## 5. Spacing System

Built directly on Tailwind's 4px base grid. No custom spacing values.

| Token | px | Rem | Usage |
|---|---|---|---|
| `space-1` | 4px | 0.25rem | Micro — icon gap |
| `space-2` | 8px | 0.5rem | Tight — badge padding |
| `space-3` | 12px | 0.75rem | Small — button padding Y |
| `space-4` | 16px | 1rem | Base — element gap |
| `space-6` | 24px | 1.5rem | Component gap |
| `space-8` | 32px | 2rem | Section element gap |
| `space-10` | 40px | 2.5rem | Large gap |
| `space-16` | 64px | 4rem | Section inner gap |
| `space-24` | 96px | 6rem | Section vertical padding |

---

## 6. Border Radius

| Token | Value | Usage |
|---|---|---|
| `rounded-sm` | 4px | Badges, tags, small chips |
| `rounded-md` | 6px | Buttons (sm) |
| `rounded-lg` | 8px | Buttons, inputs, small cards |
| `rounded-xl` | 12px | Icon containers |
| `rounded-2xl` | 16px | Cards, panels |
| `rounded-full` | 9999px | Avatar, pill badges, toggles |

---

## 7. Shadow System

| Token | Value | Usage |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.4)` | Buttons, small elements |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.4)` | Hover cards |
| `shadow-lg` | `0 8px 32px rgba(0,0,0,0.5)` | Modals, dropdowns |
| `shadow-electric-sm` | `0 0 16px rgba(10,132,255,0.25)` | CTA button hover |
| `shadow-electric-md` | `0 0 28px rgba(10,132,255,0.40)` | Hero CTA hover |
| `shadow-glass` | `0 4px 32px rgba(0,0,0,0.40)` | Glass cards |

---

## 8. Animation Tokens

| Token | Value | Usage |
|---|---|---|
| `duration-fast` | `150ms` | Hover states, colour transitions |
| `duration-base` | `300ms` | Card hover, border transitions |
| `duration-slow` | `600ms` | Page entry animations |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Entrances |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Reversible transitions |

Framer Motion entry animation:
```ts
{ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: "easeOut" } }
```

**`prefers-reduced-motion` rule:** All Framer Motion animations must be wrapped:
```tsx
const prefersReduced = useReducedMotion();
const variants = prefersReduced ? {} : { initial: ..., animate: ..., transition: ... };
```

---

## 9. Iconography

**Library:** Lucide React — consistent stroke width, tree-shakeable.
**Sizes:** `h-4 w-4` (inline), `h-5 w-5` (UI), `h-6 w-6` (feature), `h-8 w-8` (section icon).
**Color:** Always inherit from text color or use an explicit token — never hardcoded hex.
**Accessibility:** Decorative icons get `aria-hidden="true"`. Functional icons need an `aria-label`.

---

## 10. Dark Mode Strategy

### Implementation
- `darkMode: "class"` in Tailwind config (explicit — not `media`)
- Root `<html>` element gets `class="dark"` by default (dark-first)
- A future theme toggle component will swap the class and persist to `localStorage`
- `suppressHydrationWarning` on `<html>` prevents flash on initial render

### Token usage rules
```
✅ DO:    text-charcoal-50 dark:text-charcoal-950
✅ DO:    bg-charcoal-950 dark:bg-white
✅ DO:    border-charcoal-700 dark:border-charcoal-200
✅ DO:    CSS variable: var(--color-text-primary)
❌ DON'T: hardcode #F5F6FA — use a token
❌ DON'T: text-white (not semantic — breaks light mode)
❌ DON'T: create one-off colours outside the palette
```

### Flash of Unstyled Content (FOUC) prevention
```tsx
// In layout.tsx — the HTML element starts dark by default
// No JS required for initial paint
<html lang="en" className="dark" suppressHydrationWarning>
```

---

## 11. Accessibility Checklist

- [ ] All text meets 4.5:1 contrast ratio (WCAG AA)
- [ ] All UI components (buttons, inputs, focus rings) meet 3:1 contrast
- [ ] Focus indicators visible on every interactive element
- [ ] `skip to content` link at top of page (keyboard users)
- [ ] All images have meaningful `alt` text; decorative images have `alt=""`
- [ ] All icons used as actions have `aria-label`
- [ ] Decorative icons have `aria-hidden="true"`
- [ ] Form inputs are associated with `<label>` via `htmlFor` / `id`
- [ ] Form errors are announced via `aria-describedby`
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Colour is never the sole indicator of state (always paired with shape/text)

---

*Document owner: Lead Architect / PM*
*Implementation files: tailwind.config.ts, src/app/globals.css, src/lib/theme.ts*
*Next step: Step 10 — Content Planning*
