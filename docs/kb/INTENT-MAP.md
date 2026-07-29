---
title: Intent Map
intents:
  - "I do not know which page I need"
  - "route me to the right doc"
machine_readable: reference/intents.json
---

# Intent Map

Find the line that sounds like what you are trying to do. Follow the link. If two
lines sound right, take the more specific one.

Agents: the same routing table is machine-readable at
[`reference/intents.json`](reference/intents.json) — match on `intent`, open
`path` relative to `docs/kb/`.

## I am new here

| I want to… | Go to |
|---|---|
| Understand what cre8 actually is | [Orientation](00-orientation.md) |
| Know which layer I am editing (tokens? component? app?) | [The four layers](00-orientation.md#the-four-layers) |
| Get a page on screen in the next ten minutes | [Plain HTML and CDN](06-frameworks.md#plain-html-and-cdn) |
| Look up a term I keep seeing | [Glossary](glossary.md) |

## I am building a UI

| I want to… | Go to |
|---|---|
| Pick the right component for a job | [`reference/components.md`](reference/components.md) |
| Understand what a component's props/slots/parts mean | [The four API surfaces](01-components.md#the-four-api-surfaces) |
| Look up a component's props, values, and defaults | [`reference/props.md`](reference/props.md) |
| Find out what event a component emits | [`reference/events.md`](reference/events.md) |
| Work out why my event listener never fires | [Events are named component-action](01-components.md#events-are-named-component-action) |
| Assemble a whole page | [Page scaffolds](02-composition-patterns.md#page-scaffolds) |
| Build a form that actually submits | [Forms that behave](02-composition-patterns.md#forms-that-behave) |
| Show a table or list of records | [Data display](02-composition-patterns.md#data-display) |
| Emit a table as an A2UI spec | [`reference/content-model.md`](reference/content-model.md) |
| Decide between a slot, a child, and a prop | [The three ways to pass content](02-composition-patterns.md#the-three-ways-to-pass-content) |
| Stop nesting things that should not nest | [Composition rules that are not optional](02-composition-patterns.md#composition-rules-that-are-not-optional) |

## I am changing how it looks

| I want to… | Go to |
|---|---|
| Load the theme stylesheet in the first place | [Choosing an integration](06-frameworks.md#choosing-an-integration) |
| Change one color in one place | [Method 1: scoped custom property override](03-token-theming.md#method-1-scoped-custom-property-override) |
| Brand the whole system for a client | [Method 2: brand override file](03-token-theming.md#method-2-brand-override-file) |
| Add a new brand to the repo properly | [Method 3: a new brand directory](03-token-theming.md#method-3-a-new-brand-directory) |
| Generate a theme from an existing website | [Method 4: generated themes](03-token-theming.md#method-4-generated-themes) |
| Add dark mode | [Dark mode and modes in general](03-token-theming.md#dark-mode-and-modes-in-general) |
| Work out why my CSS is not reaching inside a component | [Styling across the shadow boundary](03-token-theming.md#styling-across-the-shadow-boundary) |
| Find which parts of a component I can style | [`reference/parts.md`](reference/parts.md) |
| Understand the three token tiers | [The three tiers](03-token-theming.md#the-three-tiers) |
| Find the token name for a background, text, or border | [`reference/tokens.md`](reference/tokens.md) |
| Check whether a token name is real | [`reference/tokens.md`](reference/tokens.md) |

## I am writing an agent

| I want to… | Go to |
|---|---|
| Have an agent emit cre8 UI as data | [A2UI — Agent-Generated UI](04-a2ui.md) |
| Learn the spec shape the renderer expects | [The cre8 dialect](04-a2ui.md#the-cre8-dialect) |
| Work out whether a component takes `children` or `slots` | [`reference/content-model.md`](reference/content-model.md) |
| Fix "does not accept default children" | [Children vs slots: the rule that breaks specs](04-a2ui.md#children-vs-slots-the-rule-that-breaks-specs) |
| Understand what validation will *not* catch | [What validation cannot catch](04-a2ui.md#what-validation-cannot-catch) |
| Validate a spec before rendering it | [Validation](04-a2ui.md#validation) |
| Know how this relates to the published A2UI protocol | [Conformance with a2ui.org v1.0](04-a2ui.md#conformance-with-a2uiorg-v10) |
| Handle events coming back out of rendered UI | [Events and the return path](04-a2ui.md#events-and-the-return-path) |
| Choose between A2UI, MCP tools, and plain codegen | [Delegation: choosing the mode](05-ai-fluency.md#delegation-choosing-the-mode) |

## I am working with an AI on this codebase

| I want to… | Go to |
|---|---|
| Decide whether to hand this task to an agent at all | [Delegation: choosing the mode](05-ai-fluency.md#delegation-choosing-the-mode) |
| Write a prompt that produces usable cre8 code | [Description: saying what you want](05-ai-fluency.md#description-saying-what-you-want) |
| Check what an agent produced without reading every line | [Discernment: checking the output](05-ai-fluency.md#discernment-checking-the-output) |
| Know which failures are mine to own | [Diligence: owning the result](05-ai-fluency.md#diligence-owning-the-result) |
| See what tools the agent already has | [The tool surface](05-ai-fluency.md#the-tool-surface) |
| Understand why agents hallucinate cre8 props | [The failure modes specific to this system](05-ai-fluency.md#the-failure-modes-specific-to-this-system) |

## I am integrating with a framework

| I want to… | Go to |
|---|---|
| Use cre8 in React | [React](06-frameworks.md#react) |
| Use cre8 in Next.js or any SSR framework | [Next.js and SSR](06-frameworks.md#nextjs-and-ssr) |
| Use cre8 in Vue | [Vue](06-frameworks.md#vue) |
| Use cre8 in Angular | [Angular](06-frameworks.md#angular) |
| Use cre8 in Svelte | [Svelte](06-frameworks.md#svelte) |
| Use cre8 with no build step at all | [Plain HTML and CDN](06-frameworks.md#plain-html-and-cdn) |
| Fix an event handler that never fires | [The four interop problems](06-frameworks.md#the-four-interop-problems) |
| Fix a form that submits nothing | [The four interop problems](06-frameworks.md#the-four-interop-problems) |
| Fix hydration errors | [Next.js and SSR](06-frameworks.md#nextjs-and-ssr) |

## Something is broken

The sections above are indexed by goal. This one is indexed by **symptom**,
because when something is wrong you know what you are seeing, not what caused it.

Almost everything here fails *silently* — the page still renders, nothing throws,
and review passes. That is what makes these worth a table.

| What I am seeing | Likely cause | Go to |
|---|---|---|
| I set an attribute and nothing happened | Kebab-cased attribute. Lit observes the **lowercased** property name, so `tag-variant` is never seen and the prop keeps its default | [Attribute names are camelCase, never kebab-case](01-components.md#attribute-names-are-camelcase-never-kebab-case) |
| A component renders but has no styling | The theme stylesheet is not loaded, or the element never upgraded | [Loading a theme](03-token-theming.md#loading-a-theme) |
| Components render as bare tags from a CDN | Using the `lib/` build, whose dependencies are external | [Plain HTML and CDN](06-frameworks.md#plain-html-and-cdn) |
| A card or modal renders empty | Content passed as `slot="body"`; there is no `body` slot | [The three ways to pass content](02-composition-patterns.md#the-three-ways-to-pass-content) |
| A named slot's content does not appear | `slot=` is on a grandchild, not a direct child | [The three ways to pass content](02-composition-patterns.md#the-three-ways-to-pass-content) |
| My form submits nothing | Missing `type="submit"`, or fields have no `name` | [Forms that behave](02-composition-patterns.md#forms-that-behave) |
| My event handler never fires | Wrong event name, or React's synthetic events | [`reference/events.md`](reference/events.md) |
| A heading is the wrong size | `type` omitted, so size is coupled to `tagVariant` | [Composition rules that are not optional](02-composition-patterns.md#composition-rules-that-are-not-optional) |
| A badge has no status color | `status` outside the five implemented values | [Data display](02-composition-patterns.md#data-display) |
| My CSS never reaches inside a component | Shadow DOM; use tokens or `::part()` | [Styling across the shadow boundary](03-token-theming.md#styling-across-the-shadow-boundary) |
| A `::part()` rule does nothing | That part is not exposed, or the name came from `COMPONENTS.md` | [`reference/parts.md`](reference/parts.md) |
| A `var(--cre8-…)` has no effect | The token does not exist; undefined tokens resolve to nothing | [`reference/tokens.md`](reference/tokens.md) |
| Focus rings vanished after theming | Focus indicators are tokenized and were not adjusted | [Verifying a theme](03-token-theming.md#verifying-a-theme) |
| A2UI spec: "does not accept default children" | The component is slot-only | [Children vs slots: the rule that breaks specs](04-a2ui.md#children-vs-slots-the-rule-that-breaks-specs) |
| A2UI spec validates but renders wrong | The catalog can be wrong; validation only proves consistency with it | [What validation cannot catch](04-a2ui.md#what-validation-cannot-catch) |
| Hydration errors or a flash of unstyled content | Custom elements upgrading after SSR | [Next.js and SSR](06-frameworks.md#nextjs-and-ssr) |
| An array or object prop arrives as `[object Object]` | Set as an attribute instead of a property | [How props actually reach the element](04-a2ui.md#how-props-actually-reach-the-element) |
| The docs say to run a command that does not exist | Documented tooling that was never built or has moved | [Provenance and drift](07-research.md#provenance-and-drift) |

→ *If your symptom is not here and the component seems to be misbehaving rather
than misconfigured, check whether it is a known divergence between what cre8
documents and what it ships: [Provenance and drift](07-research.md#provenance-and-drift).*

## I want the reasoning, not the instruction

| I want to… | Go to |
|---|---|
| Read the research behind the token architecture | [Design tokens](07-research.md#design-tokens) |
| Read the research behind the component model | [Web components and Lit](07-research.md#web-components-and-lit) |
| Read the spec behind A2UI | [Agent-driven UI](07-research.md#agent-driven-ui) |
| Read the framework behind the AI fluency page | [AI fluency](07-research.md#ai-fluency) |
| Understand where our facts drift from our marketing | [Provenance and drift](07-research.md#provenance-and-drift) |
| See which design questions are still open, and the options | [Open questions, not open bugs](07-research.md#open-questions-not-open-bugs) |
