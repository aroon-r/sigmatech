"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";

// ─── Data ─────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Work",     href: "/work"     },
  { label: "About",    href: "/about"    },
  { label: "Blog",     href: "/blog"     },
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

// True for exact match ("/about") or any child route ("/services/web-development").
// Using startsWith with a trailing slash prevents "/work" from matching "/workstyle".
function useActiveLink() {
  const pathname = usePathname();
  return (href: string) => pathname === href || pathname.startsWith(`${href}/`);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [isOpen,   setIsOpen]  = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname       = usePathname();
  const prefersReduced = useReducedMotion();
  const isActive       = useActiveLink();

  // ── Scroll detection ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close drawer on route change ──
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // ── Escape key closes drawer ──
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  // Duration collapses to 0 ms when the user prefers reduced motion —
  // the layout shift still happens instantly rather than being removed,
  // which prevents content jumps.
  const drawerDuration = prefersReduced ? 0 : 0.22;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? // Glassmorphism: semi-transparent surface + heavy blur
            "border-b border-charcoal-700/40 light:border-charcoal-200/60 bg-charcoal-950/80 light:bg-white/80 backdrop-blur-xl shadow-lg shadow-black/10 light:shadow-black/5"
          : "bg-transparent"
      )}
    >
      {/* ── Desktop / tablet bar ── */}
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 focus-visible:outline-none"
          aria-label="Nexora — home"
        >
          <Zap
            className="h-5 w-5 text-electric-500 transition-transform duration-150 group-hover:scale-110"
            aria-hidden="true"
          />
          <span className="font-display text-lg font-semibold tracking-tight text-charcoal-50 light:text-charcoal-950 group-focus-visible:text-electric-400">
            Nexora
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-8 md:flex" role="list">
          {navLinks.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:text-electric-400",
                    active
                      ? "text-electric-400 light:text-electric-600"
                      : "text-charcoal-400 hover:text-charcoal-50 light:text-charcoal-500 light:hover:text-charcoal-900"
                  )}
                >
                  {label}
                  {/* Active underline indicator */}
                  {active && (
                    <m.span
                      layoutId="nav-active-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px rounded-full bg-electric-500"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right-side controls */}
        <div className="flex items-center gap-2">
          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="/contact" size="sm">
              Send a brief
            </Button>
          </div>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            type="button"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:hidden",
              "text-charcoal-400 hover:bg-charcoal-800 hover:text-charcoal-50",
              "light:text-charcoal-600 light:hover:bg-charcoal-100 light:hover:text-charcoal-900",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-500"
            )}
            onClick={() => setIsOpen((o) => !o)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen
              ? <X    className="h-5 w-5" aria-hidden="true" />
              : <Menu className="h-5 w-5" aria-hidden="true" />
            }
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: drawerDuration, ease: "easeInOut" }}
            className="overflow-hidden border-t border-charcoal-800 light:border-charcoal-200 bg-charcoal-950 light:bg-white md:hidden"
          >
            <div className="px-6 pb-6 pt-2">
              <ul className="flex flex-col gap-0.5" role="list">
                {navLinks.map(({ label, href }) => {
                  const active = isActive(href);
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setIsOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          active
                            ? "bg-charcoal-800 light:bg-charcoal-100 text-charcoal-50 light:text-charcoal-900"
                            : "text-charcoal-300 hover:bg-charcoal-800 hover:text-charcoal-50 light:text-charcoal-600 light:hover:bg-charcoal-100 light:hover:text-charcoal-900"
                        )}
                      >
                        {/* Active dot in mobile menu */}
                        {active && (
                          <span
                            className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-electric-500"
                            aria-hidden="true"
                          />
                        )}
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Mobile CTA */}
              <div className="mt-4 border-t border-charcoal-800 light:border-charcoal-200 pt-4">
                <Button
                  href="/contact"
                  className="w-full justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  Send a brief
                </Button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
