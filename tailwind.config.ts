import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Fonts ────────────────────────────────────────────────────────────
      fontFamily: {
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },

      // ─── Colors ───────────────────────────────────────────────────────────
      colors: {
        // Electric Blue — primary brand accent
        electric: {
          50:  "#EBF5FF",
          100: "#D0E9FF",
          200: "#A3CEFF",
          300: "#65AEFF",
          400: "#3091FF",
          500: "#0A84FF", // primary CTA
          600: "#006FE6", // hover
          700: "#0059BF", // active / pressed
          800: "#004599",
          900: "#003373",
          950: "#001F4D", // badge backgrounds
        },

        // Charcoal — backgrounds, surfaces, text
        charcoal: {
          50:  "#F5F6FA", // primary text on dark / light bg
          100: "#E8EAF0",
          200: "#CDD1DB",
          300: "#A0A8B8", // secondary text on dark  (8.0:1 on 950)
          400: "#717A8E", // muted / placeholder      (4.6:1 on 950)
          500: "#4B5265",
          600: "#363D52", // elevated borders
          700: "#252A3A", // elevated surfaces
          800: "#1B1E2D", // card / panel surface
          900: "#12141F", // base surface
          950: "#0D0E16", // root background
        },

        // Status colors
        success: { DEFAULT: "#22C55E", foreground: "#FFFFFF" },
        warning: { DEFAULT: "#F59E0B", foreground: "#000000" },
        error:   { DEFAULT: "#EF4444", foreground: "#FFFFFF" },

        // Semantic aliases — map to CSS custom properties
        background: "var(--color-bg)",
        surface:    "var(--color-surface)",
        elevated:   "var(--color-elevated)",
        border:     "var(--color-border)",
        accent:     "var(--color-accent)",
      },

      // ─── Typography ───────────────────────────────────────────────────────
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },
      letterSpacing: {
        widest: "0.2em",
      },

      // ─── Border Radius ────────────────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
      },

      // ─── Box Shadows ──────────────────────────────────────────────────────
      boxShadow: {
        "sm-dark":        "0 1px 2px rgba(0,0,0,0.40)",
        "md-dark":        "0 4px 12px rgba(0,0,0,0.40)",
        "lg-dark":        "0 8px 32px rgba(0,0,0,0.50)",
        "glass":          "0 4px 32px rgba(0,0,0,0.40)",
        "electric-sm":    "0 0 14px rgba(10,132,255,0.20)",
        "electric-md":    "0 0 24px rgba(10,132,255,0.28)",
        "electric-lg":    "0 0 40px rgba(10,132,255,0.40)",
        "electric-inset": "inset 0 0 0 1px rgba(10,132,255,0.30)",
      },

      // ─── Animations ───────────────────────────────────────────────────────
      transitionDuration: {
        "50":  "50ms",
        "250": "250ms",
      },
      animation: {
        "fade-up":        "fadeUp 0.6s ease-out forwards",
        "fade-in":        "fadeIn 0.4s ease-out forwards",
        "slide-in-right": "slideInRight 0.4s ease-out forwards",
        "glow-pulse":     "glowPulse 3s ease-in-out infinite",
        // Sweeps once every 3 s — 0→50% is the travel, 50→100% is the pause.
        "shimmer":        "shimmer 3s ease-in-out infinite",
        // Testimonials marquee — track is 2× content width so -50% loops seamlessly.
        "marquee":         "marquee 40s linear infinite",
        "marquee-reverse": "marqueeReverse 32s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%":   { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 14px rgba(10,132,255,0.20)" },
          "50%":      { boxShadow: "0 0 28px rgba(10,132,255,0.40)" },
        },
        shimmer: {
          "0%":        { transform: "translateX(-100%) skewX(-15deg)" },
          "50%, 100%": { transform: "translateX(200%)  skewX(-15deg)" },
        },
        marquee: {
          "from": { transform: "translateX(0)" },
          "to":   { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "from": { transform: "translateX(-50%)" },
          "to":   { transform: "translateX(0)" },
        },
      },

      // ─── Backdrop Blur ────────────────────────────────────────────────────
      backdropBlur: {
        xs: "2px",
      },

      // ─── Background Image ─────────────────────────────────────────────────
      backgroundImage: {
        "gradient-radial":   "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "grid-charcoal":
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        "grid": "32px 32px",
      },

      // ─── Max Width ────────────────────────────────────────────────────────
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
    },
  },

  plugins: [
    // ─── Custom utilities ──────────────────────────────────────────────────
    plugin(({ addUtilities }) => {
      addUtilities({
        // Text gradient — electric blue, hero use only
        ".text-gradient": {
          background:          "linear-gradient(135deg, #3091FF 0%, #0A84FF 50%, #006FE6 100%)",
          "-webkit-background-clip": "text",
          "background-clip":   "text",
          "-webkit-text-fill-color": "transparent",
          "color":             "transparent",
        },
        // Subtle grid background texture
        ".bg-grid": {
          "background-image": "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px)",
          "background-size":  "32px 32px",
        },
        // Glow ring — for focused elements
        ".glow-ring": {
          "box-shadow": "0 0 0 3px rgba(10,132,255,0.20)",
        },
        ".glow-ring-error": {
          "box-shadow": "0 0 0 3px rgba(239,68,68,0.20)",
        },
      });
    }),
  ],
};

export default config;
