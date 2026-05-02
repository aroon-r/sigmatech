"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme,   setTheme]   = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const resolved: Theme =
      stored === "dark" || stored === "light"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    setTheme(resolved);
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(next);
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  // Render a same-size placeholder until the client reads localStorage,
  // preventing a layout shift in the navbar.
  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
        "text-charcoal-400 hover:bg-charcoal-800 hover:text-charcoal-50",
        "light:text-charcoal-600 light:hover:bg-charcoal-100 light:hover:text-charcoal-900",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-500"
      )}
    >
      {theme === "dark"
        ? <Sun  className="h-4 w-4" aria-hidden="true" />
        : <Moon className="h-4 w-4" aria-hidden="true" />
      }
    </button>
  );
}
