"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ComponentSpec, EmittedEvent } from "@tmorrow/cre8-wc/a2ui";
import { A2uiCanvas } from "./a2ui-canvas";
import {
  classifyHandler,
  buildUiEvent,
  sortRows,
  type SortDir,
  type UiEventPayload,
} from "@/lib/ui-events";
import { parseSseFrame } from "@/lib/sse";

const DATA_AGENT_URL =
  process.env.NEXT_PUBLIC_DATA_AGENT_URL ?? "http://localhost:8002";
const DATA_AGENT_TOKEN = process.env.NEXT_PUBLIC_DATA_AGENT_TOKEN ?? "";

const TOOL_LABELS: Record<string, string> = {
  search_components: "Searching component library…",
  get_component: "Looking up component details…",
};

type TextBlock = { kind: "text"; text: string };
type UiBlock = { kind: "ui"; spec: ComponentSpec; caption?: string };
type ErrorBlock = { kind: "error"; text: string };
type AssistantBlock = TextBlock | UiBlock | ErrorBlock;

type Turn =
  | { role: "user"; text: string; dataRows?: number }
  | { role: "assistant"; blocks: AssistantBlock[] };

function tryParseData(raw: string): { rows: Record<string, unknown>[]; error?: never } | { error: string; rows?: never } {
  try {
    const parsed = JSON.parse(raw.trim());
    if (!Array.isArray(parsed)) return { error: "Expected a JSON array of objects" };
    if (parsed.length === 0) return { error: "Array is empty" };
    if (typeof parsed[0] !== "object" || parsed[0] === null) return { error: "Items must be objects" };
    return { rows: parsed as Record<string, unknown>[] };
  } catch (e) {
    return { error: `Invalid JSON: ${e instanceof Error ? e.message : String(e)}` };
  }
}

