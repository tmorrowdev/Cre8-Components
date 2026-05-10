"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentSpec, EmittedEvent } from "@tmorrow/cre8-wc/a2ui";
import { A2uiCanvas } from "./a2ui-canvas";

type UiBlock =
  | { kind: "text"; text: string }
  | { kind: "thinking"; text: string }
  | { kind: "ui"; id: string; spec: ComponentSpec; caption?: string; consumed?: boolean }
  | { kind: "error"; text: string };

type UserBlock =
  | { kind: "text"; text: string }
  | {
      kind: "tool_result";
      tool_use_id: string;
      label: string;
      payload: Record<string, unknown>;
    };

type ChatMessage =
  | { role: "user"; blocks: UserBlock[] }
  | { role: "assistant"; blocks: UiBlock[] };

type WireContent =
  | { type: "text"; text: string }
  | {
      type: "tool_use";
      id: string;
      name: "render_ui";
      input: { spec: ComponentSpec; caption?: string };
    }
  | { type: "tool_result"; tool_use_id: string; content: string };

type WireMessage = { role: "user" | "assistant"; content: WireContent[] };

function toWire(messages: ChatMessage[]): WireMessage[] {
  return messages.map((m): WireMessage => {
    if (m.role === "user") {
      const content: WireContent[] = [];
      // tool_results must precede text within a user turn
      for (const b of m.blocks) {
        if (b.kind === "tool_result") {
          content.push({
            type: "tool_result",
            tool_use_id: b.tool_use_id,
            content: JSON.stringify(b.payload),
          });
        }
      }
      for (const b of m.blocks) {
        if (b.kind === "text" && b.text) {
          content.push({ type: "text", text: b.text });
        }
      }
      if (content.length === 0) content.push({ type: "text", text: "" });
      return { role: "user", content };
    }

    const content: WireContent[] = [];
    for (const b of m.blocks) {
      if (b.kind === "text" && b.text) content.push({ type: "text", text: b.text });
      if (b.kind === "ui") {
        content.push({
          type: "tool_use",
          id: b.id,
          name: "render_ui",
          input: { spec: b.spec, caption: b.caption },
        });
      }
    }
    if (content.length === 0) content.push({ type: "text", text: "" });
    return { role: "assistant", content };
  });
}

// Collect unconsumed ui tool_use blocks from the most recent assistant message.
function pendingToolUses(messages: ChatMessage[]): Array<{ id: string }> {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role === "user") break;
    if (m.role === "assistant") {
      return m.blocks
        .filter((b): b is Extract<UiBlock, { kind: "ui" }> => b.kind === "ui" && !b.consumed)
        .map((b) => ({ id: b.id }));
    }
  }
  return [];
}

// Mark the given tool_use_ids as consumed on the latest assistant message.
function markConsumed(messages: ChatMessage[], ids: Set<string>): ChatMessage[] {
  const copy = [...messages];
  for (let i = copy.length - 1; i >= 0; i--) {
    const m = copy[i];
    if (m.role === "assistant") {
      copy[i] = {
        role: "assistant",
        blocks: m.blocks.map((b) =>
          b.kind === "ui" && ids.has(b.id) ? { ...b, consumed: true } : b,
        ),
      };
      return copy;
    }
  }
  return copy;
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming]);

  const hasActiveCanvas = useMemo(() => pendingToolUses(messages).length > 0, [messages]);

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
              if (last?.kind === "text") {
                return [...blocks.slice(0, -1), { kind: "text", text: last.text + delta }];
              }
              return [...blocks, { kind: "text", text: delta }];
            });
            break;
          }
          case "thinking": {
            const { delta } = data as { delta: string };
            pushBlock((blocks) => {
              const last = blocks[blocks.length - 1];
              if (last?.kind === "thinking") {
                return [
                  ...blocks.slice(0, -1),
                  { kind: "thinking", text: last.text + delta },
                ];
              }
              return [...blocks, { kind: "thinking", text: delta }];
            });
            break;
          }
          case "tool_use": {
            const { id, spec, caption } = data as {
              id: string;
              spec: ComponentSpec;
              caption?: string;
            };
            pushBlock((blocks) => [...blocks, { kind: "ui", id, spec, caption }]);
            break;
          }
          case "tool_use_error": {
            const { error } = data as { error: string };
            pushBlock((blocks) => [
              ...blocks,
              { kind: "error", text: `Spec validation failed:\n${error}` },
            ]);
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
        copy[copy.length - 1] = {
          role: "assistant",
          blocks: [...last.blocks, { kind: "error", text: msg }],
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  }, []);

  // Text turn: if there's a pending canvas, dismiss it with a synthetic tool_result
  // so Claude's tool_use still has a matching tool_result before we add the text.
  const sendText = useCallback(
    (userText: string) => {
      const pending = pendingToolUses(messages);
      const userBlocks: UserBlock[] = [];
      for (const p of pending) {
        userBlocks.push({
          kind: "tool_result",
          tool_use_id: p.id,
          label: "User didn't interact — sent a new message instead.",
          payload: { event: "dismissed" },
        });
      }
      userBlocks.push({ kind: "text", text: userText });

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
    [messages, postTurn],
  );

  const handleCanvasEvent = useCallback(
    (e: EmittedEvent, toolUseId: string) => {
      if (streaming) return;
      const pending = pendingToolUses(messages);
      if (!pending.some((p) => p.id === toolUseId)) return; // stale / already consumed

      const payload: Record<string, unknown> = {
        event: e.event,
        handler: e.handler,
        component: e.component,
      };
      if (e.detail !== undefined) payload.detail = e.detail;

      const userBlocks: UserBlock[] = pending.map((p) =>
        p.id === toolUseId
          ? {
              kind: "tool_result",
              tool_use_id: p.id,
              label: `${e.handler || e.event} · ${e.component}`,
              payload,
            }
          : {
              kind: "tool_result",
              tool_use_id: p.id,
              label: "Dismissed",
              payload: { event: "dismissed" },
            },
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
    [messages, postTurn, streaming],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = input.trim();
    if (!v || streaming) return;
    setInput("");
    sendText(v);
  };

  return (
    <>
      <div className="thread" ref={threadRef}>
        {messages.length === 0 && (
          <div className="msg msg-assistant">
            <span className="role">assistant</span>
            <div className="bubble">
              Try: <em>"build me a contact form with name, email, and a submit button"</em>{" "}
              or <em>"show me a 3-card product gallery"</em>.
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
                        {b.text}
                      </div>
                    );
                  return (
                    <div key={j} className="bubble bubble-action">
                      <div className="action-label">{b.label}</div>
                      <pre className="action-payload">
                        {JSON.stringify(b.payload, null, 2)}
                      </pre>
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
                  return (
                    <div key={j}>
                      {b.caption && <div className="bubble">{b.caption}</div>}
                      <A2uiCanvas
                        spec={b.spec}
                        onEvent={(e) => handleCanvasEvent(e, b.id)}
                      />
                      {b.consumed && <div className="canvas-consumed">Submitted</div>}
                    </div>
                  );
                })}
          </div>
        ))}
      </div>
      <form className="composer" onSubmit={onSubmit}>
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
              ? "Claude is responding…"
              : hasActiveCanvas
                ? "Interact above, or type to send a new message…"
                : "Ask for a UI…"
          }
          disabled={streaming}
        />
        <button type="submit" disabled={streaming || !input.trim()}>
          Send
        </button>
      </form>
    </>
  );
}
