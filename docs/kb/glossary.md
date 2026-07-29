---
title: Glossary
intents:
  - "what does this term mean"
  - "define a2ui"
  - "define semantic token"
  - "what is a compound component"
see_also: [00-orientation, 03-token-theming, 04-a2ui]
---

# Glossary

Terms as this system uses them. Where a term has a broader industry meaning, the
cre8-specific narrowing is noted, because that narrowing is usually where
confusion starts.

**A2UI** — Two things share this name. **cre8 A2UI** is the local dialect in
`packages/cre8-wc/a2ui/`: a nested `ComponentSpec` tree an agent emits and a
renderer validates against a catalog. **A2UI Protocol** is the published
specification at a2ui.org, which uses a flat, id-keyed model with streamed
updates. They are related, not interchangeable — see
[Conformance with a2ui.org v1.0](04-a2ui.md#conformance-with-a2uiorg-v10).

**Attribute vs property** — An attribute is the string in the HTML
(`variant="primary"`); a property is the JavaScript value on the element instance
(`el.data = [...]`). Attributes can only hold strings, which is why complex values
must be set as properties. The A2UI renderer decides between them using the
catalog's `x-kind` annotation; see [How props actually reach the element](04-a2ui.md#how-props-actually-reach-the-element).

**Brand** — A named set of token values under
`design-tokens/brands/<name>/`, selecting a design language. Distinct from a
**mode** (light/dark), which is a lighting condition within a brand. Fifteen
brands ship today.

**Catalog** — `a2ui/catalog.json`. A JSON Schema 2020-12 document describing every
component's props, enums, slots, and events. It is what `validateSpec` checks
against and what `get_a2ui_catalog` serves to agents.

**Compound component** — A parent plus children that only work together, where
children are named after the parent: `cre8-accordion` / `cre8-accordion-item`,
`cre8-table` / `cre8-table-row` / `cre8-table-cell`. Children must be direct
children of the parent. See [Compound components](01-components.md#compound-components).

**CSS shadow part** — An internal element the component author explicitly exposed
for styling, targeted with `::part(name)`. One of the three sanctioned ways to
reach past the shadow boundary; see
[Styling across the shadow boundary](03-token-theming.md#styling-across-the-shadow-boundary).

**Custom element** — A browser-native component defined via
`customElements.define()`. cre8 components self-register on import, guarded so a
double import does not throw.

**Design token** — A named design decision stored as a CSS custom property
(`--cre8-*`). Layered in three tiers: primitive, semantic, component. See
[The three tiers](03-token-theming.md#the-three-tiers).

**Form-associated custom element** — A custom element with
`static formAssociated = true`, which the browser treats as a real form control:
it participates in submission and reset — but **not** constraint validation,
which cre8 does not wire up ([Forms that behave](02-composition-patterns.md#forms-that-behave)).
`Cre8FormElement` is the
base class that provides this. See [The two base classes](01-components.md#the-two-base-classes).

**Handler name** — In an A2UI spec, the *string* an event maps to
(`"upgrade-clicked"`). Never code. The hosting application resolves names against
an allowlist it controls; this is the security boundary of the whole approach. See
[Events and the return path](04-a2ui.md#events-and-the-return-path).

**`inverted`** — A per-component prop for placing a component on a dark
background within an otherwise light page. **Not** dark mode. See
[Dark mode and modes in general](03-token-theming.md#dark-mode-and-modes-in-general).

**Manifest** — A generated machine-readable description of the library.
`mcp-manifest.json` (web components), `react-manifest.json` (React wrappers). The
MCP server and the KB's derived pages both read from these; they are the closest
thing to a source of truth about the public API.

**MCP** — Model Context Protocol, the interface `packages/cre8-mcp` implements to
expose the catalog to agents. Seven tools; see
[The tool surface](05-ai-fluency.md#the-tool-surface).

**Presentational component** — A component with no business logic, no data
fetching, and no application state. cre8's hard constraint, not a preference: it
is what makes components expressible as A2UI data. See
[The mental model](00-orientation.md#the-mental-model).

**Primitive token** — Tier 1. A raw value with no meaning attached
(`--cre8-cyan-70`). Change one and every use of that hue moves.

**Semantic token** — Tier 2. A purpose, defined in terms of a primitive
(`--cre8-bg-brand-strong: var(--cre8-cyan-70)`). The tier you should override when
branding, because it expresses intent rather than appearance.

**Component token** — Tier 3. One component's specific need
(`--cre8-header-bg-default`). Narrowest blast radius, and the easiest way to
accumulate debt if overused.

**Shadow DOM** — The encapsulated DOM tree inside each component. Your
stylesheets cannot select into it; tokens, parts, and `::slotted` are the doors.

**Slot** — A named hole in a component's shadow DOM where consumer markup is
placed. The default (unnamed) slot takes the component's main body; named slots
take specific regions and require `slot="name"` on a **direct** child. See
[The three ways to pass content](02-composition-patterns.md#the-three-ways-to-pass-content).

**Spec** (A2UI) — A `ComponentSpec` tree:
`{ component, props?, children?, slots?, events? }`. Validated by `validateSpec`,
rendered by `render`.

**`tagVariant` vs `type`** — On typographic components, `tagVariant` sets the HTML
element (`h1`–`h6`, default `h5`) and `type` sets the visual scale
(`headline-*`, `title-*`, `display-*`, `label-*`, `meta-*`). They are independent
**only when `type` is set** — omit it and `tagVariant` also drives the size,
which couples your document outline to your visual design. Always set both. See
[Composition rules that are not optional](02-composition-patterns.md#composition-rules-that-are-not-optional).

**Theme** — A loadable stylesheet combining a brand's tokens with fonts, e.g.
`@tmorrow/cre8-wc/themes/cre8`. Resolves to
`lib/design-tokens/brands/<brand>/css/tokens_<brand>.css`.

**4D framework** — Delegation, Description, Discernment, Diligence. The AI
fluency competencies this KB organizes [AI Fluency in cre8](05-ai-fluency.md) around; developed by
Anthropic with Rick Dakan and Joseph Feller. See [AI fluency](07-research.md#ai-fluency).
