---
title: Event Reference
generated: true
generator: docs/kb/tools/generate-reference.mjs
source: packages/cre8-wc/a2ui/catalog.json (x-events)
intents:
  - "what event does this component emit"
  - "what is the event name for a cre8 component"
  - "how do I listen for a change on cre8-select"
---

# Event Reference

<!-- DO NOT EDIT BY HAND. Regenerate with: node docs/kb/tools/generate-reference.mjs -->

16 of 85 components emit events.

**Names are `component-action` kebab-case.** `cre8-tabs` emits `tab-change`,
`cre8-modal` emits `modal-close`. There is **no `cre8-` prefix** on events — the
tag is namespaced, the event is not. The exception is the form components, which
re-fire native events under their native names: `cre8-select` emits `change`,
not `select-change` and emphatically not `cre8-change`. Observed styles in the
table below: kebab-case, single word. See
[how events are named](../01-components.md#events-are-named-component-action).

| Component | Event | React prop |
|---|---|---|
| `cre8-chart` | `chart-click` | `onChartClick` |
| `cre8-chart` | `chart-hover` | `onChartHover` |
| `cre8-chart` | `chart-ready` | `onChartReady` |
| `cre8-checkbox-field-item` | `change` | `onChange` |
| `cre8-dropdown-item` | `dropdown-item-select` | `onDropdownItemSelect` |
| `cre8-modal` | `modal-close` | `onModalClose` |
| `cre8-multi-select` | `multi-select-change` | `onMultiSelectChange` |
| `cre8-pagination` | `pagination-change` | `onPaginationChange` |
| `cre8-percent-bar` | `percent-bar-left-action-click` | `onPercentBarLeftActionClick` |
| `cre8-popover` | `popover-open` | `onPopoverOpen` |
| `cre8-popover` | `popover-close` | `onPopoverClose` |
| `cre8-remove-tag` | `remove-tag-click` | `onRemoveTagClick` |
| `cre8-select` | `change` | `onChange` |
| `cre8-select-tile` | `change` | `onChange` |
| `cre8-select-tile` | `input` | `onInput` |
| `cre8-split-button` | `split-button-text-click` | `onSplitButtonTextClick` |
| `cre8-split-button` | `split-button-dropdown-click` | `onSplitButtonDropdownClick` |
| `cre8-tab` | `tab-select` | `onTabSelect` |
| `cre8-tabs` | `tab-change` | `onTabChange` |
| `cre8-tag` | `change` | `onChange` |
| `cre8-tooltip` | `tooltip-open` | `onTooltipOpen` |
| `cre8-tooltip` | `tooltip-close` | `onTooltipClose` |

## How to listen

**Plain DOM / Vue / Angular / Svelte** — a normal DOM event listener:

```js
document.querySelector('cre8-select').addEventListener('change', (e) => console.log(e.detail));
```

**React** — use the `@tmorrow/cre8-react` wrapper, which maps each event onto the
`on*` prop in the third column above. The names were renamed alongside the events
and are **not** aliased, unlike DOM listeners — see
[how events are named](../01-components.md#events-are-named-component-action).

**A2UI** — declare a handler *name*, never a function. The renderer routes it to
your `onEvent` callback. See [Events and the return path](../04-a2ui.md#events-and-the-return-path).

```json
{ "component": "cre8-select", "props": { "label": "Plan" }, "events": { "change": "plan-selected" } }
```

## All event names

- `change` — single word
- `chart-click` — kebab-case
- `chart-hover` — kebab-case
- `chart-ready` — kebab-case
- `dropdown-item-select` — kebab-case
- `input` — single word
- `modal-close` — kebab-case
- `multi-select-change` — kebab-case
- `pagination-change` — kebab-case
- `percent-bar-left-action-click` — kebab-case
- `popover-close` — kebab-case
- `popover-open` — kebab-case
- `remove-tag-click` — kebab-case
- `split-button-dropdown-click` — kebab-case
- `split-button-text-click` — kebab-case
- `tab-change` — kebab-case
- `tab-select` — kebab-case
- `tooltip-close` — kebab-case
- `tooltip-open` — kebab-case
