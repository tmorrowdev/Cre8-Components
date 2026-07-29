---
title: A2UI Content Model
generated: true
generator: docs/kb/tools/generate-reference.mjs
source: packages/cre8-wc/a2ui/catalog.json
intents:
  - "should I use children or slots for this component"
  - "why does my spec fail with does not accept default children"
  - "which components are slot-only"
---

# A2UI Content Model

<!-- DO NOT EDIT BY HAND. Regenerate with: node docs/kb/tools/generate-reference.mjs -->

In the A2UI catalog, every component takes its content through **either
`children` or `slots` — never both**. Using the wrong one is a hard validation
error, and the split is not guessable from the component's name or purpose.

| Bucket | Count | Emit content as |
|---|---|---|
| Children-only | 47 | `"children": [...]` — `slots` is an error |
| Slot-only | 25 | `"slots": { "default": [...] }` — `children` is an error |
| Leaf (neither) | 13 | Neither; content comes from props |
| Both | 0 | — (the catalog never does this) |

Full rule and worked examples: [Children vs slots](../04-a2ui.md#children-vs-slots-the-rule-that-breaks-specs).

## Slot-only components

All 25 of them. Use `slots.default`, **not** `children`. Named slots each accepts.

**6 of these have no `default` slot at all** (marked below) — they
accept *no* free content in any form, and their visible text comes from props such
as `text` or `label`. `cre8-button` is the one that catches people: its label is
the `text` prop, not slotted content.


| Component | Slots | Note |
|---|---|---|
| `cre8-accordion-item` | `default`, `heading` |  |
| `cre8-alert` | `default`, `cta` |  |
| `cre8-button` | `before`, `after` | **no default slot** |
| `cre8-card` | `default`, `header`, `footer` |  |
| `cre8-checkbox-field-item` | `fieldNote` | **no default slot** |
| `cre8-date-picker` | `fieldNote` | **no default slot** |
| `cre8-field` | `fieldNote` | **no default slot** |
| `cre8-footer` | `default`, `top`, `bottom` |  |
| `cre8-global-nav-item` | `default`, `itemBefore`, `itemAfter` |  |
| `cre8-header` | `default`, `top`, `bottom` |  |
| `cre8-link` | `default`, `badge` |  |
| `cre8-link-list-item` | `default`, `itemBefore`, `itemAfter` |  |
| `cre8-modal` | `default`, `header`, `footer` |  |
| `cre8-multi-select` | `fieldNote` | **no default slot** |
| `cre8-page-header` | `default`, `titleAfter` |  |
| `cre8-popover` | `default`, `trigger`, `header`, `footer` |  |
| `cre8-primary-nav-item` | `default`, `itemBefore`, `itemAfter` |  |
| `cre8-section` | `default`, `header` |  |
| `cre8-select` | `fieldNote` | **no default slot** |
| `cre8-select-tile` | `default`, `header`, `footer`, `title`, `body` |  |
| `cre8-table-object` | `default`, `header`, `footer` |  |
| `cre8-table-row` | `default`, `expandableContent` |  |
| `cre8-tabs` | `default`, `panel` |  |
| `cre8-text-link` | `default`, `linkAfter` |  |
| `cre8-tooltip` | `default`, `trigger` |  |

## Leaf components

All 13 of them. These accept no child content at all. Everything they render comes from props
(`text`, `iconName`, `data`, …).

- `cre8-badge`
- `cre8-chart`
- `cre8-danger-button`
- `cre8-divider`
- `cre8-icon`
- `cre8-loading-spinner`
- `cre8-percent-bar`
- `cre8-progress-meter`
- `cre8-radio-field-item`
- `cre8-remove-tag`
- `cre8-skeleton-loader`
- `cre8-tag`
- `cre8-utility-nav-item`

## Children-only components

The remaining 47. Use `children`; passing `slots` is an error.

- `cre8-accordion`
- `cre8-band`
- `cre8-breadcrumbs`
- `cre8-breadcrumbs-item`
- `cre8-button-group`
- `cre8-checkbox-field`
- `cre8-dropdown`
- `cre8-dropdown-item`
- `cre8-feature`
- `cre8-field-note`
- `cre8-global-nav`
- `cre8-grid`
- `cre8-grid-item`
- `cre8-heading`
- `cre8-hero`
- `cre8-inline-alert`
- `cre8-layout`
- `cre8-layout-container`
- `cre8-layout-section`
- `cre8-linelength-container`
- `cre8-link-list`
- `cre8-list`
- `cre8-list-item`
- `cre8-logo`
- `cre8-main`
- `cre8-nav-container`
- `cre8-pagination`
- `cre8-primary-nav`
- `cre8-progress-steps`
- `cre8-progress-steps-item`
- `cre8-radio-field`
- `cre8-select-tile-list`
- `cre8-split-button`
- `cre8-submenu`
- `cre8-submenu-item`
- `cre8-tab`
- `cre8-tab-panel`
- `cre8-table`
- `cre8-table-body`
- `cre8-table-cell`
- `cre8-table-header`
- `cre8-table-header-cell`
- `cre8-tag-list`
- `cre8-tertiary-nav`
- `cre8-tertiary-nav-item`
- `cre8-text-passage`
- `cre8-utility-nav`
