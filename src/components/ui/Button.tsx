"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize    = "sm" | "md" | "lg";

export interface ButtonProps {
  /** Visual style. "secondary" = charcoal fill; "outline" = electric border; "ghost" = no decoration. */
  variant?:    ButtonVariant;
  size?:       ButtonSize;
  /** Renders a Next.js <Link> instead of <button> when provided. */
  href?:       string;
  /** Opens href in a new tab with rel="noopener noreferrer". */
  external?:   boolean;
  /** Shows a spinner and disables the element. */
  isLoading?:  boolean;
  disabled?:   boolean;
  leftIcon?:   React.ReactNode;
  rightIcon?:  React.ReactNode;
  children?:   React.ReactNode;
  className?:  string;
  onClick?:    React.MouseEventHandler;
  type?:       "button" | "submit" | "reset";
  "aria-label"?:        string;
  "aria-describedby"?:  string;
  "aria-expanded"?:     boolean;
  "aria-controls"?:     string;
}

// ─── Style maps ───────────────────────────────────────────────────────────────

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-lg font-semibold " +
  "select-none cursor-pointer transition-all duration-150 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variantStyles: Record<ButtonVariant, string> = {
  // Filled electric-500 — main CTA. Has shimmer sweep overlay.
  primary:
    "overflow-hidden bg-electric-500 text-white shadow-md " +
    "hover:bg-electric-600 hover:shadow-[0_0_22px_rgba(10,132,255,0.30)] " +
    "active:bg-electric-700 active:scale-[0.98] active:shadow-sm " +
    "focus-visible:outline-electric-500",

  // Subtle charcoal fill — secondary action sitting next to a primary.
  secondary:
    "bg-charcoal-800/70 text-charcoal-300 border border-charcoal-700/80 " +
    "hover:bg-charcoal-700 hover:border-charcoal-600 hover:text-charcoal-100 " +
    "active:bg-charcoal-600 " +
    "focus-visible:outline-electric-500",

  // Electric border, no fill — less prominent CTA or paired with primary.
  outline:
    "border border-electric-500 text-electric-400 bg-transparent " +
    "hover:bg-electric-500/10 hover:text-electric-300 active:bg-electric-500/20 " +
    "focus-visible:outline-electric-500",

  // No border, no background — lowest visual weight; used in nav and inline.
  ghost:
    "text-charcoal-300 bg-transparent " +
    "hover:bg-charcoal-700/50 hover:text-charcoal-50 active:bg-charcoal-700 " +
    "focus-visible:outline-charcoal-500",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2   text-xs  h-8",
  md: "px-5   py-2.5 text-sm  h-10",
  lg: "px-6   py-3   text-base h-12",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Button({
  variant    = "primary",
  size       = "md",
  href,
  external   = false,
  isLoading  = false,
  disabled   = false,
  leftIcon,
  rightIcon,
  children,
  className,
  onClick,
  type       = "button",
  ...ariaProps
}: ButtonProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const cls = cn(
    base,
    variantStyles[variant],
    sizeStyles[size],
    variant === "primary" && "motion-safe:hover:scale-[1.02]",
    className,
  );

  // ── Shimmer sweep — primary only ──
  // Absolutely-positioned translucent gradient that travels left→right once
  // every 3 s. Stopped by the @media (prefers-reduced-motion) rule in globals.css.
  const shimmer = variant === "primary" && (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer
                 bg-gradient-to-r from-transparent via-white/15 to-transparent
                 -skew-x-12"
    />
  );

  // ── Spinner icon, replacing leftIcon while loading ──
  const spinner = (
    <Loader2
      className={cn("animate-spin", size === "sm" ? "h-3 w-3" : "h-4 w-4")}
      aria-hidden="true"
    />
  );

  const content = (
    <>
      {shimmer}
      {isLoading ? spinner : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </>
  );

  // ── Link render ──
  // Uses CSS active:scale rather than Framer Motion — avoids motion.create(Link)
  // TypeScript complexity while producing identical visual output at this scale.
  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cn(cls, "active:scale-[0.97]")}
        onClick={onClick}
        aria-label={ariaProps["aria-label"]}
      >
        {content}
      </Link>
    );
  }

  // ── Button render ──
  // Framer Motion whileTap gives a spring-physics feel vs CSS active state.
  return (
    <motion.button
      type={type}
      disabled={disabled || isLoading}
      className={cls}
      onClick={onClick}
      whileHover={variant === "primary" && !prefersReduced ? { scale: 1.02 } : undefined}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      aria-disabled={disabled || isLoading}
      {...ariaProps}
    >
      {content}
    </motion.button>
  );
}
