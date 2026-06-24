import type { CatalogComponent, DataSource, Mention, Pattern } from "./types";
import { describeComponent } from "./component-catalog";
import { describeDataSource } from "./seed-data";

// A unified, searchable @-mention item drawn from the three libraries.
export interface MentionItem {
  kind: Mention["kind"];
  id: string;
  label: string; // token text after the @ (no spaces)
  title: string; // display name
  detail: string; // secondary line
}

export function patternItem(p: Pattern): MentionItem {
  return {
    kind: "pattern",
    id: p.id,
    label: tokenize(p.name),
    title: p.name,
    detail: p.description || p.category,
  };
}

export function componentItem(c: CatalogComponent): MentionItem {
  return {
    kind: "component",
    id: c.name,
    label: c.name,
    title: c.name,
    detail: c.description || c.category,
  };
}

export function dataItem(d: DataSource): MentionItem {
  return {
    kind: "data",
    id: d.id,
    label: tokenize(d.name),
    title: d.name,
    detail: d.description,
  };
}

export function tokenize(s: string): string {
  return s.trim().replace(/\s+/g, "-");
}

// Build the context block appended to a user message so the model can act on the
// referenced patterns / components / data sources.
export function buildMentionContext(
  mentions: Mention[],
  lookup: {
    patterns: Pattern[];
    components: CatalogComponent[];
    dataSources: DataSource[];
  },
): string {
  if (mentions.length === 0) return "";
  const sections: string[] = [];

  const comps = mentions
    .filter((m) => m.kind === "component")
    .map((m) => lookup.components.find((c) => c.name === m.id))
    .filter((c): c is CatalogComponent => !!c);
  if (comps.length) {
    sections.push(
      "Referenced components (use these in render_ui):\n" +
        comps.map(describeComponent).join("\n"),
    );
  }

  const pats = mentions
    .filter((m) => m.kind === "pattern")
    .map((m) => lookup.patterns.find((p) => p.id === m.id))
    .filter((p): p is Pattern => !!p);
  if (pats.length) {
    sections.push(
      "Referenced patterns (reuse or adapt these A2UI specs):\n" +
        pats
          .map((p) => `Pattern "${p.name}" (${p.category}):\n${JSON.stringify(p.spec)}`)
          .join("\n\n"),
    );
  }

  const data = mentions
    .filter((m) => m.kind === "data")
    .map((m) => lookup.dataSources.find((d) => d.id === m.id))
    .filter((d): d is DataSource => !!d);
  if (data.length) {
    sections.push(
      "Referenced data sources (bind the UI to this shape; use sample rows):\n" +
        data.map(describeDataSource).join("\n\n"),
    );
  }

  return `\n\n---\n[Workspace context — the user @-mentioned these]\n${sections.join("\n\n")}`;
}

// Reconcile a tracked mention list against the current composer text: keep only
// mentions whose @token still appears.
export function reconcileMentions(text: string, mentions: Mention[]): Mention[] {
  const seen = new Set<string>();
  return mentions.filter((m) => {
    const key = `${m.kind}:${m.id}`;
    if (seen.has(key)) return false;
    if (!text.includes(`@${m.label}`)) return false;
    seen.add(key);
    return true;
  });
}
