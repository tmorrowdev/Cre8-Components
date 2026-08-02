import catalog from "@tmorrow/cre8-wc/a2ui/catalog.json" with { type: "json" };
import compactCatalog from "@tmorrow/cre8-wc/a2ui/catalog.compact.json" with { type: "json" };

type CatalogJson = {
  $defs: {
    components: Record<string, { description?: string }>;
  };
};

type CompactCatalogJson = {
  components: Array<{
    name: string;
    category: string;
    props?: Record<string, { type?: string | string[]; enum?: string[] }>;
    required?: string[];
    acceptsChildren?: boolean;
    slots?: string[];
    events?: string[];
  }>;
};

/**
 * The component list the model is shown.
 *
 * Built from the compact projection rather than by re-summarising the full
 * catalog. The previous implementation truncated props to the first 8 and enums
 * to the first 4, which hid 29% of props and 34% of enum values — and enum
 * values are the decoding constraint, so a hidden one is a value the model
 * cannot choose. `cre8-button.size` and `cre8-button.type` were entirely
 * invisible, meaning the model could not size a button or make a submit button.
 *
 * Descriptions still come from the full catalog: the compact projection drops
 * prose deliberately, but a one-line description is what makes a component
 * findable, and it is cheap.
 */
export function buildCatalogSummary(): string {
  const descriptions = (catalog as unknown as CatalogJson).$defs?.components ?? {};
  const { components } = compactCatalog as unknown as CompactCatalogJson;
  const lines: string[] = [];

  for (const component of components) {
    const desc = (descriptions[component.name]?.description ?? "")
      .split("\n")[0]
      .trim()
      .slice(0, 120);

    const props = component.props ?? {};
    const required = new Set(component.required ?? []);
    const propSummary = Object.keys(props)
      .map((key) => {
        const spec = props[key] ?? {};
        const marker = required.has(key) ? "*" : "";
        // Enum values are listed in full — truncating them is what made valid
        // values unreachable.
        if (spec.enum?.length) return `${key}${marker}:${spec.enum.join("|")}`;
        return `${key}${marker}`;
      })
      .join(", ");

    let line = `- ${component.name}`;
    if (desc) line += ` — ${desc}`;
    if (propSummary) line += `\n    props: ${propSummary}`;
    // A component takes either a top-level `children` array OR a named
    // `slots.default` — never both, and the two are NOT interchangeable. Spell
    // it out so the model never puts body content in the wrong one.
    if (component.acceptsChildren) {
      line += `\n    content: children[]`;
    } else if (component.slots?.includes("default")) {
      line += `\n    content: slots.default  (NOT children)`;
    }
    if (component.slots?.length) line += `\n    slots: ${component.slots.join(", ")}`;
    if (component.events?.length) line += `\n    events: ${component.events.join(", ")}`;
    lines.push(line);
  }

  return lines.join("\n");
}

export { catalog };
