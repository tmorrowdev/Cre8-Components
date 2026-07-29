---
title: Composition Patterns
intents:
  - "how do I build a page out of cre8 components"
  - "how do I lay out a form"
  - "how do I show tabular data"
  - "slot vs child vs prop"
  - "what nesting is required"
  - "why does my card header not appear"
see_also: [01-components, 04-a2ui, 06-frameworks]
sources:
  - packages/cre8-wc/mcp-manifest.json (patterns[])
  - packages/cre8-wc/components/card/card.ts
  - packages/cre8-wc/a2ui/examples/
---

# Composition Patterns

Individual components are the easy part. Screens fall apart at the seams — the
wrong container, content passed the wrong way, a nesting level skipped. This page
is about the seams.

Six canonical patterns ship as machine-readable templates in
`mcp-manifest.json` under `patterns[]`: **Login Form, Data Table, Page Layout,
Alert Banner, Tabbed Content, Modal Dialog**. Agents get them from
`get_patterns`; you can read them straight out of the manifest. They are minimal
by design — this page covers what they leave out.

> **The `Login Form` template used to be unusable** — no `<form>` element, no
> `type="submit"`, no `name` on the fields — so an agent that followed it produced
> a sign-in card that could not sign anyone in. It now has all three. The reason
> to know this: the template is *minimal*, and minimal markup in this system is
> often non-functional rather than merely plain. Read [Forms that behave](#forms-that-behave)
> before trusting any pattern as a starting point.

## The three ways to pass content

This is the decision you make dozens of times per screen, and getting it wrong is
the most common cause of "the component renders but looks empty."

| Mechanism | Syntax | Use when |
|---|---|---|
| **Prop** | `<cre8-badge text="Active">` | Content is a plain string with no markup |
| **Default slot** | `<cre8-card>…markup…</cre8-card>` | Content is the component's main body |
| **Named slot** | `<span slot="footer">…</span>` | Content belongs to a specific named region |

Rules of thumb:

- **If a prop exists for it, use the prop.** Props are what agents can emit
  reliably and what the A2UI catalog validates. Slotting a string where a prop
  exists works but produces markup that tools cannot check.
- **Named slots must be on the direct child.** `slot="footer"` on a
  grandchild does nothing. Wrap in a `<span slot="footer">` if you need to slot
  multiple elements.
- **A slot that gets nothing usually collapses.** Components with optional
  regions call `slotNotEmpty()` and skip the whole wrapper, which is why an empty
  header takes no space — it is not hidden, it was never rendered. This is not
  universal: 17 of the 85 components do it, which is roughly the set that has
  optional slots to begin with. If an empty region is leaving a gap, that
  component simply does not guard it.

> **Drift.** `cre8-card`'s JSDoc documents a `body` slot. The implementation uses
> the **unnamed default slot** for body content — `<div part="body"><slot></slot></div>`.
> `slot="body"` silently renders nothing. Put body content directly between the
> tags. `cre8-modal` behaves the same way: named `header` and `footer`, default
> slot for the body.

```html
<!-- Correct -->
<cre8-card>
  <span slot="header"><cre8-heading tagVariant="h3" type="title-default">Plan</cre8-heading></span>
  <cre8-text-passage>Body content goes in the default slot.</cre8-text-passage>
  <span slot="footer"><cre8-button text="Upgrade" variant="primary"></cre8-button></span>
</cre8-card>

<!-- Renders an empty card -->
<cre8-card>
  <div slot="body">This never appears.</div>
</cre8-card>
```

## Page scaffolds

The outer structure of every page follows one shape. Getting this right is what
makes headers stick, containers align, and footers sit where they should.

```html
<cre8-layout>
  <cre8-header>
    <cre8-global-nav>
      <span slot="logo"><cre8-logo></cre8-logo></span>
      <cre8-global-nav-item href="/">Home</cre8-global-nav-item>
    </cre8-global-nav>
  </cre8-header>

  <cre8-main>
    <cre8-layout-container>
      <cre8-layout-section>
        <!-- page content -->
      </cre8-layout-section>
    </cre8-layout-container>
  </cre8-main>

  <cre8-footer>
    <span slot="copyright">© 2026 Company</span>
  </cre8-footer>
</cre8-layout>
```

The three layout components are not interchangeable:

- **`cre8-layout`** — the page shell. One per page. Owns the header/main/footer
  vertical rhythm.
- **`cre8-layout-container`** — horizontal constraint and gutters. This is what
  stops content running to the viewport edge.
- **`cre8-layout-section`** — vertical rhythm between blocks of content within a
  page.

Add `cre8-band` when a section needs a full-bleed background (colored or branded
stripes that run edge to edge while their content stays contained), and
`cre8-linelength-container` when the content is prose — it constrains measure to a
readable line length, which `layout-container` does not do.

→ *If you want to know which of these exist and what else is in the Layout
category, see [`reference/components.md`](reference/components.md#layout).*

## Forms that behave

```html
<form id="signin">
  <cre8-card>
    <cre8-heading tagVariant="h2" type="headline-default">Sign In</cre8-heading>
    <cre8-field label="Email" name="email" type="email" required></cre8-field>
    <cre8-field label="Password" name="password" type="password" required></cre8-field>
    <cre8-field-note>We never share your address.</cre8-field-note>
    <cre8-button text="Sign In" variant="primary" fullWidth type="submit"></cre8-button>
  </cre8-card>
</form>
```

What makes this work rather than merely look right:

- **Set `type="submit"` on the submit button.** `cre8-button` defaults to
  `type="button"`, and its click handler only calls `formSubmit()` when `type`
  is `submit`. Omit it and you get a button that looks like a submit button,
  passes review, and does nothing. This is the single most common reason a cre8
  form "does not work."

  Note this differs from a native `<button>`, which defaults to `submit` inside a
  form — and that mismatch is exactly why it catches people. The default is a
  **decided** one, not an oversight: changing it would silently start submitting
  every untyped button already sitting in a form. `CODE_GUIDELINES.md` records
  the reasoning under "`cre8-button` defaults to `type="button"`, and stays that
  way", so do not expect it to change.
- **Give every control a `name`.** `Cre8FormElement` calls
  `setFormValue()`, but a form-associated custom element contributes to the form
  data set **under its `name`** — with no `name`, the value is set and then goes
  nowhere, and `new FormData(form)` comes back empty. A form of correctly
  validating, correctly labelled fields can still submit nothing.
- **Wrap in a real `<form>`.** cre8 form components extend `Cre8FormElement`,
  which calls `attachInternals()` and `setFormValue()` and implements
  `formResetCallback()`. Inside a native form they genuinely participate in
  submission and reset, and `new FormData(form)` sees their values. Outside one,
  they are inert controls you have to wire by hand. Note also that a `<button>`
  inside a component's shadow root does **not** submit an ancestor light-DOM
  form; that is why `cre8-button` reaches the form through `_internals.form` and
  calls `requestSubmit()` itself.
- **`required` does not block submission — enforce it yourself.**
  `Cre8FormElement` calls `setValidity()` from exactly one place,
  `setCustomValidity()`. `required`, `pattern`, `min`, `max` and `type="email"`
  are forwarded to the inner `<input>`, but that input is in the shadow root and
  its native validity never reaches the host's `ElementInternals`. An empty
  `required` cre8 field reports `validity.valueMissing === false`, passes
  `form.checkValidity()`, and submits. The attributes above are still worth
  setting — they carry the semantics and the a11y — but the enforcement has to
  come from `setCustomValidity()` on input/blur, or from the `submit` handler.
- **Use `label`, not a separate heading.** The label prop produces a properly
  associated `<label>`. A `cre8-heading` above a field is decoration; screen
  readers will not connect them.
- **Group related controls.** `cre8-radio-field` and `cre8-checkbox-field` are the
  group; `-item` children are the options. The group carries the `legend` — this
  is the fieldset semantics, and skipping the group breaks it.
- **Validation messages belong to the field.** `cre8-field-note` next to the
  control it describes; `cre8-inline-alert` for errors that concern the form as a
  whole.

→ *If the form submits an empty payload in React or Next.js, the cause is almost
certainly interop, not composition — see [The four interop problems](06-frameworks.md#the-four-interop-problems).*

## Data display

```html
<cre8-table variant="striped" isHoverable>
  <cre8-table-header>
    <cre8-table-row>
      <cre8-table-header-cell>Name</cre8-table-header-cell>
      <cre8-table-header-cell>Status</cre8-table-header-cell>
    </cre8-table-row>
  </cre8-table-header>
  <cre8-table-body>
    <cre8-table-row>
      <cre8-table-cell>Ada Lovelace</cre8-table-cell>
      <cre8-table-cell><cre8-badge text="Active" status="success"></cre8-badge></cre8-table-cell>
    </cre8-table-row>
  </cre8-table-body>
</cre8-table>
```

Choosing the right container for a collection:

| Shape of the data | Component |
|---|---|
| Records with shared columns | `cre8-table` |
| Sequence of similar items, no columns | `cre8-list` + `cre8-list-item` |
| Navigation targets | `cre8-link-list` + `cre8-link-list-item` |
| Selectable options presented as cards | `cre8-select-tile-list` + `cre8-select-tile` |
| Removable chips (filters, tags) | `cre8-tag-list` + `cre8-tag` / `cre8-remove-tag` |
| Quantitative comparison | `cre8-chart` |

Two things the manifest template does not tell you: header cells must live inside
`cre8-table-header`, not just be the first row of the body — that is where the
`<th>` semantics come from. And `cre8-table-object` is the wrapper you want when
the table needs to scroll horizontally on small screens rather than squash.
(`cre8-table`'s own `behavior="responsive"` is a separate mechanism for stacking
cells on narrow screens — the two are alternatives, not layers; pick one.)

> **`cre8-badge` `status` takes one of five values** — `success`, `warning`,
> `error`, `info`, `attention`. It is now a typed union, so the catalog
> enumerates it and `validate_a2ui_spec` rejects anything else. It was previously
> typed `status: string`, which meant any value validated and anything outside
> the five rendered with no status styling at all — a good illustration of why
> [What validation cannot catch](04-a2ui.md#what-validation-cannot-catch) is worth reading.

## Feedback placement

Where a message goes changes what it means. Pick by scope, not by looks:

| Scope | Component | Placement |
|---|---|---|
| Whole site or page, announcement | `cre8-alert` `variant="banner"` | Above the header |
| Whole page, consequence of an action | `cre8-alert` `variant="standalone"` | Top of main content |
| One section or one form | `cre8-inline-alert` | Directly above the affected block |
| One field | `cre8-field-note` | Attached to the control |
| Status of one record | `cre8-badge` | In the row or card |
| Work in progress, known duration | `cre8-progress-meter` / `cre8-percent-bar` | Where the result will appear |
| Work in progress, unknown duration | `cre8-loading-spinner` | Where the result will appear |
| Content loading, layout known | `cre8-skeleton-loader` | In place of the content |

The last two are a real distinction: a skeleton preserves layout and prevents
shift; a spinner does not. If you know the shape of what is coming, use the
skeleton.

## Composition rules that are not optional

These are the ones that produce broken output rather than ugly output.

1. **Compound children must be direct children of their parent.**
   `cre8-tab` inside `cre8-tabs`, `cre8-accordion-item` inside `cre8-accordion`.
   Wrapping them in a `<div>` breaks the parent's ability to coordinate them.
2. **Do not nest disclosure inside disclosure.** Accordion inside accordion is
   called out explicitly in the component docs as against UX best practice. The
   same reasoning applies to a modal opening a modal.
3. **One primary button per screen.** From the button guidelines. Multiple
   primaries means no primary.
4. **Do not mix button sizes within a group.** Pair like with like inside a
   `cre8-button-group`.
5. **Always set `type` on a heading.** `tagVariant` sets the HTML element
   (`h1`–`h6`, default `h5`) for the document outline; `type` sets the visual
   scale. Choose `tagVariant` from the page hierarchy and `type` from the
   design.

   The trap is what happens when you omit `type`: `cre8-heading` falls back to
   deriving size from `tagVariant` (`h1` → headline-large … `h6` →
   title-small). Fixing your document outline then silently resizes the text,
   which is how a correct-looking page ends up with an unnavigable heading
   structure — nobody wants to change `h3` to `h2` when it visibly changes the
   design. Set both and the coupling disappears: when `type` is present, the
   `tagVariant` size mapping is suppressed entirely.
6. **Do not combine brand styles.** Even on a co-branded page, use one brand's
   styles. See [Token Theming](03-token-theming.md).

## Accessibility is a composition property

The components carry ARIA, focus management (`@a11y/focus-trap` in modals),
keyboard handling, and screen reader support. What they cannot carry is anything
that depends on *where they are on your page*:

- Heading levels forming a correct outline (rule 5 above).
- Landmarks appearing once: one `cre8-header`, one `cre8-main`, one
  `cre8-footer` per page.
- Labels associated with the controls they describe.
- Focus order matching visual order.
- Live regions announcing the right thing at the right time.

Every one of these is a composition decision. A page of perfectly accessible
components can still be unusable.

→ *For the checklists behind this, see [Accessibility](07-research.md#accessibility).*

## Worked examples

Four complete compositions ship as A2UI specs in
`packages/cre8-wc/a2ui/examples/`. They are the best available answer to "what
does a real page look like in this system," and because they are A2UI specs they
are machine-checkable. Checked against the shipped catalog:

| Example | Validates |
|---|---|
| `portfolio.json` | yes |
| `card-gallery.json` | yes |
| `dating-grid.json` | yes |
| `llm-observability.json` | yes |

`llm-observability.json` has failed this check twice, and both failures are worth
knowing. It first nested cells as `children` under `cre8-table-row`, which the
catalog models as slot-only; its rows now correctly use `slots.default`
([Children vs slots: the rule that breaks specs](04-a2ui.md#children-vs-slots-the-rule-that-breaks-specs)).

It then failed with `tagVariant: "p"` on the `cre8-heading` in each KPI tile — an
attempt at headline-scale type for a value like `$38.42` **without** emitting a
heading. The instinct is right (a metric is not a heading, and marking it as one
corrupts the document outline) but `tagVariant` accepts only `h1`–`h6`. It now
uses `h4`, which validates and is a pragmatic compromise rather than a real
answer: the library has no headline-scale non-heading, since `cre8-text-passage`
stops at `large`. Recorded in [Provenance and drift](07-research.md#provenance-and-drift).

Re-run this check yourself with `pnpm kb:check`, which validates every shipped
example and every A2UI spec embedded in this knowledge base.

→ *If you want to render or validate those, see [Validation](04-a2ui.md#validation).*
