---
title: A2UI Content Model
generated: true
generator: docs/kb/tools/generate-reference.mjs
source: packages/cre8-wc/a2ui/catalog.json
intents:
  - "should I use children or slots for this component"
  - "why does my spec fail with does not accept default children"
  - "which components are slot-only"
  - "which components can go in this slot"
  - "why does my spec fail with is not eligible in"
---

# A2UI Content Model

<!-- DO NOT EDIT BY HAND. Regenerate with: node docs/kb/tools/generate-reference.mjs -->

In the A2UI catalog, every component takes its content through **either
`children` or `slots` — never both**. Using the wrong one is a hard validation
error, and the split is not guessable from the component's name or purpose.

| Bucket | Count | Emit content as |
|---|---|---|
| Children-only | 50 | `"children": [...]` — `slots` is an error |
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

The remaining 50. Use `children`; passing `slots` is an error.

- `cre8-accordion`
- `cre8-band`
- `cre8-breadcrumbs`
- `cre8-breadcrumbs-item`
- `cre8-button-group`
- `cre8-checkbox-field`
- `cre8-container`
- `cre8-container-grid`
- `cre8-dropdown`
- `cre8-dropdown-item`
- `cre8-feature`
- `cre8-field-note`
- `cre8-form`
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

## What each slot accepts

Knowing *whether* a component takes `children` or `slots` is half the rule; the
other half is *which* components a region holds. That is authored per region in
`packages/cre8-wc/a2ui/slot-eligibility.json`, compiled into the catalog as a
per-slot `oneOf` (and `x-accepts`), and enforced by `validateSpec` / the
`validate_a2ui_spec` tool: a component outside the list fails with
`… is not eligible in <parent>.<region>`, and a bare string in a region that is
not marked **text** fails with `… does not accept literal text`. `get_composition`
returns the same lists as `eligibleChildren`.

108 regions across 75 components.
Regions marked **text** also accept literal strings.

