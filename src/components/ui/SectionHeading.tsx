// Server Component — purely presentational, no browser APIs needed.

import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type HeadingLevel = "h1" | "h2" | "h3";
type Alignment    = "left" | "center";

export interface SectionHeadingProps {
  /** Small overline above the title — uppercase, letter-spaced, electric colour. */
  overline?:  string;
  title:      string;
  /** Optional subtitle paragraph rendered below the title. */
  subtitle?:  string;
  /** Default "center". Use "left" for sections with inline controls (e.g. "View all →"). */
  align?:     Alignment;
  /** Default "h2". Override to "h1" only on pages where this IS the page title. */
  as?:        HeadingLevel;
  className?: string;
  /** Extra classes applied to the <title> element only. */
  titleClassName?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SectionHeading({
  overline,
  title,
  subtitle,
  align          = "center",
  as: Tag        = "h2",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isCentered && "items-center text-center",
        className,
      )}
    >
      {/* Overline — e.g. "What we do" eyebrow above "Services" */}
      {overline && (
        <p className="section-label" aria-hidden="true">
          {overline}
        </p>
      )}

      {/* Title — H2 by default; H1 only on page-level headings */}
      <Tag className={cn("section-title", titleClassName)}>
        {title}
      </Tag>

      {/* Subtitle — constrained to 65ch for readability */}
      {subtitle && (
        <p
          className={cn(
            "section-subtitle",
            isCentered && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
