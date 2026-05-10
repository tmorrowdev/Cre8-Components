"use client";

import { useEffect, useRef } from "react";
import {
  registerCatalog,
  render,
  type ComponentSpec,
  type EmittedEvent,
  type RegisteredCatalog,
} from "@tmorrow/cre8-wc/a2ui";
import catalogJson from "@tmorrow/cre8-wc/a2ui/catalog.json" with { type: "json" };

let cachedCatalog: RegisteredCatalog | null = null;
function getCatalog(): RegisteredCatalog {
  if (!cachedCatalog) {
    cachedCatalog = registerCatalog(
      catalogJson as unknown as Parameters<typeof registerCatalog>[0],
    );
  }
  return cachedCatalog;
}

let cdnPromise: Promise<unknown> | null = null;
function loadCdn(): Promise<unknown> {
  if (!cdnPromise) {
    cdnPromise = import("@tmorrow/cre8-wc/cdn");
  }
  return cdnPromise;
}

export function A2uiCanvas({
  spec,
  onEvent,
}: {
  spec: ComponentSpec;
  onEvent: (event: EmittedEvent) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const host = ref.current;
    if (!host) return;
    loadCdn()
      .then(() => {
        if (cancelled || !host) return;
        render(spec, getCatalog(), { root: host, onEvent });
      })
      .catch((err) => {
        if (cancelled || !host) return;
        host.innerHTML = "";
        const msg = err instanceof Error ? err.message : String(err);
        const pre = document.createElement("pre");
        pre.className = "a2ui-canvas-error";
        pre.textContent = `Render failed: ${msg}`;
        host.appendChild(pre);
      });
    return () => {
      cancelled = true;
    };
  }, [spec, onEvent]);

  return <div ref={ref} className="a2ui-canvas" />;
}
