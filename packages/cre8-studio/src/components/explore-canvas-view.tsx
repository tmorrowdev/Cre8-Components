"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ComponentSpec } from "@tmorrow/cre8-wc/a2ui";
import { ExploreIframe, type IframeEvent } from "@/components/explore-iframe";
import { parseSseFrame } from "@/lib/sse";
import { classifyHandler, sortRows, type SortDir } from "@/lib/ui-events";
import {
  addPanel,
  flagPanel,
  buildExploreRequest,
  type Panel,
} from "@/lib/explore-canvas";

const DATA_AGENT_URL =
  process.env.NEXT_PUBLIC_DATA_AGENT_URL ?? "http://localhost:8002";
const DATA_AGENT_TOKEN = process.env.NEXT_PUBLIC_DATA_AGENT_TOKEN ?? "";

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (DATA_AGENT_TOKEN) headers["Authorization"] = `Bearer ${DATA_AGENT_TOKEN}`;
  return headers;
}

async function streamSpec(
  url: string,
  body: unknown,
  headers: Record<string, string>,
  onSpec: (spec: ComponentSpec, caption: string) => void,
) {
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let i: number;
    while ((i = buf.indexOf("\n\n")) !== -1) {
      const frame = buf.slice(0, i);
      buf = buf.slice(i + 2);
      const { event, data } = parseSseFrame(frame);
      if (event === "ui_ready" && data) {
        try {
          const p = JSON.parse(data);
          if (p.spec) onSpec(p.spec as ComponentSpec, String(p.caption ?? ""));
        } catch {}
      }
    }
  }
}

