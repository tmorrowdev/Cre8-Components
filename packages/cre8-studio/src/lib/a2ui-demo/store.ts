"use client";

import type { BrandTheme, DataSource, Pattern } from "./types";
import { SEED_DATA_SOURCES } from "./seed-data";

// Demo persistence layer. Everything lives in localStorage so the demo is fully
// client-side and survives reloads within a browser (the remote container is
// ephemeral, so server persistence would be lost anyway). Builtin patterns are
// fetched once from /api/a2ui-patterns and cached.

const K_PATTERNS = "cre8-a2ui:patterns";
const K_DATA = "cre8-a2ui:data-sources";
const K_THEME = "cre8-a2ui:theme";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("cre8-a2ui:store", { detail: { key } }));
  } catch {
    /* quota / private mode — ignore for demo */
  }
}

// ----- Patterns -------------------------------------------------------------

let builtinPatterns: Pattern[] | null = null;

export async function loadBuiltinPatterns(): Promise<Pattern[]> {
  if (builtinPatterns) return builtinPatterns;
  try {
    const res = await fetch("/api/a2ui-patterns");
    const json = (await res.json()) as { patterns: Pattern[] };
    builtinPatterns = json.patterns ?? [];
  } catch {
    builtinPatterns = [];
  }
  return builtinPatterns;
}

export function getUserPatterns(): Pattern[] {
  return read<Pattern[]>(K_PATTERNS, []);
}

// Builtins first, then user-saved (newest last). Builtins are passed in so the
// caller controls when the async fetch has resolved.
export function mergePatterns(builtins: Pattern[]): Pattern[] {
  return [...builtins, ...getUserPatterns()];
}

export function savePattern(p: Omit<Pattern, "id" | "builtin">): Pattern {
  const pattern: Pattern = {
    ...p,
    id: `user:${slug(p.name)}:${Date.now().toString(36)}`,
  };
  const next = [...getUserPatterns(), pattern];
  write(K_PATTERNS, next);
  return pattern;
}

export function deletePattern(id: string): void {
  write(K_PATTERNS, getUserPatterns().filter((p) => p.id !== id));
}

// ----- Data sources ---------------------------------------------------------

export function getDataSources(): DataSource[] {
  const user = read<DataSource[]>(K_DATA, []);
  return [...SEED_DATA_SOURCES, ...user];
}

export function saveDataSource(ds: Omit<DataSource, "id" | "builtin">): DataSource {
  const source: DataSource = { ...ds, id: `ds-user:${slug(ds.name)}:${Date.now().toString(36)}` };
  const user = read<DataSource[]>(K_DATA, []);
  write(K_DATA, [...user, source]);
  return source;
}

export function deleteDataSource(id: string): void {
  const user = read<DataSource[]>(K_DATA, []);
  write(K_DATA, user.filter((d) => d.id !== id));
}

// ----- Brand theme ----------------------------------------------------------

export function getTheme(): BrandTheme | null {
  return read<BrandTheme | null>(K_THEME, null);
}

export function setTheme(theme: BrandTheme | null): void {
  write(K_THEME, theme);
}

// ----- helpers --------------------------------------------------------------

export function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "item";
}

// Subscribe to cross-component store changes (and other tabs).
export function onStoreChange(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener("cre8-a2ui:store", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("cre8-a2ui:store", handler);
    window.removeEventListener("storage", handler);
  };
}
