import type { ComponentSpec } from "@tmorrow/cre8-wc/a2ui";

export interface Panel {
  id: string;
  title: string;
  spec: ComponentSpec;
  status: "loading" | "ready" | "error";
  flagged: boolean;
  origin?: string;
  action?: string;
  detail?: unknown;
}

export function dedupeKey(action: string, detail: unknown): string {
  return `${action}::${JSON.stringify(detail ?? null)}`;
}

export function addPanel(panels: Panel[], next: Panel): Panel[] {
  if (next.action) {
    const k = dedupeKey(next.action, next.detail);
    if (panels.some((p) => p.action && dedupeKey(p.action, p.detail) === k)) return panels;
  }
  return [...panels, next];
}

export function flagPanel(panels: Panel[], id: string): Panel[] {
  return panels.map((p) => (p.id === id ? { ...p, flagged: !p.flagged } : p));
}

export interface ExploreRequest {
  dataset: string;
  action: string;
  detail: unknown;
  context: { path: string[]; flagged: Array<{ title: string; action?: string; detail?: unknown }> };
}

export function buildExploreRequest(
  dataset: string, action: string, detail: unknown, panels: Panel[], path: string[],
): ExploreRequest {
  return {
    dataset, action, detail,
    context: {
      path,
      flagged: panels.filter((p) => p.flagged).map((p) => ({ title: p.title, action: p.action, detail: p.detail })),
    },
  };
}
