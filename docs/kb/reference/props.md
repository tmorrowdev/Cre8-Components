---
title: Prop Reference
generated: true
generator: docs/kb/tools/generate-reference.mjs
source: packages/cre8-wc/a2ui/catalog.json
intents:
  - "what props does this component take"
  - "what values does this prop accept"
  - "what is the default value for this prop"
  - "is this an attribute or a property"
---

# Prop Reference

<!-- DO NOT EDIT BY HAND. Regenerate with: node docs/kb/tools/generate-reference.mjs -->

Every declared prop on every component, from the A2UI catalog.

**Names are camelCase here, and camelCase is what you write in markup too.** Lit
derives a prop's observed attribute by **lowercasing** the property name, not by
kebab-casing it, and no cre8 component overrides that with `attribute:`. So
`tagVariant` is observed as `tagvariant`, and `tag-variant` binds to nothing:
Lit ignores the unrecognized attribute and the prop silently keeps its default.
Since HTML attribute names are case-insensitive, writing the camelCase name
straight into markup (`<cre8-heading tagVariant="h3">`) is both correct and
readable. Use camelCase everywhere — HTML, Vue/Angular templates, A2UI specs, and
React (`@tmorrow/cre8-react`).

**The Kind column matters for structured values.** A `property` prop carrying an
array or object must be assigned as a JavaScript property, because an HTML
attribute can only hold a string — use `:prop` in Vue, `[prop]` in Angular. For
scalars and booleans the attribute form is fine and is what the examples in this
KB use (`fullWidth`, `isHoverable`). The A2UI renderer decides for you
([How props reach the element](../04-a2ui.md#how-props-actually-reach-the-element)).

**These generated pages are a complete offline substitute for the catalog.**
Between this page, [content model](content-model.md),
[events](events.md), and [parts](parts.md), every constraint
`validate_a2ui_spec` enforces is written down — component allowlist, prop names,
enums, slot names, event shape. If you cannot call the validator, checking a spec
against these four pages is equivalent. The one thing they cannot give you is a
guarantee the catalog itself is right; see
[What validation cannot catch](../04-a2ui.md#what-validation-cannot-catch).

Related: [events](events.md) · [content model](content-model.md) ·
[component index](components.md)

## Layout

### `cre8-band`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `variant` | `"branded"` |  |  | attribute |
| `fullHeight` | boolean |  |  | **property** |

### `cre8-card`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `variant` | string | `bare`, `compact`, `horizontal`, `horizontal-bare` |  | attribute |
| `align` | `"center"` |  |  | attribute |

### `cre8-divider`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `variant` | string | `horizontal`, `vertical` | `horizontal` | attribute |
| `status` | string | `brand`, `knockout` |  | attribute |

### `cre8-grid`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `variant` | string | `side-by-side`, `2up`, `3up`, `1-3up`, `4up`, `1-4up`, `1-2-4up`, `2-4-6up` |  | attribute |
| `gap` | string | `sm`, `lg`, `none` |  | attribute |
| `break` | string | `faster`, `slower` |  | attribute |

### `cre8-grid-item`

No declared props — this component is configured entirely by its content.

### `cre8-hero`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `align` | string | `center`, `left`, `right`, `top-left`, `top-center`, `bottom-center`, `top-right`, `bottom-right` |  | attribute |
| `imgSrc` | string |  |  | **property** |
| `imgAlt` | string |  |  | **property** |
| `hasOverlay` | boolean |  |  | **property** |

### `cre8-layout`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `variant` | `"left-sidebar"` |  |  | attribute |

### `cre8-layout-container`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `fullHeight` | boolean |  |  | **property** |

### `cre8-layout-section`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `behavior` | `"sticky"` |  |  | attribute |
| `top` | string |  | `1rem` | attribute |

### `cre8-linelength-container`

No declared props — this component is configured entirely by its content.

### `cre8-main`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `fullHeight` | boolean |  |  | **property** |

### `cre8-section`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `headline` | string |  |  | attribute |

## Typography

### `cre8-heading`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `type` | string | `display-default`, `display-small`, `headline-large`, `headline-default`, `headline-small`, `title-xlarge`, `title-large`, `title-default`, `title-small`, `label-large`, `label-default`, `label-small`, `meta-large`, `meta-default`, `meta-small` |  | attribute |
| `inverted` | boolean |  |  | attribute |
| `tagVariant` | string | `h1`, `h2`, `h3`, `h4`, `h5`, `h6` | `h5` | **property** |
| `brandColor` | boolean |  |  | **property** |

### `cre8-text-link`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `href` | string |  |  | attribute |
| `variant` | string | `secondary`, `display` |  | attribute |
| `size` | `"sm"` |  |  | attribute |
| `inverted` | boolean |  |  | attribute |

### `cre8-text-passage`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `inverted` | boolean |  |  | attribute |
| `size` | string | `large`, `small`, `default` | `default` | attribute |

## Actions

### `cre8-button`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `text` | string |  |  | attribute |
| `variant` | string | `primary`, `secondary`, `tertiary` | `primary` | attribute |
| `neutral` | boolean |  |  | attribute |
| `inverse` | boolean |  |  | attribute |
| `href` | string |  |  | attribute |
| `target` | string | `_blank`, `_self`, `_parent`, `_top` |  | attribute |
| `rel` | string |  |  | attribute |
| `svg` | string |  |  | attribute |
| `size` | string | `sm`, `lg`, `md` | `md` | attribute |
| `loading` | boolean |  |  | attribute |
| `type` | string | `button`, `submit`, `reset` | `button` | attribute |
| `name` | string |  |  | attribute |
| `disabled` | boolean |  |  | attribute |
| `required` | boolean |  |  | attribute |
| `value` | string |  |  | attribute |
| `iconName` | string |  |  | **property** |
| `iconRotateDegree` | number |  | `0` | **property** |
| `iconFlipDirection` | string |  |  | **property** |
| `iconPosition` | string | `before`, `after` | `undefined` | **property** |
| `hideText` | boolean |  |  | **property** |
| `fullWidth` | boolean |  |  | **property** |
| `loadingComplete` | boolean |  |  | **property** |
| `ariaLive` | string | `polite`, `assertive` | `assertive` | **property** |
| `splitButtonType` | string | `text`, `caret` |  | **property** |
| `buttonAriaExpanded` | boolean |  |  | **property** |
| `isError` | boolean |  |  | **property** |
| `isSuccess` | boolean |  |  | **property** |

### `cre8-button-group`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `orientation` | `"responsive-full-width"` |  |  | attribute |
| `gap` | `"sm"` |  |  | attribute |
| `fullWidth` | boolean |  |  | **property** |

### `cre8-danger-button`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `text` | string |  | `Button` | attribute |
| `variant` | string | `primary`, `secondary`, `tertiary` | `primary` | attribute |
| `href` | string |  |  | attribute |
| `target` | string | `_blank`, `_self`, `_parent`, `_top` |  | attribute |
| `rel` | string |  |  | attribute |
| `svg` | string |  |  | attribute |
| `size` | string | `sm`, `lg` |  | attribute |
| `loading` | boolean |  |  | attribute |
| `inverted` | boolean |  |  | attribute |
| `type` | string | `button`, `submit`, `reset` | `button` | attribute |
| `name` | string |  |  | attribute |
| `disabled` | boolean |  |  | attribute |
| `required` | boolean |  |  | attribute |
| `value` | string |  |  | attribute |
| `iconRotateDegree` | number |  | `0` | **property** |
| `iconFlipDirection` | string |  |  | **property** |
| `iconPosition` | string | `before`, `after` | `undefined` | **property** |
| `hideText` | boolean |  |  | **property** |
| `fullWidth` | boolean |  |  | **property** |
| `loadingComplete` | boolean |  |  | **property** |
| `ariaLive` | string | `polite`, `assertive` | `assertive` | **property** |
| `buttonAriaExpanded` | boolean |  |  | **property** |
| `isError` | boolean |  |  | **property** |
| `isSuccess` | boolean |  |  | **property** |

### `cre8-split-button`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `disabled` | boolean |  |  | attribute |
| `size` | string | `sm`, `lg` |  | attribute |
| `buttonText` | string |  |  | **property** |
| `dropdownOpen` | boolean |  |  | **property** |

## Forms

### `cre8-checkbox-field`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `label` | string |  |  | attribute |
| `fieldNote` | string |  |  | **property** |
| `ariaDescribedBy` | string |  |  | **property** |
| `fieldNoteIconName` | string |  |  | **property** |
| `fieldNoteKnockout` | boolean |  |  | **property** |
| `fieldNoteIsSuccess` | boolean |  |  | **property** |
| `fieldNoteIsError` | boolean |  |  | **property** |

### `cre8-checkbox-field-item`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `label` | string |  |  | attribute |
| `checked` | boolean |  |  | attribute |
| `name` | string |  |  | attribute |
| `disabled` | boolean |  |  | attribute |
| `required` | boolean |  |  | attribute |
| `value` | string |  |  | attribute |
| `errorText` | string |  | `Error` | **property** |
| `errorNote` | string |  |  | **property** |
| `successText` | string |  | `Success` | **property** |
| `successNote` | string |  |  | **property** |
| `fieldId` | string |  |  | **property** |
| `fieldNote` | string |  |  | **property** |
| `ariaDescribedBy` | string |  |  | **property** |
| `validationAriaDescribedBy` | string |  |  | **property** |
| `fieldNoteIconName` | string |  |  | **property** |
| `isError` | boolean |  |  | **property** |
| `isSuccess` | boolean |  |  | **property** |
| `type` | `"checkbox"` |  |  | **property** |

### `cre8-date-picker`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `autocomplete` | string |  |  | attribute |
| `pattern` | string |  |  | attribute |
| `placeholder` | string |  |  | attribute |
| `label` | string |  | `Label` | attribute |
| `max` | string \| number |  |  | attribute |
| `min` | string \| number |  |  | attribute |
| `maxlength` | string |  |  | attribute |
| `readonly` | boolean |  |  | attribute |
| `type` | string |  | `date` | attribute |
| `name` | string |  |  | attribute |
| `disabled` | boolean |  |  | attribute |
| `required` | boolean |  |  | attribute |
| `value` | string |  |  | attribute |
| `hasShortcuts` | boolean |  |  | **property** |
| `fieldId` | string |  |  | **property** |
| `fieldNote` | string |  |  | **property** |
| `ariaLive` | string | `polite`, `assertive` | `polite` | **property** |
| `ariaDescribedBy` | string |  |  | **property** |
| `errorText` | string |  | `Error` | **property** |
| `errorNote` | string |  |  | **property** |
| `validationAriaDescribedBy` | string |  |  | **property** |
| `successText` | string |  | `Success` | **property** |
| `successNote` | string |  |  | **property** |
| `isError` | boolean |  |  | **property** |
| `isSuccess` | boolean |  |  | **property** |
| `showCalendar` | boolean |  |  | **property** |

### `cre8-field`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `autocomplete` | string |  |  | attribute |
| `pattern` | string |  |  | attribute |
| `placeholder` | string |  |  | attribute |
| `label` | string |  | `Label` | attribute |
| `max` | string \| number |  |  | attribute |
| `min` | string \| number |  |  | attribute |
| `maxlength` | string |  |  | attribute |
| `readonly` | boolean |  |  | attribute |
| `type` | string |  | `text` | attribute |
| `name` | string |  |  | attribute |
| `disabled` | boolean |  |  | attribute |
| `required` | boolean |  |  | attribute |
| `value` | string |  |  | attribute |
| `fieldId` | string |  |  | **property** |
| `fieldNote` | string |  |  | **property** |
| `ariaLive` | string | `polite`, `assertive` | `polite` | **property** |
| `ariaDescribedBy` | string |  |  | **property** |
| `errorText` | string |  | `Error` | **property** |
| `errorNote` | string |  |  | **property** |
| `validationAriaDescribedBy` | string |  |  | **property** |
| `successText` | string |  | `Success` | **property** |
| `successNote` | string |  |  | **property** |
| `isError` | boolean |  |  | **property** |
| `isSuccess` | boolean |  |  | **property** |

### `cre8-field-note`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `isError` | boolean |  |  | **property** |
| `isSuccess` | boolean |  |  | **property** |
| `iconName` | string |  |  | **property** |

### `cre8-multi-select`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `items` | string[] |  | `[]` | attribute |
| `label` | string |  |  | attribute |
| `disabled` | boolean |  |  | attribute |
| `preselectedItems` | string[] |  |  | **property** |
| `fieldId` | string |  |  | **property** |
| `fieldNote` | string |  |  | **property** |
| `ariaDescribedBy` | string |  |  | **property** |
| `validationAriaDescribedBy` | string |  |  | **property** |
| `isError` | boolean |  |  | **property** |
| `errorNote` | string |  |  | **property** |
| `isSuccess` | boolean |  |  | **property** |
| `successNote` | string |  |  | **property** |
| `selectedTagItems` | string[] |  |  | **property** |
| `dropdownOpen` | boolean |  |  | **property** |

### `cre8-radio-field`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `label` | string |  |  | attribute |
| `fieldNote` | string |  |  | **property** |
| `ariaDescribedBy` | string |  |  | **property** |
| `fieldNoteIconName` | string |  |  | **property** |
| `fieldNoteKnockout` | boolean |  |  | **property** |
| `isSuccess` | boolean |  |  | **property** |
| `isError` | boolean |  |  | **property** |

### `cre8-radio-field-item`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `checked` | boolean |  |  | attribute |
| `label` | string |  |  | attribute |
| `name` | string |  |  | attribute |
| `disabled` | boolean |  |  | attribute |
| `required` | boolean |  |  | attribute |
| `value` | string |  |  | attribute |
| `ariaDescribedBy` | string |  |  | **property** |
| `fieldId` | string |  |  | **property** |
| `fieldNote` | string |  |  | **property** |
| `fieldNoteIconName` | string |  |  | **property** |
| `fieldNoteKnockout` | boolean |  |  | **property** |
| `fieldNoteIsError` | boolean |  |  | **property** |
| `isError` | boolean |  |  | **property** |
| `isSuccess` | boolean |  |  | **property** |
| `type` | string |  |  | **property** |

### `cre8-select`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `items` | any[] |  | `[]` | attribute |
| `label` | string |  | `Label` | attribute |
| `name` | string |  |  | attribute |
| `disabled` | boolean |  |  | attribute |
| `required` | boolean |  | `false` | attribute |
| `value` | string |  |  | attribute |
| `fieldId` | string |  |  | **property** |
| `fieldNote` | string |  |  | **property** |
| `ariaDescribedBy` | string |  |  | **property** |
| `validationAriaDescribedBy` | string |  |  | **property** |
| `errorNote` | string |  |  | **property** |
| `successNote` | string |  |  | **property** |
| `isError` | boolean |  |  | **property** |
| `isSuccess` | boolean |  |  | **property** |
| `type` | `"select"` |  |  | **property** |

### `cre8-select-tile`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `variant` | string | `bare`, `horizontal`, `horizontal-bare` |  | attribute |
| `align` | `"center"` |  |  | attribute |
| `checked` | boolean |  |  | attribute |
| `type` | string | `checkbox`, `radio` | `radio` | attribute |
| `name` | string |  |  | attribute |
| `disabled` | boolean |  |  | attribute |
| `required` | boolean |  |  | attribute |
| `value` | string |  |  | attribute |
| `variantBreakToVertical` | string | `sm`, `lg`, `none`, `md`, `sm-2`, `xl`, `xxl` | `sm` | **property** |
| `checkPosition` | string | `none`, `left`, `right`, `top-right` | `right` | **property** |
| `radioVariant` | string | `dot`, `check` | `dot` | **property** |
| `fieldId` | string |  |  | **property** |
| `isError` | boolean |  |  | **property** |
| `isSuccess` | boolean |  |  | **property** |
| `shadowRootOptions` | `{ delegatesFocus: boolean; mode: ShadowRootMode; slotAssignment?: SlotAssignmentMode; }` |  |  | **property** |
| `defaultChecked` | boolean |  |  | **property** |

### `cre8-select-tile-list`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `variant` | string | `columns`, `rows` | `columns` | attribute |
| `label` | string |  |  | attribute |
| `fieldNote` | string |  |  | **property** |
| `ariaDescribedBy` | string |  |  | **property** |
| `fieldNoteIconName` | string |  |  | **property** |
| `fieldNoteKnockout` | boolean |  |  | **property** |
| `fieldNoteIsSuccess` | boolean |  |  | **property** |
| `fieldNoteIsError` | boolean |  |  | **property** |

## Data

### `cre8-chart`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `type` | string | `line`, `bar`, `pie`, `doughnut`, `radar`, `polarArea`, `bubble`, `scatter` | `bar` | attribute |
| `width` | number |  |  | attribute |
| `height` | number |  | `400` | attribute |
| `maintain-aspect-ratio` | boolean |  | `true` | attribute |
| `responsive` | boolean |  | `true` | attribute |
| `loading` | boolean |  | `false` | attribute |
| `aria-label` | string |  | `Chart` | attribute |
| `show-legend` | boolean |  | `true` | attribute |
| `legend-position` | string | `top`, `bottom`, `left`, `right` | `top` | attribute |
| `enable-animation` | boolean |  | `true` | attribute |
| `animation-duration` | number |  | `750` | attribute |
| `data` | object |  |  | **property** |
| `options` | object |  |  | **property** |
| `colors` | string[] |  |  | **property** |

### `cre8-list`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `variant` | `"bare"` |  |  | attribute |
| `spacing` | string | `condensed`, `padded` |  | attribute |

### `cre8-list-item`

No declared props — this component is configured entirely by its content.

### `cre8-remove-tag`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `text` | string |  |  | attribute |
| `color` | string | `neutral`, `branded`, `neutral-hybrid` | `neutral` | attribute |
| `shape` | string | `round`, `square` | `round` | attribute |
| `disabled` | boolean |  |  | attribute |

### `cre8-table`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `caption` | string |  |  | attribute |
| `behavior` | `"responsive"` |  |  | attribute |
| `variant` | `"striped"` |  |  | attribute |
| `isHoverable` | boolean |  |  | **property** |

### `cre8-table-body`

No declared props — this component is configured entirely by its content.

### `cre8-table-cell`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `colspan` | number |  |  | attribute |
| `variant` | `"bare"` |  |  | attribute |
| `dataHeader` | string |  |  | **property** |

### `cre8-table-header`

No declared props — this component is configured entirely by its content.

### `cre8-table-header-cell`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `colspan` | number |  |  | attribute |
| `width` | string |  |  | attribute |

### `cre8-table-object`

No declared props — this component is configured entirely by its content.

### `cre8-table-row`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `variant` | `"bare"` |  |  | attribute |
| `isExpanded` | boolean |  |  | **property** |
| `isExpandable` | boolean |  |  | **property** |
| `expandedButtonText` | string |  | `Collapse Table Row` | **property** |
| `collapsedButtonText` | string |  | `Expand Table Row` | **property** |

### `cre8-tag`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `text` | string |  |  | attribute |
| `variant` | string | `neutral`, `branded`, `neutral-hybrid` | `neutral` | attribute |
| `shape` | string | `square`, `round` | `square` | attribute |
| `type` | string | `checkbox`, `radio` |  | attribute |
| `name` | string |  |  | attribute |
| `disabled` | boolean |  |  | attribute |
| `required` | boolean |  |  | attribute |
| `value` | string |  |  | attribute |
| `isDisabled` | boolean |  |  | **property** |
| `isSelected` | boolean |  |  | **property** |
| `fieldId` | string |  |  | **property** |
| `isError` | boolean |  |  | **property** |
| `isSuccess` | boolean |  |  | **property** |

### `cre8-tag-list`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `label` | string |  |  | attribute |
| `fieldId` | string |  |  | **property** |

## Navigation

### `cre8-breadcrumbs`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `navAriaLabel` | string |  | `breadcrumbs` | **property** |

### `cre8-breadcrumbs-item`

No declared props — this component is configured entirely by its content.

### `cre8-footer`

No declared props — this component is configured entirely by its content.

### `cre8-global-nav`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `inverted` | boolean |  |  | attribute |
| `behavior` | `"side-by-side"` |  |  | attribute |
| `navAriaLabel` | string |  | `global` | **property** |

### `cre8-global-nav-item`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `text` | string |  | `Nav item` | attribute |
| `href` | string |  | `#` | attribute |
| `iconName` | string |  | `keyboard-arrow-down` | **property** |
| `megaMenu` | boolean |  |  | **property** |
| `isActive` | boolean |  |  | **property** |

### `cre8-header`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `isActive` | boolean |  |  | **property** |

### `cre8-link`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `href` | string |  |  | attribute |
| `rel` | string |  |  | attribute |
| `target` | string | `_blank`, `_self`, `_parent`, `_top` |  | attribute |
| `svg` | string |  |  | attribute |
| `size` | string | `sm`, `lg` |  | attribute |
| `inverted` | boolean |  |  | attribute |
| `iconName` | string |  |  | **property** |
| `iconRotateDegree` | number |  | `0` | **property** |
| `iconFlipDirection` | string |  |  | **property** |
| `iconPosition` | string | `before`, `after` | `undefined` | **property** |
| `ctaIcon` | string |  | `arrow-forward` | **property** |
| `ctaLink` | boolean |  |  | **property** |
| `noUnderline` | boolean |  |  | **property** |

### `cre8-link-list`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `behavior` | string | `horizontal`, `responsive` |  | attribute |
| `inverted` | boolean |  |  | attribute |
| `size` | `"sm"` |  |  | attribute |
| `spacing` | `"condensed"` |  |  | attribute |
| `variant` | string | `secondary`, `display` |  | attribute |

### `cre8-link-list-item`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `text` | string |  |  | attribute |
| `href` | string |  |  | attribute |
| `isActive` | boolean |  |  | **property** |

### `cre8-nav-container`

No declared props — this component is configured entirely by its content.

### `cre8-pagination`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `display` | string | `compact`, `icon-only`, `default` |  | attribute |
| `totalResults` | number |  |  | **property** |
| `pageSize` | number |  |  | **property** |
| `visiblePages` | number |  | `5` | **property** |
| `hideLastAndFirstButtons` | boolean |  |  | **property** |
| `currentPage` | number |  |  | **property** |
| `elementDefinitions` | `{ 'cre8-button': typeof Cre8Button; }` |  |  | **property** |
| `windowWidth` | number |  |  | **property** |
| `buttons` | `(typeof Cre8Button)[]` |  |  | **property** |
| `maxVisiblePages` | number |  |  | **property** |

### `cre8-primary-nav`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `inverted` | boolean |  |  | attribute |
| `behavior` | `"side-by-side"` |  |  | attribute |
| `navAriaLabel` | string |  | `main` | **property** |

### `cre8-primary-nav-item`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `text` | string |  | `Nav item` | attribute |
| `href` | string |  | `#` | attribute |
| `iconName` | string |  | `caret-down` | **property** |
| `megaMenu` | boolean |  |  | **property** |
| `isActive` | boolean |  |  | **property** |

### `cre8-tab`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `size` | `"sm"` |  |  | attribute |
| `index` | number |  |  | attribute |
| `isActive` | boolean |  |  | **property** |
| `ariaLabelledBy` | string |  |  | **property** |

### `cre8-tab-panel`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `index` | number |  |  | attribute |
| `skipFocusOnPanel` | boolean |  |  | **property** |
| `isActive` | boolean |  |  | **property** |

### `cre8-tabs`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `size` | `"sm"` |  |  | attribute |
| `fullWidth` | boolean |  |  | **property** |
| `activeIndex` | number |  | `0` | **property** |
| `isStart` | boolean |  | `true` | **property** |
| `isEnd` | boolean |  | `false` | **property** |
| `activeTab` | `Cre8Tab` |  |  | **property** |
| `isRTL` | boolean |  |  | **property** |
| `handleScroll` | string |  |  | **property** |
| `handleResize` | string |  |  | **property** |
| `setIsStart` | string |  |  | **property** |
| `setIsEnd` | string |  |  | **property** |
| `emitEvent` | string |  |  | **property** |
| `tabId` | string |  |  | **property** |

### `cre8-tertiary-nav`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `fullWidth` | boolean |  |  | **property** |
| `navAriaLabel` | string |  | `tertiary` | **property** |

### `cre8-tertiary-nav-item`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `href` | string |  |  | attribute |
| `isCurrent` | boolean |  |  | **property** |

### `cre8-utility-nav`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `inverted` | boolean |  |  | attribute |
| `navAriaLabel` | string |  | `utility` | **property** |

### `cre8-utility-nav-item`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `href` | string |  |  | attribute |
| `text` | string |  |  | attribute |
| `hideText` | boolean |  |  | **property** |
| `iconName` | string |  |  | **property** |
| `iconPosition` | string | `before`, `after` | `undefined` | **property** |

## Disclosure

### `cre8-accordion`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `borderType` | string | `rectangle`, `rounded-bottom`, `rounded`, `none` |  | **property** |
| `hasDivider` | boolean |  | `false` | **property** |

### `cre8-accordion-item`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `size` | string | `sm`, `lg` | `sm` | attribute |
| `heading` | string |  |  | attribute |
| `isActive` | boolean |  | `false` | **property** |
| `iconBefore` | boolean |  |  | **property** |
| `tertiaryIcon` | boolean |  |  | **property** |
| `headingTagVariant` | string | `h1`, `h2`, `h3`, `h4`, `h5`, `h6` | `h3` | **property** |
| `brandHeader` | boolean |  |  | **property** |
| `accordionItemId` | string |  |  | **property** |

### `cre8-dropdown`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `buttonText` | string |  |  | **property** |
| `maxHeight` | string |  |  | **property** |
| `dropdownWithLink` | boolean |  | `false` | **property** |
| `open` | boolean |  |  | **property** |
| `dropdownContent` | `HTMLElement` |  |  | **property** |

### `cre8-dropdown-item`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `ariaLabel` | string |  |  | **property** |

### `cre8-modal`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `status` | string | `error`, `info`, `warning`, `success`, `help` |  | attribute |
| `isActive` | boolean |  |  | **property** |
| `utilityModalTitle` | string |  |  | **property** |
| `notDismissible` | boolean |  |  | **property** |
| `closeButtonText` | string |  | `close` | **property** |
| `closeButtonIcon` | string |  | `close` | **property** |
| `ariaLabel` | string |  |  | **property** |
| `mapStatusToIconModal` | `(status: string) => TemplateResult<1> | null` |  |  | **property** |

### `cre8-popover`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `heading` | string |  |  | attribute |
| `position` | string | `top`, `left`, `right` |  | attribute |
| `isVisibleOnScroll` | boolean |  |  | **property** |
| `isDynamic` | boolean |  |  | **property** |
| `isActiveDynamic` | boolean |  |  | **property** |
| `isActive` | boolean |  |  | **property** |
| `isRTL` | boolean |  |  | **property** |
| `handleOnClickOutside` | `(e: MouseEvent) => void` |  |  | **property** |
| `removeActiveOnScroll` | `() => void` |  |  | **property** |
| `removeActive` | `() => void` |  |  | **property** |

### `cre8-submenu`

No declared props — this component is configured entirely by its content.

### `cre8-submenu-item`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `href` | string |  |  | attribute |

### `cre8-tooltip`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `position` | string | `default`, `top`, `left`, `right` |  | attribute |
| `knockout` | boolean |  |  | attribute |
| `svg` | string |  |  | attribute |
| `isDynamic` | boolean |  |  | **property** |
| `isActiveDynamic` | boolean |  |  | **property** |
| `isActive` | boolean |  |  | **property** |
| `ariaDescribes` | string |  |  | **property** |
| `iconRotateDegree` | number |  | `0` | **property** |
| `iconFlipDirection` | string |  |  | **property** |
| `isRTL` | boolean |  |  | **property** |
| `removeActive` | `() => void` |  |  | **property** |

## Feedback

### `cre8-alert`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `status` | string | `error`, `info`, `notification`, `neutral`, `warning`, `success` | `info` | attribute |
| `variant` | string | `standalone`, `banner` | `standalone` | attribute |
| `emphasis` | string | `subtle`, `strong` | `subtle` | attribute |
| `dismissed` | boolean |  |  | attribute |
| `iconAlert` | string |  | `undefined` | **property** |
| `iconTitle` | string |  |  | **property** |
| `headerText` | string |  | `undefined` | **property** |
| `ctaBody` | string |  | `undefined` | **property** |
| `notDismissible` | boolean |  |  | **property** |

### `cre8-badge`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `text` | string |  | `undefined` | attribute |
| `status` | string | `error`, `info`, `warning`, `success`, `attention` |  | attribute |
| `variant` | string | `light`, `white` |  | attribute |
| `svg` | string |  |  | attribute |

### `cre8-inline-alert`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `variant` | string | `subtle`, `transparent` | `subtle` | attribute |
| `status` | string | `error`, `info`, `neutral`, `warning`, `success`, `attention`, `help` | `info` | attribute |
| `iconName` | string |  |  | **property** |
| `fullWidth` | boolean |  |  | **property** |
| `iconTitle` | string |  |  | **property** |

### `cre8-loading-spinner`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `determinate` | boolean |  |  | attribute |
| `inverse` | boolean |  |  | attribute |
| `neutral` | boolean |  |  | attribute |
| `label` | string |  |  | attribute |
| `progress` | number |  | `0` | attribute |
| `size` | string | `large`, `small` | `large` | attribute |
| `buttonVariant` | string | `primary`, `secondary`, `tertiary` |  | **property** |

### `cre8-percent-bar`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `value` | number |  |  | attribute |
| `max` | number |  |  | attribute |
| `disableActionLeft` | boolean |  |  | **property** |

### `cre8-progress-meter`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `status` | string | `error`, `warning`, `success` |  | attribute |
| `knockout` | boolean |  |  | attribute |
| `max` | number |  | `100` | attribute |
| `value` | number |  |  | attribute |
| `name` | string |  |  | attribute |
| `label` | string |  |  | attribute |
| `fieldId` | string |  |  | **property** |

### `cre8-progress-steps-item`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `state` | string | `error`, `warning`, `complete`, `current`, `incomplete` |  | attribute |
| `message` | string |  |  | attribute |
| `name` | string |  |  | attribute |
| `svg` | string |  |  | attribute |

### `cre8-skeleton-loader`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `variant` | string | `rectangle`, `square`, `circle` | `rectangle` | attribute |
| `height` | string |  |  | attribute |
| `width` | string |  |  | attribute |

## Media

### `cre8-icon`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `focusable` | boolean |  |  | attribute |
| `name` | string |  |  | attribute |
| `svg` | string |  |  | attribute |
| `iconUrl` | string |  | `iconSprite` | **property** |
| `iconTitle` | string |  |  | **property** |

### `cre8-logo`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `href` | string |  |  | attribute |

## Marketing

### `cre8-feature`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `inverted` | boolean |  |  | attribute |
| `imgSrc` | string |  |  | **property** |
| `imgAlt` | string |  |  | **property** |
| `aspectRatio` | string |  |  | **property** |

### `cre8-page-header`

| Prop | Type | Values | Default | Kind |
|---|---|---|---|---|
| `heading` | string |  | `Page header title` | attribute |

## Other

### `cre8-progress-steps`

No declared props — this component is configured entirely by its content.

