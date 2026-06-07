import { describe, it, expect } from "vitest";
import { classifyHandler, sortRows, buildUiEvent } from "./ui-events";
import type { EmittedEvent } from "@tmorrow/cre8-wc/a2ui";

function evt(handler: string, detail: unknown = {}): EmittedEvent {
  return {
    component: "cre8-chart",
    path: "$",
    event: "cre8-chart-click",
    handler,
    detail,
    nativeEvent: new Event("cre8-chart-click"),
  };
}

describe("classifyHandler", () => {
  it("routes local: handlers to local", () => {
    expect(classifyHandler("local:sort")).toEqual({ kind: "local", action: "sort", arg: undefined });
  });
  it("parses local handler arg", () => {
    expect(classifyHandler("local:filter:active")).toEqual({ kind: "local", action: "filter", arg: "active" });
  });
  it("routes agent: handlers to agent", () => {
    expect(classifyHandler("agent:drilldown")).toEqual({ kind: "agent", intent: "drilldown" });
  });
  it("treats unknown handler as agent", () => {
    expect(classifyHandler("whatever")).toEqual({ kind: "agent", intent: "whatever" });
  });
});

describe("sortRows", () => {
  const rows = [{ n: "b", v: 2 }, { n: "a", v: 3 }, { n: "c", v: 1 }];
  it("sorts ascending by key", () => {
    expect(sortRows(rows, "v", "asc").map((r) => r.v)).toEqual([1, 2, 3]);
  });
  it("sorts descending by key", () => {
    expect(sortRows(rows, "v", "desc").map((r) => r.v)).toEqual([3, 2, 1]);
  });
  it("sorts strings", () => {
    expect(sortRows(rows, "n", "asc").map((r) => r.n)).toEqual(["a", "b", "c"]);
  });
  it("does not mutate input", () => {
    const copy = [...rows];
    sortRows(rows, "v", "asc");
    expect(rows).toEqual(copy);
  });
});

describe("buildUiEvent", () => {
  it("packages an agent escalation payload", () => {
    const payload = buildUiEvent(evt("agent:drilldown", { index: 2, label: "Mar" }));
    expect(payload).toEqual({
      intent: "drilldown",
      component: "cre8-chart",
      detail: { index: 2, label: "Mar" },
    });
  });
});
