"use client";
import { useEffect, useRef } from "react";
import { useState } from "react";
import type { ComponentSpec } from "@tmorrow/cre8-wc/a2ui";
import { specToIframeSrcDoc } from "@/lib/iframe-runtime";

const ORIGIN = "*";

export interface IframeEvent {
  handler: string;
  component: string;
  detail: unknown;
}

export function ExploreIframe({
  spec,
  onEvent,
}: {
  spec: ComponentSpec;
  onEvent: (e: IframeEvent) => void;
}) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(240);
  const readyRef = useRef(false);

  // Keep the latest spec/onEvent in refs so the message listener can stay
  // stable (mounted once) and never miss the one-shot "ready" handshake.
  const specRef = useRef(spec);
  const onEventRef = useRef(onEvent);
  useEffect(() => {
    specRef.current = spec;
    onEventRef.current = onEvent;
  });

  // Stable listener: subscribes once on mount. Avoids the window where an
  // inline onEvent identity change tears down the listener exactly as the
  // iframe posts "ready", which would stall the render handshake.
  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;
    const onMessage = (e: MessageEvent) => {
      if (e.source !== iframe.contentWindow) return;
      const d = e.data;
      if (d?.type === "ready") {
        readyRef.current = true;
        iframe.contentWindow?.postMessage(
          { type: "render", spec: specRef.current },
          ORIGIN,
        );
      } else if (d?.type === "resize" && typeof d.height === "number") {
        setHeight(Math.max(120, Math.min(2000, d.height + 8)));
      } else if (d?.type === "a2ui-event") {
        onEventRef.current({
          handler: d.handler,
          component: d.component,
          detail: d.detail,
        });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Re-post spec when it changes after ready (in-place re-render).
  useEffect(() => {
    if (readyRef.current) {
      ref.current?.contentWindow?.postMessage({ type: "render", spec }, ORIGIN);
    }
  }, [spec]);

  return (
    <iframe
      ref={ref}
      title="exploration view"
      sandbox="allow-scripts"
      srcDoc={specToIframeSrcDoc({
        runtimeUrl: "/api/a2ui-runtime",
        cdnUrl: "/api/cre8-wc-cdn",
        tokensUrl: "/api/cre8-wc-tokens",
      })}
      style={{ width: "100%", height, border: "none" }}
    />
  );
}
