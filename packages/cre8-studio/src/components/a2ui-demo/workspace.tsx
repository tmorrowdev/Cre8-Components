"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentSpec, EmittedEvent } from "@tmorrow/cre8-wc/a2ui";
import type {
  CatalogComponent,
  DataSource,
  Mention,
  Pattern,
} from "@/lib/a2ui-demo/types";
import { getCatalogComponents } from "@/lib/a2ui-demo/component-catalog";
import {
  buildMentionContext,
  componentItem,
  dataItem,
  patternItem,
  reconcileMentions,
  type MentionItem,
} from "@/lib/a2ui-demo/mentions";
import {
  deleteDataSource,
  deletePattern,
  getDataSources,
  loadBuiltinPatterns,
  mergePatterns,
  onStoreChange,
  savePattern,
} from "@/lib/a2ui-demo/store";
import LibraryPanel from "./library-panel";
import MentionInput from "./mention-input";
import AppRenderer from "./app-renderer";
import Modal from "@/components/shell/modal";
import { toast } from "@/components/shell/toast";

// ---- chat wire model (mirrors components/chat.tsx) -------------------------

type UiBlock =
  | { kind: "text"; text: string }
  | { kind: "thinking"; text: string }
  | { kind: "ui"; id: string; spec: ComponentSpec; caption?: string; consumed?: boolean }
  | { kind: "error"; text: string };

type UserBlock =
  | { kind: "text"; text: string; display?: string }
  | { kind: "tool_result"; tool_use_id: string; label: string; payload: Record<string, unknown> };

type ChatMessage =
  | { role: "user"; blocks: UserBlock[] }
  | { role: "assistant"; blocks: UiBlock[] };

type WireContent =
  | { type: "text"; text: string }
  | { type: "tool_use"; id: string; name: "render_ui"; input: { spec: ComponentSpec; caption?: string } }
  | { type: "tool_result"; tool_use_id: string; content: string };
type WireMessage = { role: "user" | "assistant"; content: WireContent[] };

function toWire(messages: ChatMessage[]): WireMessage[] {
  return messages.map((m): WireMessage => {
    if (m.role === "user") {
      const content: WireContent[] = [];
      for (const b of m.blocks)
        if (b.kind === "tool_result")
          content.push({ type: "tool_result", tool_use_id: b.tool_use_id, content: JSON.stringify(b.payload) });
      for (const b of m.blocks)
        if (b.kind === "text" && b.text) content.push({ type: "text", text: b.text });
      if (content.length === 0) content.push({ type: "text", text: "" });
      return { role: "user", content };
    }
    const content: WireContent[] = [];
    for (const b of m.blocks) {
      if (b.kind === "text" && b.text) content.push({ type: "text", text: b.text });
      if (b.kind === "ui")
        content.push({ type: "tool_use", id: b.id, name: "render_ui", input: { spec: b.spec, caption: b.caption } });
    }
    if (content.length === 0) content.push({ type: "text", text: "" });
    return { role: "assistant", content };
  });
}

function pendingToolUses(messages: ChatMessage[]): Array<{ id: string }> {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role === "user") break;
    if (m.role === "assistant")
      return m.blocks
        .filter((b): b is Extract<UiBlock, { kind: "ui" }> => b.kind === "ui" && !b.consumed)
        .map((b) => ({ id: b.id }));
  }
  return [];
}

function markConsumed(messages: ChatMessage[], ids: Set<string>): ChatMessage[] {
  const copy = [...messages];
  for (let i = copy.length - 1; i >= 0; i--) {
    const m = copy[i];
    if (m.role === "assistant") {
      copy[i] = {
        role: "assistant",
        blocks: m.blocks.map((b) => (b.kind === "ui" && ids.has(b.id) ? { ...b, consumed: true } : b)),
      };
      return copy;
    }
  }
  return copy;
}

