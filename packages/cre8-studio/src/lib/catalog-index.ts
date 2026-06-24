import catalog from "@tmorrow/cre8-wc/a2ui/catalog.json" with { type: "json" };

type CatalogJson = {
  $defs: {
    components: Record<
      string,
      {
        description?: string;
        properties?: {
          props?: {
            properties?: Record<string, { description?: string; enum?: unknown[]; const?: unknown; type?: unknown }>;
          };
          children?: unknown;
          slots?: { properties?: Record<string, { description?: string }> };
          events?: { properties?: Record<string, { description?: string }> };
        };
      }
    >;
  };
};

export function buildCatalogSummary(): string {
  const c = catalog as unknown as CatalogJson;
  const entries = Object.entries(c.$defs?.components ?? {});
  const lines: string[] = [];
  for (const [name, def] of entries) {
    const desc = (def.description ?? "").split("\n")[0].trim().slice(0, 120);
    const props = def.properties?.props?.properties ?? {};
    const propKeys = Object.keys(props);
    const propSummary = propKeys
      .slice(0, 8)
      .map((k) => {
        const p = props[k] ?? {};
        if (Array.isArray(p.enum)) return `${k}:${p.enum.slice(0, 4).join("|")}`;
        if (p.const !== undefined) return `${k}=${JSON.stringify(p.const)}`;
        return k;
      })
      .join(", ");
    const slots = Object.keys(def.properties?.slots?.properties ?? {});
    const events = Object.keys(def.properties?.events?.properties ?? {});
    // Post-refactor the default content slot is explicit: a component either has
    // a top-level `children` array OR a named `slots.default` — never both, and
    // the two are NOT interchangeable. Spell this out so the model never puts
    // body content in `children` for a slot-based component.
    const acceptsChildren = !!def.properties?.children;

    let line = `- ${name}`;
    if (desc) line += ` — ${desc}`;
    if (propSummary) line += `\n    props: ${propSummary}`;
    if (acceptsChildren) {
      line += `\n    content: children[]`;
    } else if (slots.includes("default")) {
      line += `\n    content: slots.default  (NOT children)`;
    }
    if (slots.length) line += `\n    slots: ${slots.join(", ")}`;
    if (events.length) line += `\n    events: ${events.join(", ")}`;
    lines.push(line);
  }
  return lines.join("\n");
}

export { catalog };
