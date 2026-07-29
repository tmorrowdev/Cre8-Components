---
title: Research and Sources
intents:
  - "where is the research behind this"
  - "what standards does cre8 follow"
  - "what is the a2ui spec"
  - "what is the ai fluency framework"
  - "why do our numbers disagree"
see_also: [00-orientation, 03-token-theming, 04-a2ui, 05-ai-fluency]
---

# Research and Sources

An annotated bibliography. Each entry says what it is *and* which decision in cre8
rests on it — a link without that is just a link.

Entries are marked **[verified]** if the URL was fetched or returned by search
while writing this page, and **[canonical]** for stable primary sources
(specifications, official docs) cited from established addresses.

## Web components and Lit

**HTML Standard — Custom Elements** [canonical]
<https://html.spec.whatwg.org/multipage/custom-elements.html>
The spec that makes framework-agnostic components possible at all. Defines the
lifecycle callbacks and, importantly for cre8, `ElementInternals` and
form-associated custom elements — the mechanism behind
[The two base classes](01-components.md#the-two-base-classes).

**Lit documentation** [canonical]
<https://lit.dev/docs/>
cre8 components are Lit 3 classes. Reactive properties, `html` templates, and
scoped styles all come from here. When a component's behavior surprises you and
the cre8 source looks fine, the answer is usually in Lit's update lifecycle.

**Custom Elements Everywhere** [verified]
<https://custom-elements-everywhere.com/>
Runs an interoperability test suite against every major framework and publishes
weighted scores. This is the empirical basis for [Usage in Other Frameworks](06-frameworks.md): it is where
"React needs wrappers, Vue does not" stops being folklore. React scored ~67%
before v19 and 100% from v19 onward; Vue scores 100%. Repo:
<https://github.com/webcomponents/custom-elements-everywhere>

**React 19 release notes** [verified]
<https://react.dev/blog/2024/12/05/react-19>
Documents the custom-element support that changed React's story: on the client,
props matching a property on the element instance are assigned as properties,
otherwise as attributes. This is why [React](06-frameworks.md#react) says raw tags now
work on React 19 — and why wrappers are still worth keeping for the typings.

**Vue — Vue and Web Components** [verified]
<https://vuejs.org/guide/extras/web-components.html>
The official guidance behind the `isCustomElement` compiler option in
[Vue](06-frameworks.md#vue).

**MDN — `<slot>`** [canonical]
<https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot>
Cited directly in `agent-docs/CODE_GUIDELINES.md` as the basis for cre8's
composability approach. Read alongside
[The three ways to pass content](02-composition-patterns.md#the-three-ways-to-pass-content).

**MDN — `::part()`** [canonical]
<https://developer.mozilla.org/en-US/docs/Web/CSS/::part>
The sanctioned way to style component internals from outside, and the second door
described in [Styling across the shadow boundary](03-token-theming.md#styling-across-the-shadow-boundary).

**Open UI** [canonical]
<https://open-ui.org/>
Research effort documenting how UI controls actually behave across design
systems, feeding standards proposals. Useful context for why cre8 prefers native
elements over reimplemented ones.

## Design tokens

**Design Tokens Format Module** [verified]
<https://www.designtokens.org/tr/drafts/format/> · community group:
<https://github.com/design-tokens/community-group>
The Design Tokens Community Group's interchange format; the first stable version
(2025.10) was announced in October 2025. Not a W3C Standard and not on the
standards track — a community specification. This is the direction cre8's
Figma-generated token pipeline is converging on, and the reason tiers 1–3 are
generated rather than hand-written
([The three tiers](03-token-theming.md#the-three-tiers)).

**Brad Frost — Creating Themeable Design Systems** [canonical]
<https://bradfrost.com/blog/post/creating-themeable-design-systems/>
Linked from `agent-docs/THEMING.md` as cre8's definition of "themeable." The
argument for separating a component's structure from its brand expression is the
whole basis of [Token Theming](03-token-theming.md).

**WCAG 2.2** [canonical]
<https://www.w3.org/TR/WCAG22/>
Source of the contrast ratios in
[Verifying a theme](03-token-theming.md#verifying-a-theme) — 4.5:1 for body text, 3:1 for large text
and UI components. Any new brand has to clear these before it ships.

## Component architecture

**Dan Abramov — Presentational and Container Components** [canonical]
<https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0>
Cited in `CODE_GUIDELINES.md` for the "presentational components only" principle.
Worth noting the author later added a caveat that the pattern should not be
applied dogmatically — in cre8 it is not a style preference but a hard constraint,
because it is what makes components expressible as A2UI data
([The mental model](00-orientation.md#the-mental-model)).

**Composition over inheritance** [canonical]
<https://en.wikipedia.org/wiki/Composition_over_inheritance>
Cited in `CODE_GUIDELINES.md`. Explains why cre8 answers "this component needs to
do more" with a slot rather than a prop or a subclass.

**BEM** [canonical] <http://getbem.com/introduction/> ·
**BEMIT** [canonical] <https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/>
The class-naming conventions cre8's SCSS extends (`.cre8-c-button__text--secondary`).
Relevant when reading component styles; not relevant to consumers, since those
classes live inside shadow roots.

## Accessibility

**The A11Y Project Checklist** [canonical]
<https://www.a11yproject.com/checklist/>
Cited in `CODE_GUIDELINES.md` as the standard cre8 markup is held to.

**Deque — The 5 Rules of ARIA** [canonical]
<https://www.deque.com/blog/top-5-rules-of-aria/>
Also cited in the guidelines, under "use but don't abuse ARIA." Rule one — prefer
a native element — is the reason `cre8-button` renders a real `<button>`, and the
reason most accessibility defects in cre8 apps are composition-level
([Accessibility is a composition property](02-composition-patterns.md#accessibility-is-a-composition-property)).

**ARIA Authoring Practices Guide** [canonical]
<https://www.w3.org/WAI/ARIA/apg/>
Reference patterns for the interactive components cre8 implements — accordion,
tabs, modal, combobox. Useful when reviewing whether a component's keyboard
behavior is complete.

## Agent-driven UI

**A2UI Protocol v1.0** [verified]
<https://a2ui.org/specification/v1.0-a2ui/>
Status: Candidate, created November 2025, last updated June 2026. Defines the
streaming message set (`createSurface`, `updateComponents`, `updateDataModel`,
`deleteSurface`), a flat adjacency-list component model keyed by `id`, and JSON
Pointer data binding. Earlier drafts remain published at `/v0.9-a2ui/` and
`/v0.8-a2ui/`.
**cre8's A2UI is a related dialect, not an implementation of this spec** — the
catalog conventions align, the document model does not. The comparison is
tabulated in [Conformance with a2ui.org v1.0](04-a2ui.md#conformance-with-a2uiorg-v10).

**JSON Schema 2020-12** [canonical]
<https://json-schema.org/draft/2020-12/release-notes>
The schema dialect `a2ui/catalog.json` declares. `validateSpec` implements a
deliberate subset — `const`, `enum`, `oneOf`, `type`, `items`, `properties`,
`required`, `additionalProperties` — rather than pulling in a full validator.

**JSON Pointer (RFC 6901)** [canonical]
<https://datatracker.ietf.org/doc/html/rfc6901>
How a2ui.org binds components to a data model. cre8 has no data model — values
are inline — so this is background for the conformance discussion rather than
something you need to use today.

**Model Context Protocol** [canonical]
<https://modelcontextprotocol.io/>
The protocol `packages/cre8-mcp` implements to expose the component catalog to
agents. Tool inventory in [The tool surface](05-ai-fluency.md#the-tool-surface).

**Protocol landscape** [verified]
<https://a2aprotocol.ai/blog/a2ui-guide>
Third-party overview positioning A2UI against MCP, A2A, and AG-UI: A2UI describes
*what* to render, AG-UI describes *how* agent and UI communicate in real time, MCP
describes *what tools* the agent can call. Useful for placing cre8's stack, though
secondary rather than a primary source.

## AI fluency

**AI Fluency: Framework & Foundations** [verified]
<https://www.anthropic.com/learn/claude-for-you> · Coursera:
<https://www.coursera.org/learn/ai-fluency-framework-foundations> · Anthropic
Courses: <https://anthropic.skilljar.com/ai-fluency-framework-foundations>
The free course developed by Anthropic with Professors Rick Dakan (Ringling
College of Art and Design) and Joseph Feller (University College Cork). Source of
the **4D framework** — Delegation, Description, Discernment, Diligence — and of
the three interaction modes (Automation, Augmentation, Agency) that structure
[AI Fluency in cre8](05-ai-fluency.md).

**AI Fluency Framework** [verified]
<https://aifluencyframework.org/>
The authors' own site, carrying documentation, papers, and open educational
resources. Go here for the research behind the framework rather than the course
delivery of it.

## Tooling referenced in this repo

**Style Dictionary — DTCG support** [canonical]
<https://styledictionary.com/info/dtcg/>
Relevant if the token pipeline moves to the standard format; documents how a
build tool consumes DTCG files.

**`@lit/react`** [canonical]
<https://lit.dev/docs/frameworks/react/>
The wrapper generator behind `@tmorrow/cre8-react`. Explains how events and
complex properties are bridged into React's model — the mechanism behind
[React](06-frameworks.md#react).

**Puppeteer** [canonical] <https://pptr.dev/>
The scraping half of the theme generator described in
[Method 4: generated themes](03-token-theming.md#method-4-generated-themes).

## Provenance and drift

Numbers about this system disagree depending on where you read them. This is the
authoritative reconciliation; regenerate it with
`node docs/kb/tools/generate-reference.mjs`.

This ledger records **documentation disagreeing with implementation** — cases
where a written source states something the code does not do. Wrong guesses that
no document actually makes (assuming `cre8-select` takes `options`, or that it
emits `cre8-change`) are failure modes rather than drift, and live in
[The failure modes specific to this system](05-ai-fluency.md#the-failure-modes-specific-to-this-system).

Every mechanically checkable row below is re-verified by `pnpm kb:check-drift`,
which **fails when a drift is fixed** — that is how rows get moved to Resolved
instead of quietly becoming false.

### Open

| Claim | Where it appears | Reality |
|---|---|---|
| "93 components" | `website/index.html` meta description and body copy | 85 in `mcp-manifest.json`, `react-manifest.json`, and `a2ui/catalog.json` |
| "72 React components" | `cre8-a2ui-react` skill | 85 in `react-manifest.json` v2.0.7 |
| React library v1.0.0 | `cre8-a2ui-react` skill | 2.0.7 in `react-manifest.json` |
| Install `@cre8_dev/cre8-design-tokens` | `cre8-a2ui-react` skill | Tokens ship inside `@tmorrow/cre8-wc`; both manifests say so in `designTokens.tokenPackage` |
| Prop named `tagName` | `agent-docs/CODE_GUIDELINES.md` | Components ship `tagVariant` / `headingTagVariant` |
| `cre8-card` has a `body` slot | `card.ts` JSDoc | Implementation uses the unnamed default slot |
| `pnpm generate-theme` etc. | `agent-docs/THEME_GENERATOR.md`, `THEME_SYSTEM.md` | No such scripts in either `package.json` |
| Components live in three status directories (cre8 / Experimental / Patterns) | `agent-docs/CODE_GUIDELINES.md` line 27, "located in one of 3 directories based on their status" | `components/` is flat; no directory or manifest field records support tier, so the tier cannot be looked up. The same file contradicts itself at "Components in this library exist in a flat structure" — two statements to reconcile, not one to update |
| `size` accepts `xs`–`xl` with an `md` default | `agent-docs/CODE_GUIDELINES.md` | Shipped `size` props are `sm`/`lg`; `xs` appears nowhere and only one component declares `md` |
| `cre8-accordion-item` exposes `header` and `icon` parts | `agent-docs/COMPONENTS.md` CSS Shadow Parts table | Source emits `heading`, `button`, `body`, `body-inner` — no `header`, no `icon` |
| COMPONENTS.md documents the parts surface | It has a "CSS Shadow Parts" section | Only 3 of the 10 components that emit parts document them there |

### Open questions, not open bugs

Four things here cannot be fixed by correcting a sentence — each needs a decision
about the library itself. The options given are what the code makes possible, not
recommendations.

Two of them (**support tiers**, **the `size` scale**) also appear in the table
above, because a document does make a false claim *and* the underlying capability
is missing; fixing the prose alone would not settle them. The other two
(**`required`**, **headline scale**) are deliberately not in that table: no
document claims them. They are gaps between what the library's design implies it
can do and what it does, which is a different thing from documentation drift.

**Support tiers can't be looked up.** The guidelines describe three status
directories *and*, elsewhere in the same file, a flat structure — so the first
job is deciding which statement is meant to be true. `components/` is in fact
flat, and no manifest field records tier. Either add
a `status` field to the component manifests — the generator already reads them, so
[the component reference](reference/components.md) could carry a column for free —
or move components into the directories as described, or drop the tier concept
from the guidelines. Doing nothing means the guidelines keep promising a check
that cannot be performed.

**The `size` scale was specified but not built.** Guidelines say `xs`–`xl` with an
`md` default; eleven shipped `size` props use `sm`/`lg`, one declares `md`, and
`xs` appears nowhere. Either implement the missing steps where they would actually
be used, or narrow the guideline to what shipped. Worth settling alongside
`cre8-text-passage`, which spells its scale out as `large`/`small`/`default` and is
the odd one out either way.

**`required` does not block submission.** `Cre8FormElement` calls `setValidity()`
only from `setCustomValidity()`, so constraint attributes on the shadow-root
`<input>` never reach the host's `ElementInternals`. The fix is contained — map the
inner input's validity into `setValidity()` on input and blur — but it is
behaviour-changing: forms that currently submit would start blocking, which is
correct and may still surprise consumers relying on today's behaviour. The
alternative is to document loudly that enforcement is the application's job, which
is what [Forms that behave](02-composition-patterns.md#forms-that-behave)
currently does.

**No headline scale on a non-heading.** A KPI value like `$38.42` should not be an
`<h1>`, but `tagVariant` accepts only `h1`–`h6` and `cre8-text-passage` stops at
`large`. Three ways out: widen `tagVariant` to allow `p`/`span`/`div`, extend the
text-passage scale to reach headline sizes, or add a dedicated stat component.
The first is smallest and keeps `type` doing the visual work it already does.

### Resolved

Kept because the failure shapes recur — knowing a class of bug has bitten here
before is useful even once the instance is gone.

| Was | Fixed by |
|---|---|
| Heading `type` accepted `"label"` in the catalog while the component implemented `"label-default"` — specs validated clean and rendered unstyled | Correcting the `PROP_OVERRIDES` entry in `generate-catalog.mjs` and regenerating. See [What validation cannot catch](04-a2ui.md#what-validation-cannot-catch) |
| Heading `tagVariant` JSDoc claimed `h2` was the default; the code default is `h5` | JSDoc corrected; the catalog description is generated from it, so the fix propagated |
| Catalog stamped 2.0.6 and the knowledge graph 2.0.4 against a 2.0.7 package | Regenerating all artifacts together; now uniformly 2.0.7. See [Keeping the A2UI artifacts in sync](04-a2ui.md#keeping-the-a2ui-artifacts-in-sync) |
| `cre8-chart.colors` carried a hand-written override duplicating what the generator already derives | Override removed, with a comment establishing when an override is warranted |
| `a2ui/examples/llm-observability.json` failed `validateSpec`, nesting cells as `children` under slot-only `cre8-table-row` | Example corrected to use `slots.default`; all four shipped examples now validate |
| `cre8-badge` declared `status: string`, so the catalog carried no enum — any value validated and only five rendered | Property retyped to a literal union; the catalog now enumerates `error, info, warning, success, attention` |
| Four demo pages (`landing-page`, `login-page`, `dashboard-demo`, `blog-demo`) set 15 attributes the browser silently ignored — kebab-cased names Lit never observes, and names that were not attributes of the element at all. `login-page.html`'s headings rendered as `h5`, leaving the sign-in page with no `h1` | All 15 corrected and verified in a browser against the shipped CDN build: the headings now render real `h1`/`h2`, `fullWidth` applies, `cre8-alert` carries a native `aria-label`, and `cre8-feature`'s heading/description — which were never attributes, and which the component has no props for — became slotted `cre8-heading` + `cre8-text-passage` children. `isActive` on `cre8-primary-nav-item` was **not** a casing bug: it is `@state`, so no markup spelling sets it, and it means "mega-menu open", not "current page" — the three nav items now use native `aria-current="page"`. Guarded by `docs/kb/tools/check-demo-attrs.mjs` |
| "Predictable APIs" held for props but not events — 16 components used 5 conventions (bare word, camelCase, kebab-case, `cre8-`-prefixed kebab, dotted) and `agent-docs/CODE_GUIDELINES.md` specified none | Events normalized to `component-action` kebab-case, with the rule added to `CODE_GUIDELINES.md` under "Event names". Form components keep native `change`/`input`. Old names still dispatch alongside the new ones for one major version — see `DEPRECATED_EVENT_ALIASES` in `components/cre8-element.ts` |
| `cre8-split-button` and `cre8-percent-bar` had no `@fires` JSDoc, so the manifest analyzer inferred their events from the literal `this.dispatchEvent(…)` call shape — refactoring that call silently dropped their React `on*` props. `cre8-tabs` never had an `onTabChange` prop at all | `@fires` added to all three class docblocks, making the manifest independent of call shape |
| The `Login Form` pattern served by `get_patterns` had no `<form>` and no `type="submit"`, so it could not submit. It also had no `name` on either field, so even once wired it would have posted an empty payload | All three fixed in `scripts/mcp-static-data.json`, then propagated by `build:mcp-manifest` and `build:react-manifest`. Verified in a browser against the shipped 2.0.7 CDN build: the old template's button click submits nothing; the new one fires `submit` with `[["email",…],["password",…]]` |
| The `Tabbed Content` pattern set `label`, `tab-id` and `selected` on `cre8-tab`, and `tab-id` on `cre8-tab-panel` — none of which exist. Every tab rendered blank | Rewritten to the real API: the label is slotted text, and `cre8-tabs` pairs tabs with panels by position and assigns `index`/`isActive` itself |
| The `Page Layout` pattern slotted the logo into `slot="logo"` on `cre8-global-nav` and the copyright into `slot="copyright"` on `cre8-footer`; neither slot exists, so both were never assigned and rendered nowhere | Both moved to the default slot |
| The `Modal Dialog` pattern set `aria-label` on the host, but `cre8-modal` renders its inner `role="dialog"` label from the `ariaLabel` **property** — the dialog shipped unlabelled | Changed to `ariaLabel`. Confirmed in the browser: the host attribute yields `aria-label=""` on the inner dialog, the property yields the real label |
| The KB, `reference/props.md`, and its generator all stated that HTML and Vue/Angular templates take kebab-case attributes (`tagVariant` → `tag-variant`). Lit lowercases property names to derive attributes and no cre8 component overrides that, so every kebab-cased attribute in the docs — and the `tag-variant`/`full-width`/`is-hoverable` in the shipped patterns — bound to nothing and left the prop at its default | Rule corrected in `06-frameworks.md` and in `generate-reference.mjs` (which regenerates `reference/props.md`); all 7 kebab-cased attributes in KB examples rewritten to camelCase. |

**Why this table exists.** Every row is a place where a *documented* API disagrees
with a *shipped* one, and prose is what both humans and models retrieve first. An
agent asked to build cre8 UI will reproduce the documentation, confidently,
because that is the higher-signal-looking source. Closing these gaps is worth more
than any amount of additional prompt engineering — see
[The failure modes specific to this system](05-ai-fluency.md#the-failure-modes-specific-to-this-system).

**Severity depends on which layer the error reached.** A wrong statement in
`CODE_GUIDELINES.md` or `COMPONENTS.md` is prose against prose — costly, but
visible to anyone who checks the code. An error that reaches a *machine-readable*
artifact is worse, because the standard defense ("validate against the catalog")
then certifies the bug instead of catching it. The heading-enum row under
**Resolved** was exactly that case, and it is why the catalog generator's
hand-maintained overrides are worth auditing whenever a component API changes.
See [What validation cannot catch](04-a2ui.md#what-validation-cannot-catch).

**How to keep this honest.** Derived facts in this KB come from
[`reference/facts.json`](reference/facts.json), generated from the manifests. If a
prose page disagrees with it, the prose page is wrong.
