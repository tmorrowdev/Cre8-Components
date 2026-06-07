import type { EmittedEvent } from "@tmorrow/cre8-wc/a2ui";

export type HandlerClass =
  | { kind: "local"; action: string; arg: string | undefined }
  | { kind: "agent"; intent: string };

export function classifyHandler(handler: string): HandlerClass {
  if (handler.startsWith("local:")) {
    const [, action, arg] = handler.split(":");
    return { kind: "local", action, arg };
  }
  if (handler.startsWith("agent:")) {
    return { kind: "agent", intent: handler.slice("agent:".length) };
  }
  return { kind: "agent", intent: handler };
}

export type SortDir = "asc" | "desc";

export function sortRows<T extends Record<string, unknown>>(
  rows: T[],
  key: string,
  dir: SortDir,
): T[] {
  const sorted = [...rows].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    if (typeof av === "number" && typeof bv === "number") return av - bv;
    return String(av).localeCompare(String(bv));
  });
  return dir === "desc" ? sorted.reverse() : sorted;
}

export interface UiEventPayload {
  intent: string;
  component: string;
  detail: unknown;
}

export function buildUiEvent(evt: EmittedEvent): UiEventPayload {
  const cls = classifyHandler(evt.handler);
  const intent = cls.kind === "agent" ? cls.intent : evt.handler;
  return { intent, component: evt.component, detail: evt.detail };
}
