---
title: AI Fluency in cre8
intents:
  - "how should I prompt an agent to build cre8 ui"
  - "should I hand this task to an agent"
  - "how do I check what an agent generated"
  - "what mcp tools exist for cre8"
  - "why do agents hallucinate cre8 props"
  - "what am I responsible for when an agent writes the ui"
see_also: [04-a2ui, 01-components, 07-research]
sources:
  - packages/cre8-mcp/src/tools.ts
  - .claude/marketplaces/tmorrow_ai/cre8/skills/
  - Anthropic AI Fluency framework (see 07-research)
---

# AI Fluency in cre8

cre8 is built to be used by models as well as by people — manifests, an A2UI
catalog, an MCP server, skills. That machinery only pays off if the human
operating it is deliberate about *how* the collaboration is structured.

This page organizes that around the **4D framework** — Delegation, Description,
Discernment, Diligence — developed by Anthropic with Rick Dakan and Joseph Feller
(see [AI fluency](07-research.md#ai-fluency)). The framework is general; everything below is
the cre8-specific version of it.

## Delegation: choosing the mode

Before prompting, decide which of the three interaction modes you are in. The
framework names them **Automation** (the AI executes a defined task),
**Augmentation** (you think together), and **Agency** (you configure the AI to
act independently later).

cre8 has a distinct path for each, and picking the wrong one is the most
expensive mistake available here — not because the output is bad, but because you
spend augmentation-level effort on an automation-level task.

| Mode | Use it when | The cre8 path |
|---|---|---|
| **Automation** | The UI is specified; you need it emitted correctly | A2UI spec + `validate_a2ui_spec`, or `generate_code` |
| **Augmentation** | You are still deciding what the screen should be | Conversation, referencing [Composition Patterns](02-composition-patterns.md) |
| **Agency** | The same job recurs across sessions | A skill (`cre8-a2ui`, `cre8-a2ui-react`) or an MCP tool |

Some concrete calls:

- **"Build me a settings page"** → augmentation first. The component choice is
  the actual work; delegating it before you have decided produces a plausible
  page you then have to argue with.
- **"Emit this wireframe as cre8 markup"** → automation. Fully specified,
  mechanically checkable, and the validator will catch what goes wrong.
- **"Theme this for the client's brand"** → automation for extraction
  (`brand-theme-extractor` produces a token override file), human judgment for
  approval. Contrast ratios and focus visibility are not things to accept on
  trust; see [Verifying a theme](03-token-theming.md#verifying-a-theme).
- **"Add a component to the library"** → augmentation, then careful automation.
  A new component touches the manifests, the React wrappers, and the A2UI
  catalog. Getting the code right and the regeneration wrong is worse than not
  starting, because the drift is silent.

**Do not delegate** the choice of which token tier to edit
([The three tiers](03-token-theming.md#the-three-tiers)), whether a component belongs in the
library at all, or accessibility acceptance. Those are judgment calls whose cost
of being wrong lands on users, not on you.

## Description: saying what you want

Models fail on cre8 in a specific, predictable way: they generate *generic*
component markup — Bootstrap-shaped, MUI-shaped, plausible — because that is what
most training data looks like. The fix is to make the real API present in the
conversation rather than hoping it is recalled.

**Name the surface.** "Use `@tmorrow/cre8-wc` web components" and "use
`@tmorrow/cre8-react`" produce different code. Say which. If you do not, you get
whichever one the model saw more of.

**Point at the ground truth.** The highest-leverage sentence in a cre8 prompt is
an instruction to look something up:

> Call `get_component` for each component before you use it. Do not use a prop
> that is not in the returned schema.

This converts a memory problem into a retrieval problem, and retrieval is the one
the tools are built for.

**Constrain composition, not just components.** "Use `cre8-card`" gets you a card.
"Use `cre8-card` with the heading in the `header` slot, body content in the
default slot, and actions in `footer`" gets you a *correct* card — and avoids the
`slot="body"` trap documented in
[The three ways to pass content](02-composition-patterns.md#the-three-ways-to-pass-content).

**Say what the tokens are.** "Use `--cre8-*` semantic tokens; no hex values" is
worth more than any amount of after-the-fact cleanup. Models default to literal
colors because that is what most examples contain.

**Ask for the checkable form when one exists.** If the deliverable can be an A2UI
spec rather than a blob of HTML, ask for the spec — then it can be validated
mechanically instead of reviewed by eye. This is the single biggest quality
lever in this codebase.

A prompt that has all five:

> Generate an A2UI spec (`@tmorrow/cre8-wc`) for a billing settings page: a
> `cre8-heading` page title, a plan card, and a payment-method table. Call `get_a2ui_catalog` with
> `view: "component"` for every component before using it, and run
> `validate_a2ui_spec` on the final tree. Semantic `--cre8-*` tokens only, no hex.
> Heading levels must form a correct outline — set `tagVariant` from the document
> hierarchy and `type` from the visual scale.

## Discernment: checking the output

The framework distinguishes checking the *product* from checking the *process*.
In cre8 both are unusually cheap, because so much is machine-checkable — take the
cheap checks first and reserve your attention for what only a human can catch.

**Mechanical checks — do these first, always**

1. `validate_a2ui_spec` — component allowlist, prop names, enums, slots, event
   shape. Catches every hallucinated API.
2. Grep for hex codes. Any `#rrggbb` outside a token file is a token that was not
   used.
3. Grep for non-`cre8-` tags in what should be pure cre8 markup. A stray `<div>`
   for layout usually means a layout component was not found.
4. Render it. Components self-register; an unknown tag renders as an inert
   element with no styles, which is visually obvious.

**Human checks — nothing else will catch these**

5. **Heading outline.** `tagVariant` vs `type` confusion produces pages that look
   right and are unnavigable. This is the most common serious defect in
   AI-generated cre8 UI.
6. **Landmark uniqueness.** One `cre8-header`, one `cre8-main`, one `cre8-footer`.
   Models happily emit two.
7. **Feedback scope.** A banner alert used for a single field error is valid
   markup and wrong communication. See
   [Feedback placement](02-composition-patterns.md#feedback-placement).
8. **Primary action count.** One per screen.
9. **Whether the composition means anything.** A validator confirms a
   `cre8-table` is well-formed. It cannot tell you the data belonged in a list.

**Process checks**

10. Did it actually call the catalog tools, or answer from memory? If the
    transcript shows no tool calls and the output is elaborate, be more skeptical,
    not less — confident and unverified is the dangerous combination.

## Diligence: owning the result

Three responsibilities do not transfer to the model, no matter how good the
output looks.

**Accessibility acceptance is yours.** The components carry ARIA, focus trapping,
and keyboard handling. Composition-level accessibility — outline, landmarks,
label association, focus order — is emitted by whoever assembled the page, and
accepted by whoever merged it. See
[Accessibility is a composition property](02-composition-patterns.md#accessibility-is-a-composition-property).

**Regeneration is yours.** If an agent changes a component's public API, the
manifests, React wrappers, and A2UI catalog must be regenerated in the same
change. Skipping it does not break the build — it teaches every future agent the
wrong API, and the failure surfaces weeks later in someone else's code. This is
the highest-consequence silent failure in the repo; see
[The four layers](00-orientation.md#the-four-layers).

**Verification claims are yours.** "Tests pass" means you ran them. The React
skill in this repo requires visual and DevTools verification after generation for
exactly this reason — cre8 output can compile cleanly and render nothing, because
custom elements fail quietly.

## The tool surface

**MCP server** — `packages/cre8-mcp`, seven tools:

| Tool | Use it for |
|---|---|
| `list_components` | Enumerate, optionally by category; `format: web \| react` |
| `get_component` | One component's full definition — props, slots, events |
| `search_components` | Find by intent when you do not know the name |
| `get_patterns` | The six canonical composition templates |
| `generate_code` | Component tree → HTML or JSX |
| `get_a2ui_catalog` | Catalog metadata, one component, or the full schema |
| `validate_a2ui_spec` | Check a spec tree before rendering |

**Skills** — `cre8-a2ui` (web components), `cre8-a2ui-react` (React),
`cre8-mcp-ui` (serving cre8 UI through a Python MCP server),
`frontend-development`, `brand-theme-extractor` (URL → CSS token override).

**Docs an agent can read directly** — `agent-docs/COMPONENTS.md` (generated prop
tables), `agent-docs/CODE_GUIDELINES.md` (conventions), `a2ui/examples/` (valid
worked specs), and this KB's [`reference/intents.json`](reference/intents.json).

Efficiency note: `get_a2ui_catalog` with `view: "full"` and the whole of
`COMPONENTS.md` are both large. Prefer `view: "metadata"` then `view: "component"`,
or `search_components` then `get_component`. Context spent on 84 components you
are not using is context not spent on the one you are.

## The failure modes specific to this system

Each of these is documented elsewhere in this KB with evidence. Collected here
because they are what actually goes wrong, and every one of them is a *documented*
API disagreeing with a *shipped* API — the exact condition that makes a model
confidently wrong.

| Failure | Why it happens | Fix |
|---|---|---|
| `tagName` instead of `tagVariant` | `CODE_GUIDELINES.md` specifies `tagName`; components ship `tagVariant` | [Naming conventions you can rely on](01-components.md#naming-conventions-you-can-rely-on) |
| `slot="body"` renders nothing | `cre8-card` JSDoc documents a `body` slot; implementation uses the default slot | [The three ways to pass content](02-composition-patterns.md#the-three-ways-to-pass-content) |
| Installing `@cre8_dev/cre8-design-tokens` | A skill file still says to; tokens ship inside `@tmorrow/cre8-wc` | [What ships](00-orientation.md#what-ships) |
| React `onClick` never fires | Custom events do not map to React's synthetic props | [The four interop problems](06-frameworks.md#the-four-interop-problems) |
| "93 components" | Marketing copy; manifests say 85 | [Provenance and drift](07-research.md#provenance-and-drift) |
| Spec valid, catalog stale | Artifacts carry independent version stamps and can diverge | [Keeping the A2UI artifacts in sync](04-a2ui.md#keeping-the-a2ui-artifacts-in-sync) |
| `pnpm generate-theme` not found | Documented in `THEME_GENERATOR.md`, absent from `package.json` | [Method 4: generated themes](03-token-theming.md#method-4-generated-themes) |
| A value validates but renders unstyled | A hand-written catalog override disagrees with the component (the `label-default` case, now fixed) | [What validation cannot catch](04-a2ui.md#what-validation-cannot-catch) |
| `children` on a card/button/table-row is rejected | 25 components are slot-only; 6 take no free content at all | [Children vs slots: the rule that breaks specs](04-a2ui.md#children-vs-slots-the-rule-that-breaks-specs) |
| Button label passed as children | Every other UI system works that way; cre8 uses the `text` prop | [Children vs slots: the rule that breaks specs](04-a2ui.md#children-vs-slots-the-rule-that-breaks-specs) |
| `cre8-select options={…}` rejected | The prop is `items`; `options` is the near-universal name elsewhere | [`reference/props.md`](reference/props.md) |
| Listening for `cre8-change` | The `cre8-` tag prefix implies an event prefix; there is none. Events are `component-action` kebab-case, and `cre8-select` keeps the native `change` | [Events are named component-action](01-components.md#events-are-named-component-action) |
| A form that never submits | `cre8-button` defaults to `type="button"` and only submits when `type="submit"` | [Forms that behave](02-composition-patterns.md#forms-that-behave) |

The generalizable lesson: **when documentation and implementation disagree, a
model will confidently reproduce the documentation**, because prose is what it was
trained on and prose is what retrieval returns. The defense is to make the
implementation machine-readable and validate against *that* — which is what the
manifests, the catalog, and `validate_a2ui_spec` are for.

With one caveat: the catalog is itself generated, and partly by hand, so it can
carry the error it is supposed to catch — see
[What validation cannot catch](04-a2ui.md#what-validation-cannot-catch) for the mechanism and a worked case.

The same reasoning is why this KB generates its own reference pages and facts
from the manifests rather than typing them: a page that can drift, will.

→ *For the framework this page is organized around, see [AI fluency](07-research.md#ai-fluency).*
