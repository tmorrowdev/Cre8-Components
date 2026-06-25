"use client";

import { useEffect, useState } from "react";

const KEY = "cre8-ui-theme";
type Mode = "dark" | "light";

function current(): Mode {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

// Toggles the app chrome between dark and light. The actual attribute is set
// pre-paint by the inline script in layout.tsx (no FOUC); this just flips it.
export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("dark");

  useEffect(() => setMode(current()), []);

  const toggle = () => {
    const next: Mode = current() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
    setMode(next);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      title={mode === "dark" ? "Switch to light" : "Switch to dark"}
      aria-label="Toggle color theme"
    >
      {mode === "dark" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
