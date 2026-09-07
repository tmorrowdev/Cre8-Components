"use client";

import type { BrandTheme } from "./types";

const STYLE_ID = "cre8-a2ui-brand-theme";

// Inject (or update) the brand theme override stylesheet at document level so the
// custom properties cascade into every cre8-wc component's shadow DOM. Passing
// null removes the override and restores the default cre8-a2ui palette.
export function applyTheme(theme: BrandTheme | null): void {
  if (typeof document === "undefined") return;
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!theme) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("style");
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }
  const fontRule = theme.fontFamily
    ? `:root{--cre8-typography-body-default-font-family:${cssFont(theme.fontFamily)};` +
      `--cre8-typography-heading-default-font-family:${cssFont(theme.fontFamily)};}`
    : "";
  el.textContent = `${theme.css}\n${fontRule}`;
}

// A small inline preview stylesheet scoped to a container, for the extractor's
// before/after comparison without mutating the whole document.
export function scopedThemeCss(theme: BrandTheme, selector: string): string {
  return theme.css.replace(/:root\b/g, selector);
}

function cssFont(f: string): string {
  // Ensure a sane fallback chain.
  const trimmed = f.trim();
  if (/sans-serif|serif|monospace|system-ui/.test(trimmed)) return trimmed;
  return `${trimmed}, system-ui, sans-serif`;
}