// Most recent UI spec the agent produced — drives the renderer panel.
function latestSpec(messages: ChatMessage[]): { id: string; spec: ComponentSpec } | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role !== "assistant") continue;
    for (let j = m.blocks.length - 1; j >= 0; j--) {
      const b = m.blocks[j];
      if (b.kind === "ui") return { id: b.id, spec: b.spec };
    }
  }
  return null;
}

// ---------------------------------------------------------------------------

const STARTERS = [
  "Build a user management table from @users with role badges and a search field",
  "Create a product gallery from @products as cards with price and rating",
  "Build a support dashboard from @support_tickets with priority badges",
];

export default function Workspace() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [mentions, setMentions] = useState<Mention[]>([]);
  const [streaming, setStreaming] = useState(false);

  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const components = useMemo<CatalogComponent[]>(() => getCatalogComponents(), []);

  // Save-as-pattern modal
  const [saveTarget, setSaveTarget] = useState<ComponentSpec | null>(null);
  const [saveName, setSaveName] = useState("");
  const [saveDesc, setSaveDesc] = useState("");

  const threadRef = useRef<HTMLDivElement>(null);

  // Load libraries (builtin patterns from API + user items from localStorage).
  useEffect(() => {
    let alive = true;
    const refresh = async () => {
      const builtins = await loadBuiltinPatterns();
      if (!alive) return;
      setPatterns(mergePatterns(builtins));
      setDataSources(getDataSources());
    };
    void refresh();
    return onStoreChange(() => {
      // builtins are cached; merge with latest user items synchronously
      void loadBuiltinPatterns().then((b) => alive && setPatterns(mergePatterns(b)));
      if (alive) setDataSources(getDataSources());
    });
  }, []);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming]);

  const mentionItems = useMemo<MentionItem[]>(
    () => [
      ...patterns.map(patternItem),
      ...components.map(componentItem),
      ...dataSources.map(dataItem),
    ],
    [patterns, components, dataSources],
  );

  const addMention = useCallback(
    (m: Mention) => {
      setMentions((prev) =>
        prev.some((x) => x.kind === m.kind && x.id === m.id) ? prev : [...prev, m],
      );
      // When inserted from the library (not the inline @ menu), append the token.
      setInput((prev) => (prev.includes(`@${m.label}`) ? prev : `${prev}${prev && !prev.endsWith(" ") ? " " : ""}@${m.label} `));
    },
    [],
  );

  const postTurn = useCallback(async (history: ChatMessage[]) => {
    setStreaming(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: toWire(history) }),
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      const pushBlock = (fn: (blocks: UiBlock[]) => UiBlock[]) => {
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last?.role !== "assistant") return prev;
          copy[copy.length - 1] = { role: "assistant", blocks: fn(last.blocks) };
          return copy;
        });
      };

      const handleEvent = (event: string, data: unknown) => {
        switch (event) {
          case "text": {
            const { delta } = data as { delta: string };
            pushBlock((blocks) => {
              const last = blocks[blocks.length - 1];
              if (last?.kind === "text")
                return [...blocks.slice(0, -1), { kind: "text", text: last.text + delta }];
              return [...blocks, { kind: "text", text: delta }];
            });
            break;
          }
          case "thinking": {
            const { delta } = data as { delta: string };
            pushBlock((blocks) => {
              const last = blocks[blocks.length - 1];
              if (last?.kind === "thinking")
                return [...blocks.slice(0, -1), { kind: "thinking", text: last.text + delta }];
              return [...blocks, { kind: "thinking", text: delta }];
            });
            break;
          }
          case "tool_use": {
            const { id, spec, caption } = data as { id: string; spec: ComponentSpec; caption?: string };
            pushBlock((blocks) => [...blocks, { kind: "ui", id, spec, caption }]);
            break;
          }
          case "tool_use_error": {
            const { error } = data as { error: string };
            pushBlock((blocks) => [...blocks, { kind: "error", text: `Spec validation failed:\n${error}` }]);
            break;
          }
          case "error": {
            const { message } = data as { message: string };
            pushBlock((blocks) => [...blocks, { kind: "error", text: message }]);
            break;
          }
        }
      };

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buffer.indexOf("\n\n")) !== -1) {
          const frame = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 2);
          let event = "message";
          let dataStr = "";
          for (const line of frame.split("\n")) {
            if (line.startsWith("event: ")) event = line.slice(7);
            else if (line.startsWith("data: ")) dataStr += line.slice(6);
          }
          if (dataStr) {
            try {
              handleEvent(event, JSON.parse(dataStr));
            } catch {
              /* ignore malformed frame */
            }
          }
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setMessages((prev) => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        if (last?.role !== "assistant") return prev;
        copy[copy.length - 1] = { role: "assistant", blocks: [...last.blocks, { kind: "error", text: msg }] };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  }, []);

  const send = useCallback(
    (rawText: string) => {
      const text = rawText.trim();
      if (!text || streaming) return;

      const active = reconcileMentions(text, mentions);
      const context = buildMentionContext(active, { patterns, components, dataSources });

      const pending = pendingToolUses(messages);
      const userBlocks: UserBlock[] = pending.map((p) => ({
        kind: "tool_result" as const,
        tool_use_id: p.id,
        label: "User sent a new message instead.",
        payload: { event: "dismissed" },
      }));
      // `display` is the visible text; `text` (sent to model) carries context.
      userBlocks.push({ kind: "text", text: text + context, display: text });

      const consumed = new Set(pending.map((p) => p.id));
      const base = markConsumed(messages, consumed);
      const next: ChatMessage[] = [
        ...base,
        { role: "user", blocks: userBlocks },
        { role: "assistant", blocks: [] },
      ];
      setMessages(next);
      setInput("");
      setMentions([]);
      void postTurn(next.slice(0, -1));
    },
    [messages, mentions, patterns, components, dataSources, streaming, postTurn],
  );

  const handleCanvasEvent = useCallback(
    (e: EmittedEvent, toolUseId: string) => {
      if (streaming) return;
      const pending = pendingToolUses(messages);
      if (!pending.some((p) => p.id === toolUseId)) return;

      const payload: Record<string, unknown> = { event: e.event, handler: e.handler, component: e.component };
      if (e.detail !== undefined) payload.detail = e.detail;

      const userBlocks: UserBlock[] = pending.map((p) =>
        p.id === toolUseId
          ? { kind: "tool_result" as const, tool_use_id: p.id, label: `${e.handler || e.event} · ${e.component}`, payload }
          : { kind: "tool_result" as const, tool_use_id: p.id, label: "Dismissed", payload: { event: "dismissed" } },
      );
      const consumed = new Set(pending.map((p) => p.id));
      const base = markConsumed(messages, consumed);
      const next: ChatMessage[] = [
        ...base,
        { role: "user", blocks: userBlocks },
        { role: "assistant", blocks: [] },
      ];
      setMessages(next);
      void postTurn(next.slice(0, -1));
    },
    [messages, streaming, postTurn],
  );

  // ---- pattern save / preview ---------------------------------------------

  const openSaveModal = useCallback((spec: ComponentSpec) => {
    setSaveTarget(spec);
    setSaveName("");
    setSaveDesc("");
  }, []);

  const confirmSave = useCallback(() => {
    if (!saveTarget || !saveName.trim()) return;
    savePattern({
      name: saveName.trim(),
      description: saveDesc.trim() || "Saved from the workspace.",
      category: "Saved",
      spec: saveTarget,
    });
    setSaveTarget(null);
    toast.success(`Saved “${saveName.trim()}” to your patterns`);
  }, [saveTarget, saveName, saveDesc]);

  // Preview a library pattern by injecting it as a synthetic assistant UI block.
  const previewPattern = useCallback((p: Pattern) => {
    const id = `preview_${p.id}_${messages.length}`;
    setMessages((prev) => [
      ...prev,
      { role: "user", blocks: [{ kind: "text", text: `Preview pattern: ${p.name}`, display: `Preview pattern: ${p.name}` }] },
      { role: "assistant", blocks: [{ kind: "ui", id, spec: p.spec, caption: `${p.name} (pattern preview)`, consumed: true }] },
    ]);
  }, [messages.length]);

  const current = latestSpec(messages);

  return (
    <div className="workspace-grid">
      <LibraryPanel
        patterns={patterns}
        components={components}
        dataSources={dataSources}
        onMention={addMention}
        onPreviewPattern={previewPattern}
        onDeletePattern={(id) => {
          deletePattern(id);
          toast("Pattern deleted");
        }}
      />

      <div className="workspace-chat">
        <div className="thread" ref={threadRef}>
          {messages.length === 0 && (
            <div className="workspace-empty">
              <p className="workspace-empty-lead">
                Describe an app and the agent composes it with cre8-wc. Use{" "}
                <strong>@</strong> to reference patterns, components or data.
              </p>
              <div className="workspace-starters">
                {STARTERS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="workspace-starter">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`msg msg-${m.role}`}>
              <span className="role">{m.role}</span>
              {m.role === "user"
                ? m.blocks.map((b, j) => {
                    if (b.kind === "text")
                      return (
                        <div key={j} className="bubble">
                          {renderMentions(b.display ?? b.text)}
                        </div>
                      );
                    return (
                      <div key={j} className="bubble bubble-action">
                        <div className="action-label">{b.label}</div>
                        <pre className="action-payload">{JSON.stringify(b.payload, null, 2)}</pre>
                      </div>
                    );
                  })
                : m.blocks.map((b, j) => {
                    if (b.kind === "text")
                      return (
                        <div key={j} className="bubble">
                          {b.text}
                        </div>
                      );
                    if (b.kind === "thinking")
                      return (
                        <div key={j} className="bubble thinking">
                          {b.text}
                        </div>
                      );
                    if (b.kind === "error")
                      return (
                        <pre key={j} className="a2ui-canvas-error">
                          {b.text}
                        </pre>
                      );
                    // ui block — shown in the renderer, marked inline in the thread
                    return (
                      <div key={j} className="bubble bubble-rendered">
                        {b.caption ? b.caption : "Composed UI"}
                        <span className="bubble-rendered-tag">→ renderer</span>
                      </div>
                    );
                  })}
            </div>
          ))}
          {streaming && <div className="workspace-streaming">agent is working…</div>}
        </div>

        <div className="workspace-composer">
          <MentionInput
            value={input}
            onChange={setInput}
            onSend={() => send(input)}
            onAddMention={addMention}
            items={mentionItems}
            disabled={streaming}
          />
        </div>
      </div>

      <AppRenderer
        spec={current?.spec ?? null}
        streaming={streaming}
        onEvent={(e) => current && handleCanvasEvent(e, current.id)}
        onSave={openSaveModal}
      />

      <Modal
        open={saveTarget !== null}
        title="Save as pattern"
        description="Store the current UI in your library to @-mention and reuse later."
        onClose={() => setSaveTarget(null)}
        footer={
          <>
            <button type="button" className="btn btn--ghost" onClick={() => setSaveTarget(null)}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={confirmSave}
              disabled={!saveName.trim()}
            >
              Save pattern
            </button>
          </>
        }
      >
        <div className="modal-field">
          <label htmlFor="pattern-name">Name</label>
          <input
            id="pattern-name"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            placeholder="e.g. Orders table"
            onKeyDown={(e) => {
              if (e.key === "Enter" && saveName.trim()) confirmSave();
            }}
          />
        </div>
        <div className="modal-field">
          <label htmlFor="pattern-desc">Description</label>
          <input
            id="pattern-desc"
            value={saveDesc}
            onChange={(e) => setSaveDesc(e.target.value)}
            placeholder="Optional — what is this pattern for?"
          />
        </div>
      </Modal>
    </div>
  );
}

// Highlight @tokens in the visible user bubble.
function renderMentions(text: string): React.ReactNode {
  const parts = text.split(/(@[A-Za-z0-9_-]+)/g);
  return parts.map((part, i) =>
    /^@[A-Za-z0-9_-]+$/.test(part) ? (
      <span key={i} className="mention-token">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}
