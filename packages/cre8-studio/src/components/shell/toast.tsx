"use client";

import { useEffect, useState } from "react";

export type ToastKind = "success" | "error" | "info";
export interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
}

// Tiny event-based toast bus — no context/provider needed; any module can call
// toast(). The viewport (mounted once in AppShell) renders the queue.
type Listener = (t: Toast) => void;
const listeners = new Set<Listener>();
let seq = 1;

export function toast(message: string, kind: ToastKind = "info") {
  const t: Toast = { id: seq++, kind, message };
  listeners.forEach((l) => l(t));
}
toast.success = (m: string) => toast(m, "success");
toast.error = (m: string) => toast(m, "error");

const ICONS: Record<ToastKind, string> = {
  success: "✓",
  error: "!",
  info: "i",
};

export function ToastViewport() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => {
    const onToast: Listener = (t) => {
      setItems((prev) => [...prev, t]);
      const ttl = t.kind === "error" ? 6000 : 3500;
      window.setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== t.id));
      }, ttl);
    };
    listeners.add(onToast);
    return () => {
      listeners.delete(onToast);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="toast-viewport" role="status" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className={`toast toast--${t.kind}`}>
          <span className={`toast-icon toast-icon--${t.kind}`}>{ICONS[t.kind]}</span>
          <span className="toast-msg">{t.message}</span>
          <button
            type="button"
            className="toast-close"
            aria-label="Dismiss"
            onClick={() => setItems((prev) => prev.filter((x) => x.id !== t.id))}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
