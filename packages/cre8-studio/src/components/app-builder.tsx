"use client";

import { useCallback, useRef, useState } from "react";

const BUILDER_URL = process.env.NEXT_PUBLIC_CRE8_APPS_URL ?? "http://localhost:8001";

type Phase = "idle" | "ui" | "db" | "code" | "done" | "error";

type AgentLog = { agent: string; text: string };

function buildSrcdoc(componentHtml: string): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <link rel="stylesheet" href="/api/cre8-wc-tokens"/>
  <style>
    *,*::before,*::after{box-sizing:border-box}
    html,body{
      margin:0;padding:20px;
      background:var(--cre8-color-bg-default,#fff);
      color:var(--cre8-color-content-default,#111);
      font-family:var(--cre8-typography-body-default-font-family,system-ui,sans-serif);
      font-size:var(--cre8-typography-body-default-font-size,16px);
      line-height:var(--cre8-typography-body-default-line-height,1.5);
    }
  </style>
</head>
<body>
  ${componentHtml}
  <script type="module" src="/api/cre8-wc-cdn"></script>
</body>
</html>`;
}

export default function AppBuilder() {
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentAgent, setCurrentAgent] = useState("");
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [srcdoc, setSrcdoc] = useState<string | null>(null);
  const [schema, setSchema] = useState<unknown[] | null>(null);
  const [migration, setMigration] = useState("");
  const [pageTsx, setPageTsx] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"canvas" | "code" | "sql">("canvas");

  const abortRef = useRef<AbortController | null>(null);

  const appendLog = useCallback((agent: string, delta: string) => {
    setLogs((prev) => {
      const last = prev[prev.length - 1];
      if (last?.agent === agent) {
        return [...prev.slice(0, -1), { agent, text: last.text + delta }];
      }
      return [...prev, { agent, text: delta }];
    });
  }, []);

  const run = useCallback(async () => {
    if (!input.trim() || phase !== "idle") return;

    setPhase("ui");
    setCurrentAgent("");
    setLogs([]);
    setSrcdoc(null);
    setSchema(null);
    setMigration("");
    setPageTsx("");
    setErrorMsg("");

    abortRef.current = new AbortController();

    try {
      const res = await fetch(`${BUILDER_URL}/api/build`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
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
          try {
            data = JSON.parse(dataStr);
          } catch {
            continue;
          }

          switch (event) {
            case "agent_start": {
              const agent = data.agent as string;
              setCurrentAgent(agent);
              if (agent === "DBProvisionerAgent") setPhase("db");
              else if (agent === "CodeGeneratorAgent") setPhase("code");
              break;
            }
            case "text":
              appendLog(data.agent as string, data.delta as string);
              break;
            case "ui_ready": {
              const html = data.html as string | undefined;
              if (html) {
                setSrcdoc(buildSrcdoc(html));
                setActiveTab("canvas");
              }
              break;
            }
            case "db_schema":
              setSchema(data.schema as unknown[]);
              setMigration(data.migration as string);
              break;
            case "code_ready":
              setPageTsx(data.page_tsx as string);
              setActiveTab("code");
              break;
            case "done":
              setPhase("done");
              break;
            case "error":
              setErrorMsg(data.message as string);
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
  }, [input, phase, appendLog]);

  const reset = () => {
    abortRef.current?.abort();
    setPhase("idle");
    setCurrentAgent("");
    setLogs([]);
    setSrcdoc(null);
    setSchema(null);
    setMigration("");
    setPageTsx("");
    setErrorMsg("");
  };

  const running = phase !== "idle" && phase !== "done" && phase !== "error";

  return (
    <div className="builder">
      <form
        className="composer"
        onSubmit={(e) => {
          e.preventDefault();
          run();
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              run();
            }
          }}
          placeholder="Describe the app you want to build…"
          disabled={running}
          rows={2}
        />
        {running ? (
          <button type="button" onClick={reset} className="btn-stop">
            Stop
          </button>
        ) : (
          <button type="submit" disabled={!input.trim()}>
            Build
          </button>
        )}
      </form>

      {phase !== "idle" && (
        <div className="builder-body">
          <div className="pipeline-status">
            <Step label="Design UI" active={phase === "ui"} done={["db", "code", "done"].includes(phase)} />
            <Step label="Provision DB" active={phase === "db"} done={["code", "done"].includes(phase)} />
            <Step label="Generate Code" active={phase === "code"} done={phase === "done"} />
          </div>

          {phase === "error" && (
            <pre className="a2ui-canvas-error">{errorMsg}</pre>
          )}

          {(srcdoc || pageTsx || migration) && (
            <div className="output-tabs">
              <div className="tab-bar">
                <button
                  className={activeTab === "canvas" ? "tab active" : "tab"}
                  onClick={() => setActiveTab("canvas")}
                  disabled={!srcdoc}
                >
                  Preview
                </button>
                <button
                  className={activeTab === "code" ? "tab active" : "tab"}
                  onClick={() => setActiveTab("code")}
                  disabled={!pageTsx}
                >
                  page.tsx
                </button>
                <button
                  className={activeTab === "sql" ? "tab active" : "tab"}
                  onClick={() => setActiveTab("sql")}
                  disabled={!migration}
                >
                  Migration SQL
                </button>
              </div>

              {activeTab === "canvas" && srcdoc && (
                <iframe
                  className="preview-iframe"
                  srcDoc={srcdoc}
                  sandbox="allow-scripts allow-same-origin"
                  title="App preview"
                />
              )}
              {activeTab === "canvas" && !srcdoc && (
                <div className="builder-waiting">Building UI…</div>
              )}
              {activeTab === "code" && (
                <pre className="builder-code">{pageTsx}</pre>
              )}
              {activeTab === "sql" && (
                <pre className="builder-code">{migration}</pre>
              )}
            </div>
          )}

          {running && logs.length > 0 && (
            <details className="agent-logs">
              <summary>
                {currentAgent ? `${currentAgent} running…` : "Running…"}
              </summary>
              {logs.map((l, i) => (
                <div key={i} className="agent-log-entry">
                  <span className="agent-log-name">{l.agent}</span>
                  <pre className="agent-log-text">{l.text}</pre>
                </div>
              ))}
            </details>
          )}
        </div>
      )}
    </div>
  );
}

function Step({
  label,
  active,
  done,
}: {
  label: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div className={`pipeline-step ${active ? "active" : ""} ${done ? "done" : ""}`}>
      <span className="step-dot">{done ? "✓" : active ? "…" : "○"}</span>
      <span className="step-label">{label}</span>
    </div>
  );
}
