"use client";

import { useMemo, useState } from "react";
import type { CatalogComponent, DataSource, Mention, Pattern } from "@/lib/a2ui-demo/types";

type Tab = "patterns" | "components" | "data";

// Left sidebar listing the three prepopulated, @-mentionable libraries. Clicking
// an item inserts it as a mention into the composer.
export default function LibraryPanel({
  patterns,
  components,
  dataSources,
  onMention,
  onPreviewPattern,
  onDeletePattern,
}: {
  patterns: Pattern[];
  components: CatalogComponent[];
  dataSources: DataSource[];
  onMention: (m: Mention) => void;
  onPreviewPattern: (p: Pattern) => void;
  onDeletePattern: (id: string) => void;
}) {
  const [tab, setTab] = useState<Tab>("patterns");
  const [q, setQ] = useState("");

  const query = q.trim().toLowerCase();
  const fPatterns = useMemo(
    () => patterns.filter((p) => match(query, p.name, p.description, p.category)),
    [patterns, query],
  );
  const fComponents = useMemo(
    () => components.filter((c) => match(query, c.name, c.description, c.category)),
    [components, query],
  );
  const fData = useMemo(
    () => dataSources.filter((d) => match(query, d.name, d.description)),
    [dataSources, query],
  );

  const counts = {
    patterns: patterns.length,
    components: components.length,
    data: dataSources.length,
  };

  return (
    <aside className="library-panel">
      <div className="library-tabs">
        <button className={tab === "patterns" ? "active" : ""} onClick={() => setTab("patterns")}>
          Patterns <span>{counts.patterns}</span>
        </button>
        <button className={tab === "components" ? "active" : ""} onClick={() => setTab("components")}>
          Components <span>{counts.components}</span>
        </button>
        <button className={tab === "data" ? "active" : ""} onClick={() => setTab("data")}>
          Data <span>{counts.data}</span>
        </button>
      </div>

      <input
        className="library-search"
        placeholder={`Search ${tab}…`}
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <div className="library-list">
        {tab === "patterns" &&
          fPatterns.map((p) => (
            <div key={p.id} className="library-item">
              <button
                className="library-item-main"
                onClick={() =>
                  onMention({ kind: "pattern", id: p.id, label: tokenize(p.name) })
                }
                title="Insert @mention"
              >
                <span className="library-item-title">
                  {p.name}
                  {p.builtin ? (
                    <span className="library-badge">built-in</span>
                  ) : (
                    <span className="library-badge library-badge--user">saved</span>
                  )}
                </span>
                <span className="library-item-detail">{p.description}</span>
              </button>
              <div className="library-item-actions">
                <button onClick={() => onPreviewPattern(p)} title="Preview in renderer">
                  ▦
                </button>
                {!p.builtin && (
                  <button onClick={() => onDeletePattern(p.id)} title="Delete">
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}

        {tab === "components" &&
          fComponents.map((c) => (
            <button
              key={c.name}
              className="library-item library-item--compact"
              onClick={() => onMention({ kind: "component", id: c.name, label: c.name })}
              title="Insert @mention"
            >
              <span className="library-item-title">{c.name}</span>
              <span className="library-item-detail">{c.description || c.category}</span>
            </button>
          ))}

        {tab === "data" &&
          fData.map((d) => (
            <button
              key={d.id}
              className="library-item library-item--compact"
              onClick={() => onMention({ kind: "data", id: d.id, label: tokenize(d.name) })}
              title="Insert @mention"
            >
              <span className="library-item-title">
                {d.name}
                {!d.builtin && <span className="library-badge library-badge--user">saved</span>}
              </span>
              <span className="library-item-detail">
                {d.columns.length} cols · {d.description}
              </span>
            </button>
          ))}
      </div>
    </aside>
  );
}

function match(q: string, ...fields: (string | undefined)[]): boolean {
  if (!q) return true;
  return fields.some((f) => f?.toLowerCase().includes(q));
}

function tokenize(s: string): string {
  return s.trim().replace(/\s+/g, "-");
}
