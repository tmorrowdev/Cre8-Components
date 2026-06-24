"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { BrandTheme } from "@/lib/a2ui-demo/types";
import { setTheme as persistTheme, getTheme } from "@/lib/a2ui-demo/store";
import { applyTheme, scopedThemeCss } from "@/lib/a2ui-demo/theme";
import { readableOn } from "@/lib/a2ui-demo/ramp";
import { BRAND_PREVIEW_SPEC } from "@/lib/a2ui-demo/preview-spec";
import { A2uiCanvas } from "@/components/a2ui-canvas";

type Status = "idle" | "loading" | "ready" | "error";

const PREVIEW_SELECTOR = "#brand-preview-root";

export default function BrandExtractor() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [color, setColor] = useState("#7C3AED");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [theme, setThemeState] = useState<BrandTheme | null>(null);
  const [candidates, setCandidates] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const extract = useCallback(
    async (payload: { url?: string; primary?: string }) => {
      setStatus("loading");
      setError("");
      setSaved(false);
      try {
        const res = await fetch("/api/brand-extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, name: name || undefined }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
        const t = json.theme as BrandTheme;
        t.createdAt = Date.now();
        setThemeState(t);
        setColor(t.primary);
        setCandidates((json.candidates as string[]) ?? []);
        setStatus("ready");
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        setStatus("error");
      }
    },
    [name],
  );

  const onSubmitUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    void extract({ url: url.trim() });
  };

  const save = useCallback(() => {
    if (!theme) return;
    persistTheme(theme);
    applyTheme(theme);
    setSaved(true);
  }, [theme]);

  const clearTheme = useCallback(() => {
    persistTheme(null);
    applyTheme(null);
    setThemeState(null);
    setStatus("idle");
    setSaved(false);
  }, []);

  // Scoped preview CSS so the comparison reflects the candidate theme without
  // mutating the rest of the page until the user saves.
  const previewCss = useMemo(
    () => (theme ? scopedThemeCss(theme, PREVIEW_SELECTOR) : ""),
    [theme],
  );

  const existing = getTheme();

  return (
    <div className="brand-extractor">
      <div className="brand-controls">
        <section className="brand-card">
          <h3>From a website</h3>
          <p className="brand-hint">
            We fetch the page and pull its dominant brand color + font.
          </p>
          <form className="brand-row" onSubmit={onSubmitUrl}>
            <input
              type="text"
              placeholder="stripe.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={status === "loading"}
            />
            <button type="submit" disabled={status === "loading" || !url.trim()}>
              {status === "loading" ? "Extracting…" : "Extract"}
            </button>
          </form>
        </section>

        <section className="brand-card">
          <h3>Or pick a color</h3>
          <p className="brand-hint">Generate a full token ramp from one brand color.</p>
          <div className="brand-row">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="brand-color-input"
              aria-label="Brand color"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="brand-hex-input"
              aria-label="Brand hex"
            />
            <button type="button" onClick={() => extract({ primary: color })}>
              Generate
            </button>
          </div>
          <div className="brand-row">
            <input
              type="text"
              placeholder="Theme name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </section>

        {existing && (
          <section className="brand-card brand-card--active">
            <h3>Active theme</h3>
            <div className="brand-active-row">
              <span className="brand-dot" style={{ background: existing.primary }} />
              <span>{existing.name}</span>
              <button type="button" className="brand-link-btn" onClick={clearTheme}>
                Reset to cre8 default
              </button>
            </div>
          </section>
        )}
      </div>

      {status === "error" && <pre className="a2ui-canvas-error">{error}</pre>}

      {theme && (
        <div className="brand-result">
          <style dangerouslySetInnerHTML={{ __html: previewCss }} />

          <div className="brand-meta">
            <div className="brand-meta-head">
              <h2>{theme.name}</h2>
              {theme.source && <span className="brand-source">from {theme.source}</span>}
            </div>

            <div className="brand-ramp">
              {theme.ramp.map((hex, i) => (
                <div key={i} className="ramp-step" style={{ background: hex }} title={hex}>
                  <span style={{ color: readableOn(hex) }}>{i === 5 ? "★" : ""}</span>
                </div>
              ))}
            </div>

            <div className="brand-facts">
              <span>
                <strong>Primary</strong> {theme.primary}
              </span>
              {theme.fontFamily && (
                <span>
                  <strong>Font</strong> {theme.fontFamily}
                </span>
              )}
            </div>

            {candidates.length > 1 && (
              <div className="brand-candidates">
                <span className="brand-hint">Other colors found — click to use:</span>
                <div className="brand-swatches">
                  {candidates.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className="brand-swatch"
                      style={{ background: c }}
                      title={c}
                      onClick={() => extract({ primary: c })}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="brand-actions">
              <button type="button" className="brand-primary-btn" onClick={save}>
                {saved ? "✓ Saved & applied" : "Apply theme"}
              </button>
              {saved && (
                <button
                  type="button"
                  className="brand-primary-btn brand-go-btn"
                  onClick={() => router.push("/a2ui/workspace")}
                >
                  Open workspace →
                </button>
              )}
            </div>
          </div>

          <div className="brand-preview">
            <div className="brand-preview-label">Live preview</div>
            <div id="brand-preview-root" className="brand-preview-frame">
              <A2uiCanvas spec={BRAND_PREVIEW_SPEC} onEvent={() => {}} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
