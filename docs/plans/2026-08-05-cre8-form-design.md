# cre8-form — Design

**Date:** 2026-08-05
**Status:** Approved, not yet implemented
**Package:** `packages/cre8-wc`

## Problem

The library has eight form-associated controls (`button`, `checkbox-field-item`,
`danger-button`, `field`, `radio-field-item`, `select`, `select-tile`, `tag`) that
extend the abstract `Cre8FormElement` base class. Each is individually form-aware:
it sets `formAssociated = true`, calls `attachInternals()`, and provides
`formInternalsContext` / `formStateContext` downward to its own descendants.

Nothing composes them as a group. There is no `cre8-form` element, so the design
system has no home for the concerns that belong to a form rather than to a single
control:

- aggregate validation on submit
- submit / reset orchestration
- a group-level disabled ("submitting") state
- a standard layout shell for form content

This shows up in the knowledge graph as `Cre8FormElement` having high betweenness
centrality with no community around it — the controls share a base class, but no
node represents an actual form.

## Decisions

### 1. Native `<form>`-backed, not a JS value model

`cre8-form` renders a real `<form>` element and lets the platform collect values.
Because the controls are already form-associated, the browser routes their values
into `FormData` via `ElementInternals.setFormValue()` with no extra code.

Rejected: a JS-managed `values` object with controls registering upward. It
re-implements what the platform already provides and risks drifting from
`ElementInternals`.

**Verified:** `cre8-button` already calls `this._internals.form.requestSubmit()`
and `form.reset()` based on its `type` property
(`components/button/button.ts:277-286`). Given a real form ancestor, submit and
reset work with **no changes to any existing component**.

### 2. Light DOM, not shadow DOM

`cre8-form` overrides `createRenderRoot()` to return `this`.

This is a deliberate deviation from the shadow-DOM pattern the other components
use, and it is forced by decision 1. A form-associated control's form owner is the
nearest `<form>` **in its own node tree**, not the flattened/slotted tree. With
shadow DOM plus `<slot>`, author content stays in light DOM while the `<form>`
lives in the shadow root — so the form would own nothing and `new FormData(form)`
would return empty.

Light DOM also lets consumers wrap fields in `cre8-grid` or `cre8-layout` to
control form layout. Slotting does not move nodes in the node tree, so controls
nested inside those layout components remain light-DOM descendants of the form and
keep their form ownership.

Cost: no style encapsulation for `cre8-form` itself. Acceptable — it is a
structural wrapper, and each control keeps its own shadow DOM and styles.

### 3. Block-and-focus validation, reusing existing control error UI

On invalid submit, `cre8-form` sets each failing control's `isError` property so
its existing inline error rendering appears, then focuses the first invalid
control. No new error UI is introduced.

Rejected for now: a dedicated error-summary region (WCAG error-identification
pattern). Worth adding later for long forms; it is a new sub-surface to design,
style, and test, and is not needed for the first version.

## Architecture

Standard component layout, matching the rest of the library:

```
components/form/
  form.ts            Cre8Form, extends Cre8Element
  form.styles.ts
  form.module.scss   .cre8-c-form — optional layout spacing via design tokens
  form.stories.ts
  test/
```

Self-registers as `cre8-form` behind the usual
`if (customElements.get('cre8-form') === undefined)` guard.

On first connect, `cre8-form` wraps its existing children in a real `<form>`
element, moving them in once. The controls then genuinely belong to that form.

## API

```html
<cre8-form
  novalidate    <!-- skip aggregate validation -->
  disabled      <!-- disable all controls, e.g. while submitting -->
>
  <cre8-grid>
    <cre8-field name="email" required></cre8-field>
  </cre8-grid>
  <cre8-button type="submit">Save</cre8-button>
</cre8-form>
```

### Events

Named `<component>-<action>` in kebab-case, matching the existing convention
(`tab-select`, `popover-open`, `multi-select-change`). All `bubbles` and
`composed`.

| Event | Detail | Fired when |
| --- | --- | --- |
| `form-submit` | `{ data: FormData, values, form }` | Submit attempted and all controls valid |
| `form-invalid` | `{ invalidControls }` | Submit attempted with one or more invalid controls |
| `form-reset` | — | Form reset |

### Methods and properties

- `checkValidity()` — boolean, no UI side effects
- `reportValidity()` — boolean, sets `isError` and focuses the first invalid control
- `reset()`
- `submit()`
- `values` getter — plain object derived from `FormData`

## Submit flow

1. Listen for the native `submit` event on the wrapped `<form>`; always
   `preventDefault()` — the component never performs a native navigation.
2. If `novalidate`, emit `form-submit` immediately.
3. Otherwise collect participating controls and call `checkValidity()` on each.
4. If any are invalid: set `isError = true` on each failing control, `focus()` the
   first, emit `form-invalid`.
5. If all valid: clear `isError`, build `FormData`, emit `form-submit`.

## Control discovery

Query `this.querySelectorAll()` and keep elements whose `_internals.form` is the
wrapped form element. This reaches through `cre8-grid` / `cre8-layout` nesting
because those components do not move nodes out of the light-DOM tree, and it
naturally excludes controls belonging to some other nested form.

## Testing

Jest with jsdom, following the existing `test/` convention:

- form ownership survives nesting inside `cre8-grid` / `cre8-layout`
- `FormData` contains the expected values from participating controls
- invalid submit blocks, sets `isError`, and focuses the first invalid control
- `novalidate` bypasses aggregate validation
- reset restores default values and emits `form-reset`
- event payload shapes for `form-submit` and `form-invalid`
- `disabled` propagates to child controls

Note: jsdom's support for `ElementInternals` and form association is limited;
where it falls short, assert against the component's own control registry rather
than the browser's `FormData` behaviour, and cover the rest in Storybook.

## Out of scope (YAGNI)

- error summary region
- cross-field validation rules
- async / server-side validation
- dirty-state tracking and unsaved-changes prompts