export default function ExploreCanvasView({ dataset }: { dataset: string }) {
  const [panels, setPanels] = useState<Panel[]>([]);
  const [path, setPath] = useState<string[]>(["overview"]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"canvas" | "report">("canvas");
  const [reportSpec, setReportSpec] = useState<ComponentSpec | null>(null);
  const [downloading, setDownloading] = useState(false);

  const idRef = useRef(0);
  const nextId = useCallback(() => `panel-${idRef.current++}`, []);
  const sortDirRef = useRef<Record<string, SortDir>>({});
  const didInit = useRef(false);

  // Mirror the latest panels/path into refs so event handlers (whose onEvent
  // is captured in a ref by ExploreIframe and not re-subscribed) read fresh
  // state for dedupe decisions and request context.
  const panelsRef = useRef(panels);
  const pathRef = useRef(path);
  useEffect(() => {
    panelsRef.current = panels;
    pathRef.current = path;
  });

  // Mark a panel ready (or error) by id.
  const resolvePanel = useCallback(
    (id: string, spec: ComponentSpec, caption: string) => {
      setPanels((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, spec, status: "ready", title: caption || p.title }
            : p,
        ),
      );
    },
    [],
  );

  const errorPanel = useCallback((id: string) => {
    setPanels((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "error" } : p)),
    );
  }, []);

  // ── Initial overview ──
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    const id = nextId();
    setPanels([
      {
        id,
        title: "Overview",
        spec: {} as ComponentSpec,
        status: "loading",
        flagged: false,
        action: "overview",
        detail: null,
      },
    ]);
    setLoading(true);
    streamSpec(
      `${DATA_AGENT_URL}/api/explore`,
      { dataset, action: "overview" },
      authHeaders(),
      (spec, caption) => resolvePanel(id, spec, caption),
    )
      .catch(() => errorPanel(id))
      .finally(() => setLoading(false));
  }, [dataset, nextId, resolvePanel, errorPanel]);

  // ── Best-effort local chart re-sort. Returns true when handled. ──
  const applyLocalSort = useCallback((panelId: string): boolean => {
    let handled = false;
    setPanels((prev) => {
      const idx = prev.findIndex((p) => p.id === panelId);
      if (idx === -1) return prev;
      const spec = prev[idx].spec;
      if (!spec || spec.component !== "cre8-chart") return prev;

      const props = (spec.props ?? {}) as Record<string, unknown>;
      const data = props.data as
        | { labels?: unknown[]; datasets?: Array<Record<string, unknown>> }
        | undefined;
      const labels = data?.labels;
      const datasets = data?.datasets;
      if (!Array.isArray(labels) || !Array.isArray(datasets) || datasets.length === 0)
        return prev;
      const first = datasets[0]?.data;
      if (!Array.isArray(first)) return prev;

      const dir: SortDir = sortDirRef.current[panelId] === "asc" ? "desc" : "asc";
      sortDirRef.current[panelId] = dir;

      const indexed = labels.map((_, i) => ({ i, value: (first as unknown[])[i] }));
      const order = sortRows(indexed as Record<string, unknown>[], "value", dir).map(
        (r) => r.i as number,
      );

      const newData = {
        ...data,
        labels: order.map((i) => (labels as unknown[])[i]),
        datasets: datasets.map((d) => ({
          ...d,
          data: Array.isArray(d.data) ? order.map((i) => (d.data as unknown[])[i]) : d.data,
        })),
      };
      const newSpec: ComponentSpec = { ...spec, props: { ...props, data: newData } };
      const copy = prev.slice();
      copy[idx] = { ...prev[idx], spec: newSpec };
      handled = true;
      return copy;
    });
    return handled;
  }, []);

  // ── Iframe event dispatch: local sort first, else agent drill-down. ──
  const handlePanelEvent = useCallback(
    (panelId: string, evt: IframeEvent) => {
      const cls = classifyHandler(evt.handler);

      if (cls.kind === "local" && cls.action === "sort") {
        if (applyLocalSort(panelId)) return;
        // Not a chart — fall through to the agent.
      }

      const intent = cls.kind === "agent" ? cls.intent : evt.handler;
      const detail = evt.detail;

      // Dedupe via the tested reducer against the freshest panels (panelsRef):
      // if the panel already exists, addPanel returns the same array reference
      // and we skip both the id allocation and the fetch.
      const prevPanels = panelsRef.current;
      const probe = addPanel(prevPanels, {
        id: "__probe__",
        title: intent,
        spec: {} as ComponentSpec,
        status: "loading",
        flagged: false,
        action: intent,
        detail,
      });
      if (probe === prevPanels) return; // dedupe hit — skip fetch (no id burned)

      const id = nextId();
      const newPanel: Panel = {
        id,
        title: intent,
        spec: {} as ComponentSpec,
        status: "loading",
        flagged: false,
        action: intent,
        detail,
      };
      const newPath = [...pathRef.current, `${intent}:${JSON.stringify(detail)}`];
      setPanels((prev) => addPanel(prev, newPanel));
      setPath(newPath);
      setLoading(true);
      // Build the request from the FRESH arrays: panelsRef.current is the
      // pre-append set (what's already on canvas, with current flags), and
      // newPath includes this new entry.
      streamSpec(
        `${DATA_AGENT_URL}/api/explore`,
        buildExploreRequest(dataset, intent, detail, prevPanels, newPath),
        authHeaders(),
        (spec, caption) => resolvePanel(id, spec, caption),
      )
        .catch(() => errorPanel(id))
        .finally(() => setLoading(false));
    },
    [applyLocalSort, dataset, nextId, resolvePanel, errorPanel],
  );

  const removePanel = useCallback((id: string) => {
    setPanels((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const flaggedCount = panels.filter((p) => p.flagged).length;

  // ── Generate report ──
  const generateReport = useCallback(async () => {
    if (flaggedCount === 0 || loading) return;
    setLoading(true);
    try {
      let captured: ComponentSpec | null = null;
      await streamSpec(
        `${DATA_AGENT_URL}/api/report`,
        buildExploreRequest(dataset, "report", null, panels, path),
        authHeaders(),
        (spec) => {
          captured = spec;
        },
      );
      if (captured) {
        setReportSpec(captured);
        setMode("report");
      }
    } finally {
      setLoading(false);
    }
  }, [dataset, flaggedCount, loading, panels, path]);

  // ── Download report HTML (same-origin studio route) ──
  const downloadReport = useCallback(async () => {
    if (!reportSpec) return;
    setDownloading(true);
    try {
      const res = await fetch("/api/explore-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spec: reportSpec, dataset }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report-${dataset}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Report download failed", err);
    } finally {
      setDownloading(false);
    }
  }, [reportSpec, dataset]);

  // ── Report view ──
  if (mode === "report" && reportSpec) {
    return (
      <div className="explore-report">
        <div className="explore-report-bar">
          <button
            type="button"
            className="explore-btn"
            onClick={() => setMode("canvas")}
          >
            ← Back to canvas
          </button>
          <button
            type="button"
            className="explore-btn explore-btn--primary"
            onClick={downloadReport}
            disabled={downloading}
          >
            {downloading ? "Downloading…" : "Download HTML"}
          </button>
        </div>
        <div className="explore-report-body">
          <ExploreIframe spec={reportSpec} onEvent={() => {}} />
        </div>
      </div>
    );
  }

  // ── Canvas view ──
  return (
    <div className="explore-canvas">
      <div className="explore-grid">
        {panels.map((panel) => (
          <div key={panel.id} className="explore-panel">
            <div className="explore-panel-bar">
              <span className="explore-panel-title">{panel.title}</span>
              <div className="explore-panel-actions">
                <button
                  type="button"
                  className={`explore-icon-btn${panel.flagged ? " explore-icon-btn--active" : ""}`}
                  onClick={() => setPanels((p) => flagPanel(p, panel.id))}
                  title={panel.flagged ? "Remove from report" : "Add to report"}
                >
                  {panel.flagged ? "★" : "☆"}
                </button>
                <button
                  type="button"
                  className="explore-icon-btn"
                  onClick={() => removePanel(panel.id)}
                  title="Remove panel"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="explore-panel-body">
              {panel.status === "loading" && (
                <div className="explore-panel-loading">
                  <span className="stack-spinner" />
                  <span>Exploring…</span>
                </div>
              )}
              {panel.status === "ready" && (
                <ExploreIframe
                  spec={panel.spec}
                  onEvent={(e) => handlePanelEvent(panel.id, e)}
                />
              )}
              {panel.status === "error" && (
                <div className="explore-panel-error">Failed to load this view.</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="explore-tray">
        <span className="explore-tray-count">
          {flaggedCount} visualization{flaggedCount === 1 ? "" : "s"} selected
        </span>
        <button
          type="button"
          className="explore-btn explore-btn--primary"
          onClick={generateReport}
          disabled={flaggedCount === 0 || loading}
        >
          {loading ? "Working…" : "Generate report"}
        </button>
      </div>
    </div>
  );
}
