import { describe, it, expect } from "vitest";
import { addPanel, flagPanel, dedupeKey, buildExploreRequest, type Panel } from "./explore-canvas";

const base = (over: Partial<Panel> = {}): Panel => ({
  id: "p1", title: "t", spec: { component: "cre8-card" }, status: "ready", flagged: false, ...over,
});

describe("addPanel", () => {
  it("appends a panel", () => {
    expect(addPanel([], base()).length).toBe(1);
  });
  it("does not duplicate same action+detail", () => {
    const p = base({ id: "p1", action: "drilldown", detail: { category: "X" } });
    const dup = base({ id: "p2", action: "drilldown", detail: { category: "X" } });
    expect(addPanel([p], dup).length).toBe(1);
  });
});

describe("flagPanel", () => {
  it("toggles flagged", () => {
    const panels = [base({ id: "a" })];
    expect(flagPanel(panels, "a")[0].flagged).toBe(true);
    expect(flagPanel(flagPanel(panels, "a"), "a")[0].flagged).toBe(false);
  });
});

describe("dedupeKey", () => {
  it("keys by action+detail", () => {
    expect(dedupeKey("drilldown", { a: 1 })).toBe(dedupeKey("drilldown", { a: 1 }));
    expect(dedupeKey("drilldown", { a: 1 })).not.toBe(dedupeKey("drilldown", { a: 2 }));
  });
});

describe("buildExploreRequest", () => {
  it("assembles dataset/action/detail/context with path + flagged", () => {
    const panels = [base({ id: "a", title: "Rev by cat", flagged: true, action: "overview", detail: {} })];
    const req = buildExploreRequest("ecommerce", "drilldown", { category: "X" }, panels, ["overview"]);
    expect(req.dataset).toBe("ecommerce");
    expect(req.action).toBe("drilldown");
    expect(req.detail).toEqual({ category: "X" });
    expect(req.context.path).toContain("overview");
    expect(req.context.flagged[0].title).toBe("Rev by cat");
  });
});
