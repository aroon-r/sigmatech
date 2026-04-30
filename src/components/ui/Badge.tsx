// Server Component — no interactivity needed.

import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BadgeVariant = "brand" | "success" | "warning" | "error" | "neutral";

export interface BadgeProps {
  variant?:   BadgeVariant;
  /** Renders a small animated dot before the label (e.g. "Now hiring"). */
  pulse?:     boolean;
  children:   React.ReactNode;
  className?: string;
}

// ─── Style map ────────────────────────────────────────────────────────────────
// Maps to the .badge-* component classes defined in globals.css.
// Dot colour inherits from the badge's text colour via `bg-current`.

const variantStyles: Record<BadgeVariant, string> = {
  brand:   "badge-brand",
  success: "badge-success",
  warning: "badge-warning",
  error:   "badge-error",
  neutral: "badge-neutral",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Badge({
  variant   = "brand",
  pulse     = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span className={cn(variantStyles[variant], className)}>
      {pulse && (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current animate-pulse"
        />
      )}
      {children}
    </span>
  );
}