| Component | Region | Accepts | Text |
|---|---|---|---|
| `cre8-accordion` | `children` | `cre8-accordion-item` |  |
| `cre8-accordion-item` | `default` | `cre8-accordion`, `cre8-alert`, `cre8-badge`, `cre8-button`, `cre8-button-group`, `cre8-card`, `cre8-chart`, `cre8-checkbox-field`, `cre8-container`, `cre8-danger-button`, `cre8-date-picker`, `cre8-divider`, `cre8-field`, `cre8-field-note`, `cre8-form`, `cre8-grid`, `cre8-heading`, `cre8-inline-alert`, `cre8-link`, `cre8-link-list`, `cre8-list`, `cre8-loading-spinner`, `cre8-multi-select`, `cre8-percent-bar`, `cre8-progress-meter`, `cre8-radio-field`, `cre8-remove-tag`, `cre8-select`, `cre8-select-tile-list`, `cre8-skeleton-loader`, `cre8-split-button`, `cre8-table`, `cre8-table-object`, `cre8-tabs`, `cre8-tag`, `cre8-tag-list`, `cre8-text-link`, `cre8-text-passage` | **text** |
| `cre8-accordion-item` | `heading` | `cre8-badge`, `cre8-heading`, `cre8-icon`, `cre8-tag` | **text** |
| `cre8-alert` | `default` | `cre8-heading`, `cre8-link`, `cre8-list`, `cre8-text-link`, `cre8-text-passage` | **text** |
| `cre8-alert` | `cta` | `cre8-button`, `cre8-button-group`, `cre8-link`, `cre8-text-link` |  |
| `cre8-band` | `children` | `cre8-button-group`, `cre8-card`, `cre8-container`, `cre8-feature`, `cre8-grid`, `cre8-heading`, `cre8-hero`, `cre8-layout-container`, `cre8-linelength-container`, `cre8-section`, `cre8-text-passage` |  |
| `cre8-breadcrumbs` | `children` | `cre8-breadcrumbs-item` |  |
| `cre8-breadcrumbs-item` | `children` | `cre8-link`, `cre8-text-link` | **text** |
| `cre8-button` | `before` | `cre8-icon`, `cre8-loading-spinner` |  |
| `cre8-button` | `after` | `cre8-icon`, `cre8-loading-spinner` |  |
| `cre8-button-group` | `children` | `cre8-button`, `cre8-danger-button`, `cre8-dropdown`, `cre8-link`, `cre8-popover`, `cre8-split-button`, `cre8-text-link`, `cre8-tooltip` |  |
| `cre8-card` | `default` | `cre8-accordion`, `cre8-alert`, `cre8-badge`, `cre8-button`, `cre8-button-group`, `cre8-chart`, `cre8-checkbox-field`, `cre8-container`, `cre8-danger-button`, `cre8-date-picker`, `cre8-divider`, `cre8-dropdown`, `cre8-feature`, `cre8-field`, `cre8-field-note`, `cre8-form`, `cre8-grid`, `cre8-heading`, `cre8-icon`, `cre8-inline-alert`, `cre8-link`, `cre8-link-list`, `cre8-list`, `cre8-loading-spinner`, `cre8-multi-select`, `cre8-percent-bar`, `cre8-popover`, `cre8-progress-meter`, `cre8-radio-field`, `cre8-remove-tag`, `cre8-select`, `cre8-select-tile-list`, `cre8-skeleton-loader`, `cre8-split-button`, `cre8-table`, `cre8-table-object`, `cre8-tabs`, `cre8-tag`, `cre8-tag-list`, `cre8-text-link`, `cre8-text-passage`, `cre8-tooltip` | **text** |
| `cre8-card` | `header` | `cre8-badge`, `cre8-chart`, `cre8-feature`, `cre8-heading`, `cre8-icon`, `cre8-logo`, `cre8-tag`, `cre8-text-passage` | **text** |
| `cre8-card` | `footer` | `cre8-badge`, `cre8-button`, `cre8-button-group`, `cre8-danger-button`, `cre8-divider`, `cre8-link`, `cre8-tag`, `cre8-tag-list`, `cre8-text-link`, `cre8-text-passage` | **text** |
| `cre8-checkbox-field` | `children` | `cre8-checkbox-field-item` |  |
| `cre8-checkbox-field-item` | `fieldNote` | `cre8-field-note`, `cre8-link`, `cre8-text-link` | **text** |
| `cre8-container` | `children` | `cre8-accordion`, `cre8-alert`, `cre8-badge`, `cre8-breadcrumbs`, `cre8-button`, `cre8-button-group`, `cre8-card`, `cre8-chart`, `cre8-checkbox-field`, `cre8-container`, `cre8-container-grid`, `cre8-danger-button`, `cre8-date-picker`, `cre8-divider`, `cre8-dropdown`, `cre8-feature`, `cre8-field`, `cre8-field-note`, `cre8-form`, `cre8-grid`, `cre8-heading`, `cre8-hero`, `cre8-icon`, `cre8-inline-alert`, `cre8-layout-container`, `cre8-layout-section`, `cre8-linelength-container`, `cre8-link`, `cre8-link-list`, `cre8-list`, `cre8-loading-spinner`, `cre8-logo`, `cre8-modal`, `cre8-multi-select`, `cre8-page-header`, `cre8-pagination`, `cre8-percent-bar`, `cre8-popover`, `cre8-progress-meter`, `cre8-progress-steps`, `cre8-radio-field`, `cre8-remove-tag`, `cre8-section`, `cre8-select`, `cre8-select-tile-list`, `cre8-skeleton-loader`, `cre8-split-button`, `cre8-table`, `cre8-table-object`, `cre8-tabs`, `cre8-tag`, `cre8-tag-list`, `cre8-tertiary-nav`, `cre8-text-link`, `cre8-text-passage`, `cre8-tooltip` | **text** |
| `cre8-container-grid` | `children` | `cre8-button-group`, `cre8-card`, `cre8-chart`, `cre8-container`, `cre8-date-picker`, `cre8-feature`, `cre8-field`, `cre8-heading`, `cre8-link-list`, `cre8-list`, `cre8-multi-select`, `cre8-select`, `cre8-select-tile`, `cre8-text-passage` |  |
| `cre8-date-picker` | `fieldNote` | `cre8-field-note`, `cre8-link`, `cre8-text-link` | **text** |
| `cre8-dropdown` | `children` | `cre8-dropdown-item` |  |
| `cre8-dropdown-item` | `children` | `cre8-badge`, `cre8-icon`, `cre8-link`, `cre8-text-link` | **text** |
| `cre8-feature` | `children` | `cre8-badge`, `cre8-button`, `cre8-button-group`, `cre8-heading`, `cre8-icon`, `cre8-link`, `cre8-logo`, `cre8-tag`, `cre8-text-link`, `cre8-text-passage` | **text** |
| `cre8-field` | `fieldNote` | `cre8-field-note`, `cre8-link`, `cre8-text-link` | **text** |
| `cre8-field-note` | `children` | `cre8-icon`, `cre8-link`, `cre8-text-link` | **text** |
| `cre8-footer` | `default` | `cre8-button-group`, `cre8-container`, `cre8-container-grid`, `cre8-divider`, `cre8-grid`, `cre8-heading`, `cre8-layout-container`, `cre8-link`, `cre8-link-list`, `cre8-list`, `cre8-logo`, `cre8-tertiary-nav`, `cre8-text-link`, `cre8-text-passage`, `cre8-utility-nav` | **text** |
| `cre8-footer` | `top` | `cre8-button-group`, `cre8-divider`, `cre8-heading`, `cre8-link-list`, `cre8-logo`, `cre8-text-passage`, `cre8-utility-nav` | **text** |
| `cre8-footer` | `bottom` | `cre8-divider`, `cre8-link`, `cre8-link-list`, `cre8-logo`, `cre8-text-link`, `cre8-text-passage`, `cre8-utility-nav` | **text** |
| `cre8-form` | `children` | `cre8-accordion`, `cre8-alert`, `cre8-button`, `cre8-button-group`, `cre8-card`, `cre8-checkbox-field`, `cre8-container`, `cre8-container-grid`, `cre8-danger-button`, `cre8-date-picker`, `cre8-divider`, `cre8-field`, `cre8-field-note`, `cre8-grid`, `cre8-heading`, `cre8-inline-alert`, `cre8-layout-section`, `cre8-multi-select`, `cre8-radio-field`, `cre8-section`, `cre8-select`, `cre8-select-tile-list`, `cre8-tabs`, `cre8-text-passage` |  |
| `cre8-global-nav` | `children` | `cre8-global-nav-item` |  |
| `cre8-global-nav-item` | `default` | `cre8-link`, `cre8-text-link` | **text** |
| `cre8-global-nav-item` | `itemBefore` | `cre8-badge`, `cre8-icon`, `cre8-logo` |  |
| `cre8-global-nav-item` | `itemAfter` | `cre8-badge`, `cre8-icon`, `cre8-tag` |  |
| `cre8-grid` | `children` | `cre8-grid-item` |  |
| `cre8-grid-item` | `children` | `cre8-accordion`, `cre8-alert`, `cre8-badge`, `cre8-breadcrumbs`, `cre8-button`, `cre8-button-group`, `cre8-card`, `cre8-chart`, `cre8-checkbox-field`, `cre8-container`, `cre8-container-grid`, `cre8-danger-button`, `cre8-date-picker`, `cre8-divider`, `cre8-dropdown`, `cre8-feature`, `cre8-field`, `cre8-field-note`, `cre8-form`, `cre8-grid`, `cre8-heading`, `cre8-hero`, `cre8-icon`, `cre8-inline-alert`, `cre8-layout-container`, `cre8-layout-section`, `cre8-linelength-container`, `cre8-link`, `cre8-link-list`, `cre8-list`, `cre8-loading-spinner`, `cre8-logo`, `cre8-modal`, `cre8-multi-select`, `cre8-page-header`, `cre8-pagination`, `cre8-percent-bar`, `cre8-popover`, `cre8-progress-meter`, `cre8-progress-steps`, `cre8-radio-field`, `cre8-remove-tag`, `cre8-section`, `cre8-select`, `cre8-select-tile-list`, `cre8-skeleton-loader`, `cre8-split-button`, `cre8-table`, `cre8-table-object`, `cre8-tabs`, `cre8-tag`, `cre8-tag-list`, `cre8-tertiary-nav`, `cre8-text-link`, `cre8-text-passage`, `cre8-tooltip` | **text** |
| `cre8-header` | `default` | `cre8-button`, `cre8-button-group`, `cre8-dropdown`, `cre8-field`, `cre8-global-nav`, `cre8-heading`, `cre8-icon`, `cre8-link`, `cre8-logo`, `cre8-nav-container`, `cre8-popover`, `cre8-primary-nav`, `cre8-text-link`, `cre8-utility-nav` | **text** |
| `cre8-header` | `top` | `cre8-alert`, `cre8-inline-alert`, `cre8-link`, `cre8-logo`, `cre8-text-link`, `cre8-text-passage`, `cre8-utility-nav` | **text** |
| `cre8-header` | `bottom` | `cre8-breadcrumbs`, `cre8-field`, `cre8-global-nav`, `cre8-nav-container`, `cre8-primary-nav`, `cre8-tabs`, `cre8-tertiary-nav` | **text** |
| `cre8-heading` | `children` | `cre8-badge`, `cre8-icon`, `cre8-link`, `cre8-tag`, `cre8-text-link`, `cre8-tooltip` | **text** |
| `cre8-hero` | `children` | `cre8-badge`, `cre8-breadcrumbs`, `cre8-button`, `cre8-button-group`, `cre8-field`, `cre8-form`, `cre8-heading`, `cre8-link`, `cre8-logo`, `cre8-tag`, `cre8-text-link`, `cre8-text-passage` | **text** |
| `cre8-inline-alert` | `children` | `cre8-heading`, `cre8-icon`, `cre8-link`, `cre8-text-link`, `cre8-text-passage` | **text** |
| `cre8-layout` | `children` | `cre8-band`, `cre8-footer`, `cre8-header`, `cre8-layout-container`, `cre8-layout-section`, `cre8-main`, `cre8-nav-container` |  |
| `cre8-layout-container` | `children` | `cre8-accordion`, `cre8-alert`, `cre8-badge`, `cre8-breadcrumbs`, `cre8-button`, `cre8-button-group`, `cre8-card`, `cre8-chart`, `cre8-checkbox-field`, `cre8-container`, `cre8-container-grid`, `cre8-danger-button`, `cre8-date-picker`, `cre8-divider`, `cre8-dropdown`, `cre8-feature`, `cre8-field`, `cre8-field-note`, `cre8-form`, `cre8-grid`, `cre8-heading`, `cre8-hero`, `cre8-icon`, `cre8-inline-alert`, `cre8-layout-container`, `cre8-layout-section`, `cre8-linelength-container`, `cre8-link`, `cre8-link-list`, `cre8-list`, `cre8-loading-spinner`, `cre8-logo`, `cre8-modal`, `cre8-multi-select`, `cre8-page-header`, `cre8-pagination`, `cre8-percent-bar`, `cre8-popover`, `cre8-progress-meter`, `cre8-progress-steps`, `cre8-radio-field`, `cre8-remove-tag`, `cre8-section`, `cre8-select`, `cre8-select-tile-list`, `cre8-skeleton-loader`, `cre8-split-button`, `cre8-table`, `cre8-table-object`, `cre8-tabs`, `cre8-tag`, `cre8-tag-list`, `cre8-tertiary-nav`, `cre8-text-link`, `cre8-text-passage`, `cre8-tooltip` | **text** |
| `cre8-layout-section` | `children` | `cre8-accordion`, `cre8-alert`, `cre8-badge`, `cre8-band`, `cre8-breadcrumbs`, `cre8-button`, `cre8-button-group`, `cre8-card`, `cre8-chart`, `cre8-checkbox-field`, `cre8-container`, `cre8-container-grid`, `cre8-danger-button`, `cre8-date-picker`, `cre8-divider`, `cre8-dropdown`, `cre8-feature`, `cre8-field`, `cre8-field-note`, `cre8-form`, `cre8-grid`, `cre8-heading`, `cre8-hero`, `cre8-icon`, `cre8-inline-alert`, `cre8-layout-container`, `cre8-layout-section`, `cre8-linelength-container`, `cre8-link`, `cre8-link-list`, `cre8-list`, `cre8-loading-spinner`, `cre8-logo`, `cre8-modal`, `cre8-multi-select`, `cre8-page-header`, `cre8-pagination`, `cre8-percent-bar`, `cre8-popover`, `cre8-progress-meter`, `cre8-progress-steps`, `cre8-radio-field`, `cre8-remove-tag`, `cre8-section`, `cre8-select`, `cre8-select-tile-list`, `cre8-skeleton-loader`, `cre8-split-button`, `cre8-table`, `cre8-table-object`, `cre8-tabs`, `cre8-tag`, `cre8-tag-list`, `cre8-tertiary-nav`, `cre8-text-link`, `cre8-text-passage`, `cre8-tooltip` | **text** |
| `cre8-linelength-container` | `children` | `cre8-accordion`, `cre8-alert`, `cre8-badge`, `cre8-button-group`, `cre8-divider`, `cre8-heading`, `cre8-icon`, `cre8-inline-alert`, `cre8-link`, `cre8-link-list`, `cre8-list`, `cre8-tag`, `cre8-text-link`, `cre8-text-passage`, `cre8-tooltip` | **text** |
| `cre8-link` | `default` | `cre8-icon` | **text** |
| `cre8-link` | `badge` | `cre8-badge`, `cre8-tag` |  |
| `cre8-link-list` | `children` | `cre8-link-list-item` |  |
| `cre8-link-list-item` | `default` | `cre8-badge`, `cre8-icon`, `cre8-link`, `cre8-tag`, `cre8-text-link` | **text** |
| `cre8-link-list-item` | `itemBefore` | `cre8-badge`, `cre8-icon`, `cre8-logo` |  |
| `cre8-link-list-item` | `itemAfter` | `cre8-badge`, `cre8-icon`, `cre8-tag` |  |
| `cre8-list` | `children` | `cre8-list-item` |  |
| `cre8-list-item` | `children` | `cre8-badge`, `cre8-icon`, `cre8-link`, `cre8-list`, `cre8-tag`, `cre8-text-link`, `cre8-text-passage`, `cre8-tooltip` | **text** |
| `cre8-logo` | `children` | `cre8-icon`, `cre8-link`, `cre8-text-link` | **text** |
| `cre8-main` | `children` | `cre8-alert`, `cre8-band`, `cre8-breadcrumbs`, `cre8-card`, `cre8-container`, `cre8-form`, `cre8-grid`, `cre8-heading`, `cre8-hero`, `cre8-inline-alert`, `cre8-layout-container`, `cre8-layout-section`, `cre8-page-header`, `cre8-section`, `cre8-tabs`, `cre8-text-passage` |  |
| `cre8-modal` | `default` | `cre8-accordion`, `cre8-alert`, `cre8-badge`, `cre8-card`, `cre8-chart`, `cre8-checkbox-field`, `cre8-container`, `cre8-date-picker`, `cre8-divider`, `cre8-field`, `cre8-field-note`, `cre8-form`, `cre8-grid`, `cre8-heading`, `cre8-inline-alert`, `cre8-link-list`, `cre8-list`, `cre8-loading-spinner`, `cre8-multi-select`, `cre8-percent-bar`, `cre8-progress-meter`, `cre8-radio-field`, `cre8-remove-tag`, `cre8-select`, `cre8-select-tile-list`, `cre8-skeleton-loader`, `cre8-table`, `cre8-table-object`, `cre8-tabs`, `cre8-tag`, `cre8-tag-list`, `cre8-text-link`, `cre8-text-passage` | **text** |
| `cre8-modal` | `header` | `cre8-badge`, `cre8-heading`, `cre8-icon`, `cre8-tag`, `cre8-text-passage` | **text** |
| `cre8-modal` | `footer` | `cre8-button`, `cre8-button-group`, `cre8-danger-button`, `cre8-link`, `cre8-text-link`, `cre8-text-passage` | **text** |
| `cre8-multi-select` | `fieldNote` | `cre8-field-note`, `cre8-link`, `cre8-text-link` | **text** |
| `cre8-nav-container` | `children` | `cre8-button`, `cre8-button-group`, `cre8-dropdown`, `cre8-field`, `cre8-global-nav`, `cre8-link`, `cre8-logo`, `cre8-primary-nav`, `cre8-submenu`, `cre8-tertiary-nav`, `cre8-utility-nav` |  |
| `cre8-page-header` | `default` | `cre8-badge`, `cre8-breadcrumbs`, `cre8-button`, `cre8-button-group`, `cre8-link`, `cre8-tag`, `cre8-tag-list`, `cre8-text-link`, `cre8-text-passage` | **text** |
| `cre8-page-header` | `titleAfter` | `cre8-badge`, `cre8-icon`, `cre8-tag`, `cre8-tooltip` | **text** |
| `cre8-pagination` | `children` | `cre8-button`, `cre8-button-group`, `cre8-field`, `cre8-select`, `cre8-text-passage` | **text** |
| `cre8-popover` | `default` | `cre8-alert`, `cre8-badge`, `cre8-checkbox-field`, `cre8-date-picker`, `cre8-divider`, `cre8-field`, `cre8-form`, `cre8-heading`, `cre8-inline-alert`, `cre8-link-list`, `cre8-list`, `cre8-loading-spinner`, `cre8-percent-bar`, `cre8-progress-meter`, `cre8-radio-field`, `cre8-remove-tag`, `cre8-select`, `cre8-skeleton-loader`, `cre8-tag`, `cre8-tag-list`, `cre8-text-link`, `cre8-text-passage` | **text** |
| `cre8-popover` | `trigger` | `cre8-badge`, `cre8-button`, `cre8-danger-button`, `cre8-icon`, `cre8-link`, `cre8-tag`, `cre8-text-link` |  |
| `cre8-popover` | `header` | `cre8-badge`, `cre8-heading`, `cre8-icon`, `cre8-tag`, `cre8-text-passage` | **text** |
| `cre8-popover` | `footer` | `cre8-button`, `cre8-button-group`, `cre8-danger-button`, `cre8-link`, `cre8-text-link` | **text** |
| `cre8-primary-nav` | `children` | `cre8-primary-nav-item` |  |
| `cre8-primary-nav-item` | `default` | `cre8-dropdown`, `cre8-link`, `cre8-submenu`, `cre8-text-link` | **text** |
| `cre8-primary-nav-item` | `itemBefore` | `cre8-badge`, `cre8-icon` |  |
| `cre8-primary-nav-item` | `itemAfter` | `cre8-badge`, `cre8-icon`, `cre8-tag` |  |
| `cre8-progress-steps` | `children` | `cre8-progress-steps-item` |  |
| `cre8-progress-steps-item` | `children` | `cre8-icon`, `cre8-link`, `cre8-text-link` | **text** |
| `cre8-radio-field` | `children` | `cre8-radio-field-item` |  |
| `cre8-section` | `default` | `cre8-accordion`, `cre8-alert`, `cre8-badge`, `cre8-breadcrumbs`, `cre8-button`, `cre8-button-group`, `cre8-card`, `cre8-chart`, `cre8-checkbox-field`, `cre8-container`, `cre8-container-grid`, `cre8-danger-button`, `cre8-date-picker`, `cre8-divider`, `cre8-dropdown`, `cre8-feature`, `cre8-field`, `cre8-field-note`, `cre8-form`, `cre8-grid`, `cre8-heading`, `cre8-hero`, `cre8-icon`, `cre8-inline-alert`, `cre8-layout-container`, `cre8-layout-section`, `cre8-linelength-container`, `cre8-link`, `cre8-link-list`, `cre8-list`, `cre8-loading-spinner`, `cre8-logo`, `cre8-modal`, `cre8-multi-select`, `cre8-page-header`, `cre8-pagination`, `cre8-percent-bar`, `cre8-popover`, `cre8-progress-meter`, `cre8-progress-steps`, `cre8-radio-field`, `cre8-remove-tag`, `cre8-section`, `cre8-select`, `cre8-select-tile-list`, `cre8-skeleton-loader`, `cre8-split-button`, `cre8-table`, `cre8-table-object`, `cre8-tabs`, `cre8-tag`, `cre8-tag-list`, `cre8-tertiary-nav`, `cre8-text-link`, `cre8-text-passage`, `cre8-tooltip` | **text** |
| `cre8-section` | `header` | `cre8-badge`, `cre8-button-group`, `cre8-heading`, `cre8-link`, `cre8-tag`, `cre8-text-link`, `cre8-text-passage` | **text** |
| `cre8-select` | `fieldNote` | `cre8-field-note`, `cre8-link`, `cre8-text-link` | **text** |
| `cre8-select-tile` | `default` | `cre8-badge`, `cre8-heading`, `cre8-icon`, `cre8-percent-bar`, `cre8-tag`, `cre8-text-link`, `cre8-text-passage` | **text** |
| `cre8-select-tile` | `header` | `cre8-badge`, `cre8-heading`, `cre8-icon`, `cre8-logo` | **text** |
| `cre8-select-tile` | `footer` | `cre8-badge`, `cre8-tag`, `cre8-text-link`, `cre8-text-passage` | **text** |
| `cre8-select-tile` | `title` | `cre8-badge`, `cre8-heading` | **text** |
| `cre8-select-tile` | `body` | `cre8-list`, `cre8-text-link`, `cre8-text-passage` | **text** |
| `cre8-select-tile-list` | `children` | `cre8-select-tile` |  |
| `cre8-split-button` | `children` | `cre8-dropdown` |  |
| `cre8-submenu` | `children` | `cre8-submenu-item` |  |
| `cre8-submenu-item` | `children` | `cre8-badge`, `cre8-icon`, `cre8-link`, `cre8-text-link` | **text** |
| `cre8-tab` | `children` | `cre8-badge`, `cre8-icon`, `cre8-tag` | **text** |
| `cre8-tab-panel` | `children` | `cre8-accordion`, `cre8-alert`, `cre8-badge`, `cre8-breadcrumbs`, `cre8-button`, `cre8-button-group`, `cre8-card`, `cre8-chart`, `cre8-checkbox-field`, `cre8-container`, `cre8-container-grid`, `cre8-danger-button`, `cre8-date-picker`, `cre8-divider`, `cre8-dropdown`, `cre8-feature`, `cre8-field`, `cre8-field-note`, `cre8-form`, `cre8-grid`, `cre8-heading`, `cre8-hero`, `cre8-icon`, `cre8-inline-alert`, `cre8-layout-container`, `cre8-layout-section`, `cre8-linelength-container`, `cre8-link`, `cre8-link-list`, `cre8-list`, `cre8-loading-spinner`, `cre8-logo`, `cre8-modal`, `cre8-multi-select`, `cre8-page-header`, `cre8-pagination`, `cre8-percent-bar`, `cre8-popover`, `cre8-progress-meter`, `cre8-progress-steps`, `cre8-radio-field`, `cre8-remove-tag`, `cre8-section`, `cre8-select`, `cre8-select-tile-list`, `cre8-skeleton-loader`, `cre8-split-button`, `cre8-table`, `cre8-table-object`, `cre8-tabs`, `cre8-tag`, `cre8-tag-list`, `cre8-tertiary-nav`, `cre8-text-link`, `cre8-text-passage`, `cre8-tooltip` | **text** |
| `cre8-table` | `children` | `cre8-table-body`, `cre8-table-header` |  |
| `cre8-table-body` | `children` | `cre8-table-row` |  |
| `cre8-table-cell` | `children` | `cre8-badge`, `cre8-button`, `cre8-button-group`, `cre8-checkbox-field`, `cre8-danger-button`, `cre8-dropdown`, `cre8-field`, `cre8-icon`, `cre8-link`, `cre8-loading-spinner`, `cre8-percent-bar`, `cre8-popover`, `cre8-progress-meter`, `cre8-remove-tag`, `cre8-select`, `cre8-skeleton-loader`, `cre8-tag`, `cre8-tag-list`, `cre8-text-link`, `cre8-tooltip` | **text** |
| `cre8-table-header` | `children` | `cre8-table-row` |  |
| `cre8-table-header-cell` | `children` | `cre8-badge`, `cre8-checkbox-field`, `cre8-icon`, `cre8-link`, `cre8-tag`, `cre8-text-link`, `cre8-tooltip` | **text** |
| `cre8-table-object` | `default` | `cre8-table` |  |
| `cre8-table-object` | `header` | `cre8-badge`, `cre8-button`, `cre8-button-group`, `cre8-dropdown`, `cre8-field`, `cre8-heading`, `cre8-select`, `cre8-tag-list`, `cre8-text-passage` | **text** |
| `cre8-table-object` | `footer` | `cre8-button`, `cre8-button-group`, `cre8-link`, `cre8-pagination`, `cre8-text-link`, `cre8-text-passage` | **text** |
| `cre8-table-row` | `default` | `cre8-table-cell`, `cre8-table-header-cell` |  |
| `cre8-table-row` | `expandableContent` | `cre8-button-group`, `cre8-card`, `cre8-chart`, `cre8-container`, `cre8-divider`, `cre8-field`, `cre8-grid`, `cre8-heading`, `cre8-inline-alert`, `cre8-list`, `cre8-table`, `cre8-tag-list`, `cre8-text-link`, `cre8-text-passage` | **text** |
| `cre8-tabs` | `default` | `cre8-tab` |  |
| `cre8-tabs` | `panel` | `cre8-tab-panel` |  |
| `cre8-tag-list` | `children` | `cre8-remove-tag`, `cre8-tag` |  |
| `cre8-tertiary-nav` | `children` | `cre8-tertiary-nav-item` |  |
| `cre8-tertiary-nav-item` | `children` | `cre8-badge`, `cre8-icon`, `cre8-link`, `cre8-tertiary-nav`, `cre8-text-link` | **text** |
| `cre8-text-link` | `default` | `cre8-icon` | **text** |
| `cre8-text-link` | `linkAfter` | `cre8-badge`, `cre8-icon` |  |
| `cre8-text-passage` | `children` | `cre8-badge`, `cre8-divider`, `cre8-heading`, `cre8-icon`, `cre8-inline-alert`, `cre8-link`, `cre8-list`, `cre8-tag`, `cre8-text-link`, `cre8-tooltip` | **text** |
| `cre8-tooltip` | `default` | `cre8-link`, `cre8-text-link`, `cre8-text-passage` | **text** |
| `cre8-tooltip` | `trigger` | `cre8-badge`, `cre8-button`, `cre8-heading`, `cre8-icon`, `cre8-link`, `cre8-tag`, `cre8-text-link` | **text** |
| `cre8-utility-nav` | `children` | `cre8-utility-nav-item` |  |
