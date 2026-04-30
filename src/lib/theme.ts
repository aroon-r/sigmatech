/**
 * SigmaTech Design System — Theme Constants
 *
 * Single source of truth for all design tokens used in TypeScript/TSX.
 * Import from here rather than hardcoding values in components.
 *
 * CSS custom properties (--color-*) take precedence for runtime theming.
 * These constants are for use in Framer Motion, dynamic styles, and logic.
 */

// ─── Color Palette ────────────────────────────────────────────────────────────

export const colors = {
  electric: {
    50:  "#EBF5FF",
    100: "#D0E9FF",
    200: "#A3CEFF",
    300: "#65AEFF",
    400: "#3091FF", // text on dark bg  — 6.8:1 ✅ AA
    500: "#0A84FF", // primary CTA      — 5.4:1 ✅ AA
    600: "#006FE6", // hover state
    700: "#0059BF", // active / pressed
    800: "#004599",
    900: "#003373",
    950: "#001F4D",
  },
  charcoal: {
    50:  "#F5F6FA", // primary text on dark — 17.8:1 ✅ AAA
    100: "#E8EAF0",
    200: "#CDD1DB",
    300: "#A0A8B8", // secondary text       —  8.0:1 ✅ AAA
    400: "#717A8E", // muted / placeholder  —  4.6:1 ✅ AA
    500: "#4B5265",
    600: "#363D52", // elevated borders
    700: "#252A3A", // elevated surfaces
    800: "#1B1E2D", // card / panel
    900: "#12141F", // base surface
    950: "#0D0E16", // root background
  },
  status: {
    success: "#22C55E",
    warning: "#F59E0B",
    error:   "#EF4444",
  },
} as const;

// ─── Semantic Tokens ──────────────────────────────────────────────────────────
// Mirror of CSS custom properties — use CSS vars in components where possible.

export const semanticColors = {
  dark: {
    bg:          colors.charcoal[950],
    surface:     colors.charcoal[900],
    elevated:    colors.charcoal[800],
    border:      colors.charcoal[700],
    borderStrong: colors.charcoal[600],
    textPrimary:   colors.charcoal[50],
    textSecondary: colors.charcoal[300],
    textMuted:     colors.charcoal[400],
    accent:       colors.electric[500],
    accentHover:  colors.electric[600],
    accentSubtle: colors.electric[950],
    accentText:   colors.electric[400],
  },
  light: {
    bg:          "#FFFFFF",
    surface:     colors.charcoal[50],
    elevated:    "#FFFFFF",
    border:      colors.charcoal[200],
    borderStrong: colors.charcoal[300],
    textPrimary:   colors.charcoal[950],
    textSecondary: colors.charcoal[500],
    textMuted:     colors.charcoal[400],
    accent:       colors.electric[600],
    accentHover:  colors.electric[700],
    accentSubtle: colors.electric[50],
    accentText:   colors.electric[600],
  },
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────

export const fonts = {
  sans:    "var(--font-sans)",
  display: "var(--font-display)",
  mono:    "var(--font-mono)",
} as const;

export const fontSizes = {
  "2xs": "0.625rem",  // 10px
  xs:    "0.75rem",   // 12px
  sm:    "0.875rem",  // 14px
  base:  "1rem",      // 16px
  lg:    "1.125rem",  // 18px
  xl:    "1.25rem",   // 20px
  "2xl": "1.5rem",    // 24px
  "3xl": "1.875rem",  // 30px
  "4xl": "2.25rem",   // 36px
  "5xl": "3rem",      // 48px
  "6xl": "3.75rem",   // 60px
  "7xl": "4.5rem",    // 72px
} as const;

// ─── Spacing ──────────────────────────────────────────────────────────────────

export const spacing = {
  sectionY:    "6rem",  // py-24 — section vertical padding
  sectionGap:  "4rem",  // gap-16 — section inner gap
  componentGap:"2rem",  // gap-8  — component gap
  elementGap:  "1rem",  // gap-4  — element gap
  containerPx: "1.5rem", // px-6 (lg: 2rem)
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────

export const radius = {
  sm:   "0.25rem", // 4px  — badges
  md:   "0.375rem",// 6px  — small buttons
  lg:   "0.5rem",  // 8px  — buttons, inputs
  xl:   "0.75rem", // 12px — icon wrappers
  "2xl":"1rem",    // 16px — cards
  full: "9999px",  // pill badges, avatars
} as const;

// ─── Shadows ──────────────────────────────────────────────────────────────────

export const shadows = {
  sm:          "0 1px 2px rgba(0,0,0,0.40)",
  md:          "0 4px 12px rgba(0,0,0,0.40)",
  lg:          "0 8px 32px rgba(0,0,0,0.50)",
  glass:       "0 4px 32px rgba(0,0,0,0.40)",
  electricSm:  "0 0 16px rgba(10,132,255,0.25)",
  electricMd:  "0 0 28px rgba(10,132,255,0.40)",
  electricLg:  "0 0 48px rgba(10,132,255,0.55)",
  glowFocus:   "0 0 0 3px rgba(10,132,255,0.20)",
  errorFocus:  "0 0 0 3px rgba(239,68,68,0.20)",
} as const;

// ─── Animation ────────────────────────────────────────────────────────────────

export const animation = {
  duration: {
    fast:   0.15, // seconds — hover states
    base:   0.30, // seconds — card hovers
    slow:   0.60, // seconds — page entries
  },
  ease: {
    out:    [0, 0, 0.2, 1]    as const,
    inOut:  [0.4, 0, 0.2, 1]  as const,
    spring: { type: "spring", stiffness: 300, damping: 30 } as const,
  },
  /** Standard Framer Motion entry variant — fade up */
  fadeUp: (delay = 0) => ({
    initial:    { opacity: 0, y: 24 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.6, ease: [0, 0, 0.2, 1], delay },
  }),
  /** Standard Framer Motion entry variant — fade in only */
  fadeIn: (delay = 0) => ({
    initial:    { opacity: 0 },
    animate:    { opacity: 1 },
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1], delay },
  }),
} as const;

// ─── Breakpoints ──────────────────────────────────────────────────────────────

export const breakpoints = {
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  "2xl": 1536,
} as const;

// ─── Component Variants ───────────────────────────────────────────────────────
// For use with cva() (class-variance-authority) when wiring up component props.

export const buttonVariants = {
  primary:   "btn-primary",
  secondary: "btn-secondary",
  ghost:     "btn-ghost",
  primaryGlow: "btn-primary-glow",
} as const;

export const buttonSizes = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
} as const;

export const cardVariants = {
  solid: "card-solid",
  glass: "card-glass",
  glassHover: "card-glass-hover",
} as const;

export const badgeVariants = {
  brand:   "badge-brand",
  success: "badge-success",
  warning: "badge-warning",
  error:   "badge-error",
  neutral: "badge-neutral",
} as const;

// ─── Type exports ─────────────────────────────────────────────────────────────

export type ButtonVariant  = keyof typeof buttonVariants;
export type ButtonSize     = keyof typeof buttonSizes;
export type CardVariant    = keyof typeof cardVariants;
export type BadgeVariant   = keyof typeof badgeVariants;
