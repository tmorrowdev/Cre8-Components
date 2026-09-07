import { describe, it, expect } from "vitest";
import { specToIframeSrcDoc, assembleReportHtml } from "./iframe-runtime";

const SPEC = { component: "cre8-chart", props: { type: "bar", data: { labels: ["A"], datasets: [{ label: "x", data: [1] }] } } };

describe("specToIframeSrcDoc", () => {
  const html = specToIframeSrcDoc({ runtimeUrl: "/api/a2ui-runtime", cdnUrl: "/api/cre8-wc-cdn", tokensUrl: "/api/cre8-wc-tokens" });
  it("is a full html doc", () => {
    expect(html).toMatch(/<html/i);
    expect(html).toContain('id="root"');
  });
  it("imports the runtime and cdn by url", () => {
    expect(html).toContain("/api/a2ui-runtime");
    expect(html).toContain("/api/cre8-wc-cdn");
  });
  it("loads the design tokens stylesheet (so components get cre8 styles)", () => {
    expect(html).toContain('<link rel="stylesheet" href="/api/cre8-wc-tokens">');
  });
  it("contains the postMessage bridge and ready signal", () => {
    expect(html).toContain("a2ui-event");
    expect(html).toContain('type: "ready"');
  });
  it("sanitizes event detail before postMessage (structured-clone safety)", () => {
    // Chart.js event detail holds functions/DOM/circular refs that would throw
    // DataCloneError if posted raw. The bridge must reduce it to JSON-safe data.
    expect(html).toContain("safeDetail");
    expect(html).toContain("detail: safeDetail(evt.detail)");
  });
  it("does NOT inline a spec (spec arrives via postMessage)", () => {
    expect(html).not.toContain("cre8-chart");
  });
});

describe("assembleReportHtml", () => {
  it("served mode references runtime + tokens urls", () => {
    const html = assembleReportHtml(SPEC, { inline: false, runtimeUrl: "/api/a2ui-runtime", cdnUrl: "/api/cre8-wc-cdn", tokensUrl: "/api/cre8-wc-tokens" });
    expect(html).toContain("/api/a2ui-runtime");
    expect(html).toContain("/api/cre8-wc-tokens");
    expect(html).toContain("cre8-chart"); // report inlines the spec
  });
  it("inline mode embeds provided runtime + cdn + catalog + tokens text", () => {
    const html = assembleReportHtml(SPEC, {
      inline: true,
      cdnText: "/*CDN_BUNDLE*/",
      runtimeText: "/*A2UI_RUNTIME*/",
      tokensText: "/*DESIGN_TOKENS*/",
    });
    expect(html).toContain("/*CDN_BUNDLE*/");
    expect(html).toContain("/*A2UI_RUNTIME*/");
    expect(html).toContain("/*DESIGN_TOKENS*/");
    expect(html).toContain("cre8-chart");
    expect(html).not.toContain("/api/"); // fully self-contained
  });
});
