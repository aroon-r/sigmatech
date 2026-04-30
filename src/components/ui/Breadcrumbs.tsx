import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BASE_URL } from "@/lib/metadata";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  /** Omit for the current (last) item — it renders as plain text, not a link. */
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
          {allItems.map((item, i) => {
            const isLast = i === allItems.length - 1;
            return (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronRight
                    className="h-3.5 w-3.5 shrink-0 text-charcoal-700"
                    aria-hidden="true"
                  />
                )}

                {!isLast && item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-charcoal-500 transition-colors hover:text-charcoal-200"
                  >
                    {i === 0 ? (
                      <Home className="h-3.5 w-3.5" aria-label="Home" />
                    ) : (
                      item.label
                    )}
                  </Link>
                ) : (
                  <span
                    className={
                      isLast ? "font-medium text-charcoal-200" : "text-charcoal-500"
                    }
                    aria-current={isLast ? "page" : undefined}
                  >
                    {i === 0 ? (
                      <Home className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      item.label
                    )}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
