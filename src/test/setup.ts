import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Unmount React trees and clear all side-effects after every test.
// Prevents state from leaking between tests in the same file.
afterEach(() => {
  cleanup();
});

// ─── Global fetch mock ────────────────────────────────────────────────────────
// jsdom does not ship a real fetch. Mock it globally so components that call
// fetch don't throw. Individual tests override this with vi.mocked(fetch).
global.fetch = vi.fn();

// ─── Scroll / IntersectionObserver stubs ─────────────────────────────────────
// jsdom does not implement layout APIs used by Framer Motion and sticky headers.
Object.defineProperty(window, "scrollTo",            { value: vi.fn(), writable: true });
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe:    vi.fn(),
    unobserve:  vi.fn(),
    disconnect: vi.fn(),
  })),
});

// ─── matchMedia stub ──────────────────────────────────────────────────────────
// Required by components that use the prefers-reduced-motion or dark-mode
// media query (e.g. Framer Motion's useReducedMotion hook).
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches:             false,
    media:               query,
    onchange:            null,
    addListener:         vi.fn(),
    removeListener:      vi.fn(),
    addEventListener:    vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent:       vi.fn(),
  })),
});
