---
title: Orientation
intents:
  - "what is cre8"
  - "what are the layers"
  - "which layer should I be editing"
  - "where do I start"
see_also: [01-components, 03-token-theming, 06-frameworks]
---

# Orientation

cre8 is a themeable design system implemented as standards-based custom elements.
Its distinguishing bet is that the same component library is consumed three ways —
by a human writing HTML, by a framework app importing wrappers, and by an *agent*
emitting JSON — and that all three read from the same manifests.

That bet is the reason this repository looks the way it does. Almost every
confusing thing in it is downstream of "the component definition must be
machine-readable enough that an LLM can use it without seeing the source."

## The four layers

Most questions resolve the moment you identify which layer you are actually in.
Editing the wrong one is the single most common way work here gets wasted.

| Layer | Lives in | You change it when | You do **not** change it when |
|---|---|---|---|
| **1. Tokens** | `packages/cre8-wc/design-tokens/` | The whole system should look different | One screen looks wrong |
| **2. Components** | `packages/cre8-wc/components/` | A component's behavior or API is wrong for everyone | Your app needs a one-off |
| **3. Composition** | Your app, or `a2ui/examples/` | You are assembling a screen | The pieces themselves are wrong |
| **4. Agent surface** | `mcp-manifest.json`, `react-manifest.json`, `a2ui/catalog.json` | Components changed and machines need to know | You are just using the system |

Layer 4 is generated from layer 2. If you change a component's public API and do
not regenerate the manifests, agents keep emitting the old API and every downstream
consumer — the MCP server, the React wrappers, the A2UI catalog — quietly drifts.
This is the failure mode this whole KB is organized around.

→ *If you want to know what a component's API actually consists of, see
[The four API surfaces](01-components.md#the-four-api-surfaces).*
→ *If you want to change how things look, see [Token Theming](03-token-theming.md) and pick the
lightest method that works.*

## The mental model

A cre8 component is a **presentational** custom element. It renders into shadow
DOM, it accepts data through attributes and slots, and it announces things by
dispatching events. It does not fetch, it does not know about your router, and it
does not hold application state.

This is not a stylistic preference — it is the constraint that makes the other
three consumption paths possible. An agent can emit a `cre8-table` as JSON
precisely because a `cre8-table` has no opinions about where rows come from. The
moment a component reaches for application state, it stops being expressible as
data, and it drops out of the A2UI catalog.

Three consequences follow, and they explain most of the surprises:

1. **Business logic goes in your app, always.** The component library is the view.
   See the "presentational components only" principle in
   `packages/cre8-wc/agent-docs/CODE_GUIDELINES.md`.
2. **Composition beats configuration.** When a component needs to be richer, the
   answer is usually to slot something into it, not to add a prop. See
   [The three ways to pass content](02-composition-patterns.md#the-three-ways-to-pass-content).
3. **Styling reaches in through tokens, not selectors.** Shadow DOM means your
   stylesheet cannot select into a component. Tokens and CSS shadow parts are the
   sanctioned doors. See [Styling across the shadow boundary](03-token-theming.md#styling-across-the-shadow-boundary).

## What ships

Read the current numbers from [`reference/facts.json`](reference/facts.json)
rather than from memory; at time of writing:

- **`@tmorrow/cre8-wc` v2.0.7** — 85 Lit 3 custom elements, prefix `cre8-`,
  self-registering.
- **`@tmorrow/cre8-react` v2.0.7** — the same 85, wrapped with `@lit/react` for
  React 18+.
- **A2UI catalog** — the same 85, as a JSON Schema an agent can emit against.
- **15 brand token sets** under `design-tokens/brands/`.
- **Design tokens are bundled inside `@tmorrow/cre8-wc`**, not in a separate
  package.

> **Drift.** Some skill files and marketing copy still reference
> `@cre8_dev/cre8-design-tokens` as a separate install, and `website/index.html`
> says 93 components. Neither matches the shipped package. Trust
> [`reference/facts.json`](reference/facts.json), which is generated from the
> manifests. See [Provenance and drift](07-research.md#provenance-and-drift).

## Choosing your entry point

| You are… | Start at |
|---|---|
| Prototyping, no build step | [Plain HTML and CDN](06-frameworks.md#plain-html-and-cdn) |
| Building a React or Next.js app | [React](06-frameworks.md#react) |
| On Vue, Angular, or Svelte | [Usage in Other Frameworks](06-frameworks.md) |
| Writing an agent that generates UI | [A2UI — Agent-Generated UI](04-a2ui.md) |
| Theming for a brand | [Token Theming](03-token-theming.md) |
| Contributing a component | `packages/cre8-wc/agent-docs/CODE_GUIDELINES.md`, then [Components](01-components.md) |

→ *If none of these fit, go back to [Intent Map](INTENT-MAP.md) and search by goal.*
