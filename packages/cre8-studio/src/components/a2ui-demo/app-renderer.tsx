"use client";

import { useState } from "react";
import type { ComponentSpec, EmittedEvent } from "@tmorrow/cre8-wc/a2ui";
import { A2uiCanvas } from "@/components/a2ui-canvas";

type Tab = "app" | "spec";

// The right-hand "app renderer" — shows the latest UI the agent composed, full
// size, with the ability to inspect the spec and save it as a reusable pattern.
export default function AppRenderer({
  spec,
  onEvent,
  onSave,
  streaming,
  count = 0,
  index = -1,
  viewingOlder = false,
  onShowLatest,
}: {
  spec: ComponentSpec | null;
  onEvent: (e: EmittedEvent) => void;
  onSave: (spec: ComponentSpec) => void;
  streaming: boolean;
  count?: number;
  index?: number;
  viewingOlder?: boolean;
  onShowLatest?: () => void;
}) {
  const [tab, setTab] = useState<Tab>("app");

  return (
    <section className="app-renderer">
      <div className="app-renderer-bar">
        <span className="app-renderer-title">
          App renderer
          {count > 1 && index >= 0 && (
            <span className="app-renderer-count">
              {" "}
              · {index + 1}/{count}
            </span>
          )}
        </span>
        <div className="app-renderer-tabs">
          <button
            className={tab === "app" ? "active" : ""}
            onClick={() => setTab("app")}
            disabled={!spec}
          >
            Preview
          </button>
          <button
            className={tab === "spec" ? "active" : ""}
            onClick={() => setTab("spec")}
            disabled={!spec}
          >
            Spec
          </button>
        </div>
        <button
          className="app-renderer-save"
          onClick={() => spec && onSave(spec)}
          disabled={!spec}
          title="Save the current UI as a reusable pattern"
        >
          ＋ Save as pattern
        </button>
      </div>

      {viewingOlder && (
        <button type="button" className="app-renderer-older" onClick={onShowLatest}>
          Viewing an earlier render — <strong>show latest →</strong>
        </button>
      )}

      <div className="app-renderer-body">
        {!spec && (
          <div className="app-renderer-empty">
            <div className="app-renderer-empty-glyph">▦</div>
            <p>
              {streaming
                ? "Composing your UI…"
                : "The app you build appears here. Ask the agent for a screen, form, dashboard or page — @mention components, patterns and data to steer it."}
            </p>
          </div>
        )}
        {spec && tab === "app" && (
          <div className="app-renderer-canvas">
            <A2uiCanvas spec={spec} onEvent={onEvent} />
          </div>
        )}
        {spec && tab === "spec" && (
          <pre className="app-renderer-spec">{JSON.stringify(spec, null, 2)}</pre>
        )}
      </div>
    </section>
  );
}