export default function DataAgent() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [agentStatus, setAgentStatus] = useState("");
  const [latestSpec, setLatestSpec] = useState<ComponentSpec | null>(null);
  const [latestCaption, setLatestCaption] = useState("");
  const [dataText, setDataText] = useState("");
  const [dataError, setDataError] = useState("");
  const [showDataPanel, setShowDataPanel] = useState(false);
  const [sessionData, setSessionData] = useState<Record<string, unknown>[] | null>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const sortDirRef = useRef<Record<string, SortDir>>({});

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns, streaming]);

  const pushBlock = useCallback((fn: (blocks: AssistantBlock[]) => AssistantBlock[]) => {
    setTurns((prev) => {
      const copy = [...prev];
      const last = copy[copy.length - 1];
      if (last?.role !== "assistant") return prev;
      copy[copy.length - 1] = { role: "assistant", blocks: fn(last.blocks) };
      return copy;
    });
  }, []);

  const sendMessage = useCallback(async (
    text: string,
    data: Record<string, unknown>[] | null,
    uiEvent?: UiEventPayload,
  ) => {
    const userTurn: Turn = { role: "user", text, dataRows: data?.length };
    const assistantTurn: Turn = { role: "assistant", blocks: [] };
    setTurns((prev) => [...prev, userTurn, assistantTurn]);
    setStreaming(true);
    setAgentStatus("Connecting…");

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (DATA_AGENT_TOKEN) headers["Authorization"] = `Bearer ${DATA_AGENT_TOKEN}`;

    try {
      const res = await fetch(`${DATA_AGENT_URL}/api/chat`, {
        method: "POST",
        headers,
        body: JSON.stringify({ prompt: text, data: data ?? undefined, ui_event: uiEvent }),
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buffer.indexOf("\n\n")) !== -1) {
          const frame = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 2);
          const { event, data: dataStr } = parseSseFrame(frame);
          if (!dataStr) continue;

          let payload: Record<string, unknown>;
          try {
            payload = JSON.parse(dataStr);
          } catch {
            continue;
          }

          switch (event) {
            case "agent_start":
              setAgentStatus(`${payload.agent ?? "DataAgent"} running…`);
              break;

            case "tool_use":
              setAgentStatus(TOOL_LABELS[String(payload.tool ?? "")] ?? "Working…");
              break;

            case "text": {
              const delta = String(payload.delta ?? "");
              setAgentStatus("");
              pushBlock((blocks) => {
                const last = blocks[blocks.length - 1];
                if (last?.kind === "text") {
                  return [...blocks.slice(0, -1), { kind: "text", text: last.text + delta }];
                }
                return [...blocks, { kind: "text", text: delta }];
              });
              break;
            }

            case "ui_ready": {
              const spec = payload.spec as ComponentSpec;
              const caption = String(payload.caption ?? "");
              if (spec) {
                setLatestSpec(spec);
                setLatestCaption(caption);
                pushBlock((blocks) => [...blocks, { kind: "ui", spec, caption }]);
              }
              break;
            }

            case "done":
              setAgentStatus("");
              break;

            case "error":
              pushBlock((blocks) => [
                ...blocks,
                { kind: "error", text: String(payload.message ?? "Unknown error") },
              ]);
              setAgentStatus("");
              break;
          }
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      pushBlock((blocks) => [...blocks, { kind: "error", text: msg }]);
      setAgentStatus("");
    } finally {
      setStreaming(false);
    }
  }, [pushBlock]);

  // Best-effort local sort: reorders a rendered cre8-chart's data by its first
  // dataset, toggling direction per element. Returns false when the spec shape
  // is not something we can reorder safely (caller then escalates to the agent).
  const applyLocalSort = useCallback((evt: EmittedEvent): boolean => {
    const spec = latestSpec;
    if (!spec || spec.component !== "cre8-chart") return false;

    const props = (spec.props ?? {}) as Record<string, unknown>;
    const data = props.data as
      | { labels?: unknown[]; datasets?: Array<Record<string, unknown>> }
      | undefined;
    const labels = data?.labels;
    const datasets = data?.datasets;
    if (!Array.isArray(labels) || !Array.isArray(datasets) || datasets.length === 0) return false;
    const first = datasets[0]?.data;
    if (!Array.isArray(first)) return false;

    const dir: SortDir = sortDirRef.current[evt.path] === "asc" ? "desc" : "asc";
    sortDirRef.current[evt.path] = dir;

    // Sort an index permutation by the first dataset's value, then reorder all
    // labels and datasets by that permutation so series stay aligned.
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

    setLatestSpec(newSpec);
    setTurns((prev) => {
      for (let i = prev.length - 1; i >= 0; i--) {
        const turn = prev[i];
        if (turn.role !== "assistant") continue;
        const bi = turn.blocks.map((b) => b.kind).lastIndexOf("ui");
        if (bi === -1) continue;
        const blocks = turn.blocks.slice();
        const old = blocks[bi] as UiBlock;
        blocks[bi] = { ...old, spec: newSpec };
        const copy = prev.slice();
        copy[i] = { role: "assistant", blocks };
        return copy;
      }
      return prev;
    });
    return true;
  }, [latestSpec]);

  const handleCanvasEvent = useCallback((evt: EmittedEvent) => {
    const cls = classifyHandler(evt.handler);
    if (cls.kind === "local" && cls.action === "sort") {
      if (applyLocalSort(evt)) return;
      // Could not sort locally — fall through to the agent.
    }
    const payload = buildUiEvent(evt);
    const label = `(${payload.intent} on ${payload.component})`;
    void sendMessage(label, sessionData, payload);
  }, [applyLocalSort, sendMessage, sessionData]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = input.trim();
    if (!v || streaming) return;

    let parsedData: Record<string, unknown>[] | null = null;
    if (dataText.trim()) {
      const result = tryParseData(dataText);
      if (result.error) {
        setDataError(result.error);
        return;
      }
      parsedData = result.rows!;
    }

    if (parsedData) setSessionData(parsedData);
    setInput("");
    void sendMessage(v, parsedData);
  };

  const onDataChange = (val: string) => {
    setDataText(val);
    if (dataError) setDataError("");
  };

  const parsedRows = dataText.trim() ? tryParseData(dataText) : null;
  const dataLoaded = parsedRows && !parsedRows.error;

  return (
    <div className="stack-layout">
      {/* ── Chat panel ── */}
      <div className="stack-chat">
        <div className="stack-messages" ref={threadRef}>
          {turns.length === 0 && (
            <div className="stack-message stack-message--assistant">
              <span className="stack-message-role">data agent</span>
              <p className="stack-message-text">
                Paste data or ask a question. Try:{" "}
                <em>&ldquo;Show me [your data] as a bar chart&rdquo;</em> or{" "}
                <em>&ldquo;Summarize this dataset&rdquo;</em>.
              </p>
            </div>
          )}

          {turns.map((turn, i) => {
            if (turn.role === "user") {
              return (
                <div key={i} className="stack-message stack-message--user">
                  <span className="stack-message-role">you</span>
                  <p className="stack-message-text">{turn.text}</p>
                  {turn.dataRows != null && (
                    <p className="da-data-badge">{turn.dataRows} rows attached</p>
                  )}
                </div>
              );
            }
            return (
              <div key={i} className="stack-message stack-message--assistant">
                <span className="stack-message-role">data agent</span>
                {turn.blocks.map((block, j) => {
                  if (block.kind === "text") {
                    return <p key={j} className="stack-message-text">{block.text}</p>;
                  }
                  if (block.kind === "ui") {
                    return (
                      <div key={j} className="da-canvas-inline">
                        {block.caption && (
                          <p className="da-canvas-caption">{block.caption}</p>
                        )}
                        <A2uiCanvas spec={block.spec} onEvent={handleCanvasEvent} />
                      </div>
                    );
                  }
                  return (
                    <pre key={j} className="a2ui-canvas-error">{block.text}</pre>
                  );
                })}
              </div>
            );
          })}

          {streaming && agentStatus && (
            <div className="stack-message stack-message--assistant">
              <span className="stack-message-role">data agent</span>
              <p className="stack-message-text" style={{ opacity: 0.5 }}>
                <span className="stack-spinner" style={{ marginRight: 6 }} />
                {agentStatus}
              </p>
            </div>
          )}
        </div>

        {/* ── Data panel ── */}
        {showDataPanel && (
          <div className="da-data-panel">
            <div className="da-data-panel-header">
              <span>JSON data</span>
              {dataLoaded && (
                <span className="da-data-badge">{parsedRows!.rows!.length} rows</span>
              )}
              <button
                type="button"
                className="da-data-clear"
                onClick={() => { setDataText(""); setDataError(""); }}
              >
                Clear
              </button>
            </div>
            <textarea
              className="da-data-textarea"
              value={dataText}
              onChange={(e) => onDataChange(e.target.value)}
              placeholder={'[{"col": "value"}, ...]'}
              rows={5}
              spellCheck={false}
            />
            {dataError && <p className="da-data-error">{dataError}</p>}
          </div>
        )}

        <div className="stack-composer">
          <div className="da-composer-toolbar">
            <button
              type="button"
              className={`da-data-toggle${showDataPanel ? " da-data-toggle--active" : ""}${dataLoaded ? " da-data-toggle--loaded" : ""}`}
              onClick={() => setShowDataPanel((v) => !v)}
              title="Attach JSON data"
            >
              {dataLoaded ? `📋 ${parsedRows!.rows!.length} rows` : "📋 Data"}
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmit(e);
              }
            }}
            placeholder={
              streaming
                ? "Agent is responding…"
                : "Ask about data, paste JSON, or request a chart…"
            }
            disabled={streaming}
            rows={3}
          />
          <button type="button" onClick={onSubmit} disabled={streaming || !input.trim()}>
            Send
          </button>
        </div>
      </div>

      {/* ── Canvas panel ── */}
      <div className="da-canvas-panel">
        {latestSpec ? (
          <div className="da-canvas-panel-inner">
            {latestCaption && <p className="da-canvas-panel-caption">{latestCaption}</p>}
            <A2uiCanvas spec={latestSpec} onEvent={handleCanvasEvent} />
          </div>
        ) : (
          <div className="stack-preview-placeholder">
            <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
            Charts, tables, and cards will appear here when the agent renders them.
          </div>
        )}
      </div>
    </div>
  );
}
