---
title: Components
intents:
  - "how is the component library organized"
  - "what do a component's props mean"
  - "what is a compound component"
  - "how do I read the naming conventions"
  - "what is the difference between a supported and experimental component"
see_also: [02-composition-patterns, 03-token-theming, reference/components]
sources:
  - packages/cre8-wc/agent-docs/CODE_GUIDELINES.md
  - packages/cre8-wc/agent-docs/COMPONENTS.md
  - packages/cre8-wc/components/cre8-element.ts
  - packages/cre8-wc/components/cre8-form-element.ts
---

# Components

This page is about the *shape* of cre8 components — the conventions that let you
guess an API correctly before you look it up. For the list itself, see
[`reference/components.md`](reference/components.md), which is generated from the
manifests and therefore cannot go stale the way this page can.

## The four API surfaces

Every cre8 component exposes exactly four things. Knowing which surface you need
is most of the work of using one.

| Surface | Looks like | Use it when |
|---|---|---|
| **Properties / attributes** | `<cre8-button text="Save" variant="primary">` | The value is a scalar the component renders or reacts to |
| **Slots** | `<span slot="footer">…</span>` | You are passing *markup* into a named region |
| **Events** | `element.addEventListener('change', …)` | The component needs to tell you something happened |
| **CSS shadow parts** | `cre8-accordion-item::part(heading) { … }` | You need to style internals that tokens do not cover |

