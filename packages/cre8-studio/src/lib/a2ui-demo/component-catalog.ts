import catalog from "@tmorrow/cre8-wc/a2ui/catalog.json" with { type: "json" };
import type { CatalogComponent } from "./types";

type RawDef = {
  title?: string;
  description?: string;
  "x-category"?: string;
  properties?: {
    props?: { properties?: Record<string, unknown> };
    children?: unknown;
    slots?: { properties?: Record<string, unknown> };
    events?: { properties?: Record<string, unknown> };
  };
  "x-events"?: Record<string, unknown>;
};

type RawCatalog = { $defs?: { components?: Record<string, RawDef> } };

let cached: CatalogComponent[] | null = null;

// Flatten catalog.json into a list of @-mentionable components. Memoised — the
// catalog is static for the life of the process / page.
export function getCatalogComponents(): CatalogComponent[] {
  if (cached) return cached;
  const comps = (catalog as RawCatalog).$defs?.components ?? {};
  cached = Object.entries(comps).map(([name, def]) => {
    const desc = (def.description ?? "").split("\n")[0].trim();
    return {
      name,
      title: def.title ?? name,
      description: desc,
      category: def["x-category"] ?? "Other",
      props: Object.keys(def.properties?.props?.properties ?? {}),
      slots: Object.keys(def.properties?.slots?.properties ?? {}),
      events: Object.keys(def["x-events"] ?? def.properties?.events?.properties ?? {}),
      acceptsChildren: !!def.properties?.children,
    };
  });
  return cached;
}

export function findComponent(name: string): CatalogComponent | undefined {
  return getCatalogComponents().find((c) => c.name === name);
}

// A compact, model-friendly description of a component for context injection.
export function describeComponent(c: CatalogComponent): string {
  const parts = [`${c.name} — ${c.description || c.title}`];
  if (c.props.length) parts.push(`  props: ${c.props.slice(0, 12).join(", ")}`);
  // Make the post-refactor content rule explicit so @-mentioned components are
  // composed correctly (children[] vs slots.default).
  if (c.acceptsChildren) parts.push(`  content: children[]`);
  else if (c.slots.includes("default")) parts.push(`  content: slots.default (NOT children)`);
  if (c.slots.length) parts.push(`  slots: ${c.slots.join(", ")}`);
  if (c.events.length) parts.push(`  events: ${c.events.join(", ")}`);
  return parts.join("\n");
}
