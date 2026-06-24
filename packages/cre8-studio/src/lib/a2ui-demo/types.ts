import type { ComponentSpec } from "@tmorrow/cre8-wc/a2ui";

// A reusable A2UI pattern — anything from a single component up to a full UI page.
// Seeded patterns ship with the app; user patterns are saved from the workspace.
export interface Pattern {
  id: string;
  name: string;
  description: string;
  category: string;
  spec: ComponentSpec;
  builtin?: boolean;
}

// A cre8-wc component as an @-mentionable item.
export interface CatalogComponent {
  name: string; // e.g. "cre8-button"
  title: string;
  description: string;
  category: string;
  props: string[];
  slots: string[];
  events: string[];
}

// A data source the agent can build UI against. Seeded with mock datasets; the
// schema + sample rows are injected into the model context when @-mentioned.
export interface DataSource {
  id: string;
  name: string;
  description: string;
  columns: { name: string; type: string }[];
  sample: Record<string, unknown>[];
  builtin?: boolean;
}

// A brand theme produced by the extractor and applied across the workspace.
export interface BrandTheme {
  name: string;
  primary: string; // hex
  accent?: string; // hex
  fontFamily?: string;
  source?: string; // url it was extracted from
  ramp: string[];
  // CSS override block ( :root { ... } ) substituting the brand ramp for the
  // default cre8-a2ui blue ramp across all tokens.
  css: string;
  createdAt: number;
}

// The three kinds of @-mention available in the workspace composer.
export type MentionKind = "pattern" | "component" | "data";

export interface Mention {
  kind: MentionKind;
  id: string; // pattern id | component name | data source id
  label: string; // shown in the chip / inline token
}
