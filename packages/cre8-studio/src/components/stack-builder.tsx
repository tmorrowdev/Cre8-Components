"use client";

import { useCallback, useRef, useState } from "react";

const BUILDER_URL = process.env.NEXT_PUBLIC_CRE8_APPS_URL ?? "http://localhost:8001";

type Phase = "idle" | "running" | "live" | "updating" | "error";
type Message = { role: "user" | "assistant"; text: string; type?: "ui_preview"; html?: string };

export default function StackBuilder() {
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [appUrl, setAppUrl] = useState<string | null>(null);
  const [statusText, setStatusText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const appendAssistantText = useCallback((delta: string) => {
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last?.role === "assistant" && !last.type) {
        return [...prev.slice(0, -1), { ...last, text: last.text + delta }];
      }
      return [...prev, { role: "assistant", text: delta }];
    });
  }, []);

  const appendChartPreview = useCallback((html: string) => {
    setMessages((prev) => [...prev, { role: "assistant", text: "", type: "ui_preview", html }]);
  }, []);

  const send = useCallback(async () => {
    const prompt = input.trim();
    if (!prompt || phase === "running" || phase === "updating") return;

    setMessages((prev) => [...prev, { role: "user", text: prompt }]);
    setInput("");
    setPhase(sessionId ? "updating" : "running");
    setErrorMsg("");
    abortRef.current = new AbortController();

    try {
      const res = await fetch(`${BUILDER_URL}/api/stack`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, session_id: sessionId, history: messages }),
        signal: abortRef.current.signal,
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
          let event = "message";
          let dataStr = "";
          for (const line of frame.split("\n")) {
            if (line.startsWith("event: ")) event = line.slice(7).trim();
            else if (line.startsWith("data: ")) dataStr += line.slice(6);
          }
          if (!dataStr) continue;

          let data: Record<string, unknown>;
          try { data = JSON.parse(dataStr); } catch { continue; }

          switch (event) {
            case "agent_start":
              setStatusText(String(data.agent ?? ""));
              break;
            case "text":
              appendAssistantText(String(data.delta ?? ""));
              break;
            case "ui_preview":
              if (data.html) appendChartPreview(String(data.html));
              break;
            case "app_ready":
              setSessionId(String(data.session_id));
              setAppUrl(String(data.url));
              setPhase("live");
              setStatusText("Live");
              break;
            case "app_updated":
              setPhase("live");
              setStatusText("Updated");
              break;
            case "done":
              if (phase !== "live") setPhase("live");
              break;
            case "error":
              setErrorMsg(String(data.message ?? "Unknown error"));
              setPhase("error");
              break;
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setErrorMsg(err instanceof Error ? err.message : String(err));
        setPhase("error");
      }
    }
  }, [input, phase, sessionId, messages, appendAssistantText, appendChartPreview]);

  const busy = phase === "running" || phase === "updating";

  return (
    <div className="stack-layout">
      {/* Chat panel */}
      <div className="stack-chat">
        <div className="stack-messages">
          {messages.map((m, i) => (
            <div key={i} className={`stack-message stack-message--${m.role}`}>
              <span className="stack-message-role">{m.role === "user" ? "You" : "AI"}</span>
              {m.type === "ui_preview" ? (
                <iframe
                  srcDoc={m.html ?? ""}
                  style={{ width: "100%", height: 320, border: "none", borderRadius: 8 }}
                  sandbox="allow-scripts"
                  title="Data preview"
                />
              ) : (
                <p className="stack-message-text">{m.text}</p>
              )}
            </div>
          ))}
          {phase === "error" && (
            <div className="stack-message stack-message--error">
              <p className="stack-message-text">{errorMsg}</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {statusText && (
          <div className="stack-status">
            {busy && <span className="stack-spinner" />}
            {statusText}
          </div>
        )}

        <form
          className="stack-composer"
          onSubmit={(e) => { e.preventDefault(); send(); }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
            }}
            placeholder={sessionId ? "Describe a change…" : "Describe the app you want to build…"}
            disabled={busy}
            rows={2}
          />
          <button type="submit" disabled={busy || !input.trim()}>
            {busy ? "…" : sessionId ? "Update" : "Build"}
          </button>
        </form>
      </div>

      {/* Preview panel */}
      <div className="stack-preview">
        {!appUrl && (
          <div className="stack-preview-placeholder">
            {phase === "running" ? "Building your app…" : "Describe an app to get started"}
          </div>
        )}
        {appUrl && (
          <iframe
            src={appUrl}
            className="stack-iframe"
            title="Live app preview"
            allow="same-origin"
          />
        )}
      </div>
    </div>
  );
}