The reason there are four and not three is shadow DOM. A component's internals are
sealed; parts are the explicit holes the author cut in the seal. If you find
yourself wanting a fifth surface — reaching in with a descendant selector — see
[Styling across the shadow boundary](03-token-theming.md#styling-across-the-shadow-boundary) for why it will not work
and what to do instead.

### Attribute names are camelCase, never kebab-case

This is the costliest rule in the system, because breaking it fails silently.

Lit derives a component's observed attribute by **lowercasing the property
name** — it does not insert hyphens. So `tagVariant` is observed as
`tagvariant`. Because HTML attribute names are case-insensitive, writing
`tagVariant="h2"` works. Writing `tag-variant="h2"` does **not**: that is a
different attribute name, nothing observes it, and the property silently keeps
its default.

```html
<cre8-heading tagVariant="h2" type="headline-default">Sign In</cre8-heading>  <!-- correct -->
<cre8-heading tag-variant="h2" type="headline-default">Sign In</cre8-heading> <!-- kb-check: counterexample — renders as h5 -->
```

Nothing throws. The page renders. Review passes. The heading is just the wrong
element, which is an accessibility defect rather than a visible bug — and this
exact mistake shipped in four of this repo's demo pages until recently.

The rule applies wherever you hand-write markup: plain HTML, Vue and Angular
templates, Svelte. It does **not** apply to A2UI specs or React
(`@tmorrow/cre8-react`), where you write the camelCase property name directly and
the renderer or wrapper handles the rest.

**Three components are exceptions**, because they pass an explicit `attribute:`
option to `@property()`, which overrides the lowercasing entirely. For these the
attribute is exactly the string given, and the camelCase form is what gets
ignored:

| Component | Kebab-cased attributes |
|---|---|
| `cre8-chart` | `maintain-aspect-ratio`, `show-legend`, `legend-position`, `enable-animation`, `animation-duration`, `aria-label` |
| `cre8-accordion-item` | `aria-controls` |
| `cre8-select-tile` | `checked` (single word; unaffected either way) |

So `<cre8-chart legend-position="top">` is correct and `legendPosition="top"` does
nothing. This is the reverse of the rule above, which is why
[`reference/props.md`](reference/props.md) is worth checking rather than trusting
either convention: it lists whatever the catalog actually declares, kebab or
camel.

> Kebab-case is the convention in most web-component libraries, which is why this
> looks right. `agent-docs/CODE_GUIDELINES.md` now documents the rule under
> "Attribute names are lowercased, not kebab-cased"; check
> [`reference/props.md`](reference/props.md) for the exact spelling of any
> multi-word prop.

#### Some members have no attribute under any spelling

Fixing the casing is not always the fix. A member declared `@state()` — or
`@property({ attribute: false })` — has **no** associated attribute, so
`is-active`, `isActive`, and `isactive` are all equally inert. It is settable
only as a JS property:

```js
document.querySelector('cre8-primary-nav-item').isActive = true;
```

`isActive` on `cre8-primary-nav-item` is the live example, and it carries a
second trap: it means "this item's mega-menu is open" — it drives `aria-expanded`
and is cleared on outside-click and Escape — not "this is the current page". For
current-page marking, use the native `aria-current="page"`.

Note that the a2ui catalog cannot tell you which is which: it flattens
`@property` and `@state` into one `props` map, so `isActive` appears there as an
ordinary prop. `packages/cre8-wc/custom-elements.json` is the reliable source —
its `attributes` list mirrors `observedAttributes`. `pnpm kb:check-demo-attrs`
checks the repo's HTML pages against it.

→ *For the full API of a specific component, use the generated pages:
[`reference/props.md`](reference/props.md) (types, values, defaults,
attribute-vs-property), [`reference/content-model.md`](reference/content-model.md)
(children vs slots), [`reference/events.md`](reference/events.md), and
[`reference/parts.md`](reference/parts.md). `agent-docs/COMPONENTS.md` has
long-form usage guidance, but carries known inaccuracies in its API tables — see
[Provenance and drift](07-research.md#provenance-and-drift).*

## Naming conventions you can rely on

These come from `agent-docs/CODE_GUIDELINES.md`. They are worth internalizing
because they mean you can usually guess right.

**Variation**

- `variant` — the primary stylistic variation (`primary`, `secondary`, `success`).
- `size` — abbreviated t-shirt sizes. The guidelines specify `xs`–`xl` with `md`
  as the undeclared default; **what shipped is narrower**. Across the eleven
  `size` props, the values are `sm`/`lg` (or `sm` alone); `xs` appears nowhere,
  only `cre8-accordion-item` declares `md`, and `cre8-text-passage` spells its
  out as `large`/`small`/`default`. Check
  [`reference/props.md`](reference/props.md) rather than assuming the scale.
- `inverted` — flips the color scheme for use on dark backgrounds. This is *not*
  dark mode; see [Dark mode and modes in general](03-token-theming.md#dark-mode-and-modes-in-general).
- `behavior` — a functional variation, for mutually exclusive behaviors.
- `is[Behavior]` — additive behavioral flags (`isHoverable`, `isDraggable`).
- `align` / `verticalAlign` — `start`, `center`, `end`. These use logical
  property names deliberately, so RTL works without a second API.
- `orientation` — `horizontal`, `vertical`, sometimes `responsive`.

**Content**

- `text` for a plain string, `title` for a heading, `description` for supporting
  copy, `label` / `legend` for form controls (the semantic name wins in forms).
- `imgSrc` / `imgAlt` for images; `iconName` / `iconPosition` for icons.

> **Drift.** `CODE_GUIDELINES.md` specifies `tagName` for "render as a different
> HTML element." The shipped components use `tagVariant` (and
> `headingTagVariant` on `cre8-accordion-item`). The code is what runs — use
> `tagVariant`. This is exactly the kind of divergence that makes agents emit
> invalid markup; see [The failure modes specific to this system](05-ai-fluency.md#the-failure-modes-specific-to-this-system).

## Events are named `component-action`

16 of the 85 components emit events. They follow one rule: lowercase kebab-case,
shaped as `component-action`.

| Component | Event |
|---|---|
| `cre8-tabs` | `tab-change` |
| `cre8-modal` | `modal-close` |
| `cre8-chart` | `chart-click`, `chart-hover`, `chart-ready` |
| `cre8-pagination` | `pagination-change` |
| `cre8-split-button` | `split-button-text-click`, `split-button-dropdown-click` |

Two things the rule does *not* do, both of which are guessed wrong often:

- **There is no `cre8-` prefix.** The tag is namespaced; the event is not. It is
  `tab-change`, never `cre8-tab-change`.
- **Four components re-fire native form events and keep the native names.**
  `cre8-select`, `cre8-tag`, and `cre8-checkbox-field-item` emit `change`;
  `cre8-select-tile` emits `change` and `input`. These are deliberate re-fires so
  the components behave like native controls — `cre8-select` emits `change`, not
  `select-change` and emphatically not `cre8-change`. This is a list, **not** a
  rule about form components in general: `cre8-multi-select` is a Forms component
  and follows the normal convention with `multi-select-change`.

The full list is in [`reference/events.md`](reference/events.md), generated from
the catalog.

> **This changed.** Events previously used five conventions across these 16
> components — bare word, camelCase, kebab-case, `cre8-`-prefixed kebab, and
> dotted — with no rule mapping a component to its event name. The convention now
> lives in `CODE_GUIDELINES.md` under "Event names". Every renamed event is still
> dispatched under its old name for one major version, so existing **DOM**
> listeners keep working; the aliases are listed in `DEPRECATED_EVENT_ALIASES` in
> `components/cre8-element.ts`.
>
> **React consumers are not covered by that alias.** The wrappers' generated
> `on*` props were renamed along with the events — `onCloseModal` →
> `onModalClose`, `onSelectedItemsChange` → `onMultiSelectChange`,
> `onTabSelected` → `onTabSelect`, `onDropdownItemSelected` →
> `onDropdownItemSelect`. An old prop name is simply not a prop any more, and
> React will not warn. Migration table in `CHANGELOG.md`.

Whatever the name, you listen the same way: a plain DOM listener, the React
wrapper's generated `on*` prop, or an A2UI handler name.

Internally there are two paths, and the split is deliberate rather than untidy.
`Cre8Element.dispatch()` fires the event *and* its deprecated alias, so renamed
events keep old listeners working — `cre8-modal`, `cre8-chart`, and
`cre8-dropdown-item` go through it. `cre8-select`, `cre8-tag`, and
`cre8-checkbox-field-item` call `dispatchEvent` directly, which is correct for
them: they emit `change`, a native name that was never renamed, so there is no
alias to fire. If you are adding an event to a component, use the helper — the
class comment says so, and it is what keeps the deprecation window honest.

→ *For the A2UI form of this, see [Events and the return path](04-a2ui.md#events-and-the-return-path). For the
per-framework binding syntax, see [Usage in Other Frameworks](06-frameworks.md).*

## Compound components

Anything that needs internal structure is split into a parent and children, and
the children are named after the parent. This is a hard rule, and it is why the
component list looks longer than the number of concepts:

```html
<cre8-table>
  <cre8-table-header>
    <cre8-table-row><cre8-table-header-cell>Name</cre8-table-header-cell></cre8-table-row>
  </cre8-table-header>
  <cre8-table-body>
    <cre8-table-row><cre8-table-cell>Ada</cre8-table-cell></cre8-table-row>
  </cre8-table-body>
</cre8-table>
```

**Or pass the data instead.** Eleven families now take a data property that
builds that composition for you — `columns`/`rows` on a table, `items` on tabs,
accordions, lists, link lists, breadcrumbs, dropdowns and the field groups,
`tags` on a tag list, `steps` on progress steps:

```html
<cre8-table caption="Model performance" variant="striped"></cre8-table>
<script>
  document.querySelector('cre8-table').columns = [{ label: 'Model', key: 'model' }];
  document.querySelector('cre8-table').rows = [{ model: 'claude-3-5-sonnet' }];
</script>
```

The composition is generated into the **light DOM** — it is the markup above,
built for you, not a second rendering path. Every `::slotted()` rule, every
behaviour, and every consumer that reaches into the table keeps working, and the
generated elements are reconciled in place so updating a cell does not rebuild
the table under the user's cursor. Set neither property and the component is
exactly as it was; do not use both on one component.

Two things the data path also fixes, because the parent now owns the group:
a table stamps each cell with its column header (which `behavior="responsive"`
needs, and which by hand means restating every header on every row), and a radio
field enforces single selection — see the note in
[Provenance and drift](07-research.md#provenance-and-drift).

Two consequences that bite people:

1. **Children are not optional scaffolding.** `cre8-table-body` is not decoration
   around your rows; the parent's styles are written against that structure.
   Skipping a level produces a table that renders but is subtly wrong.
2. **Most compound children have no Storybook story**, because they cannot render
   alone and are documented through their parent. If you cannot find a story for
   `cre8-grid-item`, that is why, not an oversight. Five are exceptions —
   `accordion-item`, `checkbox-field-item`, `dropdown-item`, `radio-field-item`,
   and `table-object` each ship their own story, because each is meaningful
   enough on its own to demonstrate.

Compound *components* follow one shape: `component` / `component-item`
(`accordion` / `accordion-item`, `grid` / `grid-item`, `table` / `table-row`).

Container-ish components like `card` and `modal` are **not** compound — there is
no `cre8-card-header` element. They section their content with named slots
(`header`, `footer`) plus the default slot for the body. There is no `body`
slot; see [The three ways to pass content](02-composition-patterns.md#the-three-ways-to-pass-content).

→ *If you want to know which structures are required versus optional, see
[Composition rules that are not optional](02-composition-patterns.md#composition-rules-that-are-not-optional).*

## The two base classes

**`Cre8Element`** extends `LitElement` and adds four utilities that show up in
every component's generated docs:

- `componentClassNames(base, extra)` — class name assembly that folds in variants.
- `slotEmpty(name)` / `slotNotEmpty(name)` — conditional rendering based on
  whether the consumer passed anything into a slot. This is how components adapt
  their layout to what you gave them.
- `dispatch({ e, eventName, detailObj, optionsObj })` — the single sanctioned way
  a component emits an event.

**`Cre8FormElement`** extends `Cre8Element` and makes the element a
**form-associated custom element** (`static formAssociated = true`). This is the
part that matters most in practice: it is why a `cre8-field` inside a native
`<form>` participates in submission and reset like a real input,
instead of being invisible to the form the way a naive custom element is.

It also *provides* `ElementInternals` and form state to descendants through
`@lit/context` (`formInternalsContext`, `formStateContext`), which is how nested
sub-components — a field note, a validation message — stay in sync with the
control that owns them without prop-drilling.

One component sits a level deeper: `cre8-date-picker` extends **`Cre8Field`**,
which itself extends `Cre8FormElement`. So "every component extends one of the two
base classes" is true transitively, not literally — if you are grepping for
`extends Cre8FormElement` to find form controls, you will miss it.

→ *If your form submits nothing in a framework app, the cause is usually not this
class; see [The four interop problems](06-frameworks.md#the-four-interop-problems).*

## Support tiers

Components sit in one of three buckets, and the bucket is a promise about
maintenance, not about quality:

| Tier | Meaning |
|---|---|
| **cre8 Components** | Accepted, design-reviewed, accessibility-tested, bugs will be fixed |
| **Experimental** | On the roadmap, or a bare container outside design-system concerns. Bugs accepted, fixes not guaranteed |
| **Patterns** | Composite examples showing how components talk to each other — reference implementations for consuming teams |

**You cannot currently check which tier a component is in.** The guidelines
describe three directories, but `packages/cre8-wc/components/` is flat — every
component sits at the same level, and no manifest field records status. So treat
the tiers as a statement of intent rather than something you can look up, and ask
a maintainer before depending on anything unfamiliar in production. Recording
tier in the manifests would make this checkable; see
[Provenance and drift](07-research.md#provenance-and-drift).

## Accessibility posture

The guidelines commit to a specific position that is worth stating plainly,
because it constrains what you should ask for in a PR: **native elements are
preferred over custom ones wherever possible**, and ARIA is used but not abused.
A `cre8-field` wraps a real `<input>`. A `cre8-button` renders a real `<button>`.

What that buys you, verified against the component sources:

| Component | What it actually does |
|---|---|
| `cre8-button` | Renders a real `<button>`, swapping to `<a>` when `href` is set — so Enter/Space, focus, and disabled state are the browser's |
| `cre8-accordion-item` | Renders a real `<button>` for the trigger, and has **no keyboard handler at all** — because it does not need one |
| `cre8-tabs` | Has explicit arrow-key handling, because HTML has no tab widget and the ARIA APG pattern requires roving focus |
| `cre8-modal` | Genuine focus trapping via `@a11y/focus-trap`, plus Escape-to-close |
| `Cre8FormElement` | `attachInternals()`, `setFormValue()`, `formResetCallback()`, `setValidity()` — real form participation |

The contrast between the second and third rows is the whole policy in miniature:
**a component has keyboard code exactly when no native element gives it for
free.** If you are reviewing a new component and it hand-rolls key handling for
something a `<button>` would have done, that is the smell.

The practical implication is that most accessibility bugs in cre8 apps are
composition bugs, not component bugs — a heading level skipped, a landmark
missing, a label associated with nothing. The components are in decent shape; the
assembly is where it goes wrong. See
[Accessibility is a composition property](02-composition-patterns.md#accessibility-is-a-composition-property).

> **What this does not cover.** Component-level accessibility being sound is not
> the same as your page being accessible, and nothing here checks contrast (a
> theming concern — [Verifying a theme](03-token-theming.md#verifying-a-theme)) or focus visibility
> after a brand override. `kb:check` validates names and structure; it has no
> opinion about whether anyone can use the result.

→ *For the external checklists this posture is built on, see
[Accessibility](07-research.md#accessibility).*

## Where to go next

- Pick a component → [`reference/components.md`](reference/components.md)
- Look up its props, values, and defaults → [`reference/props.md`](reference/props.md)
- Find what you can style inside it → [`reference/parts.md`](reference/parts.md)
- Assemble them → [Composition Patterns](02-composition-patterns.md)
- Restyle them → [Token Theming](03-token-theming.md)
- Emit them from an agent → [A2UI — Agent-Generated UI](04-a2ui.md)
