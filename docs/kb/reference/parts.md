---
title: CSS Shadow Parts Reference
generated: true
generator: docs/kb/tools/generate-reference.mjs
source: packages/cre8-wc/components/*/*.ts (part="..." attributes)
intents:
  - "what parts can I style on this component"
  - "how do I style inside a component"
  - "which components expose css shadow parts"
---

# CSS Shadow Parts Reference

<!-- DO NOT EDIT BY HAND. Regenerate with: node docs/kb/tools/generate-reference.mjs -->

`::part()` is the sanctioned way to style a component's internals when a token
does not cover what you need — the second door in
[Styling across the shadow boundary](../03-token-theming.md#styling-across-the-shadow-boundary).

**Only 10 of 85 components expose any parts.**
This list is read from the component sources, not from `agent-docs/COMPONENTS.md`,
which documents parts for only three of them. If the component you want is not
here, it has no styling escape hatch: use tokens, or open a PR adding a part.

| Component | Parts |
|---|---|
| `cre8-accordion-item` | `body`, `body-inner`, `button`, `heading` |
| `cre8-button` | `button` |
| `cre8-card` | `body`, `card`, `footer`, `header` |
| `cre8-danger-button` | `button` |
| `cre8-feature` | `body`, `feature`, `image` |
| `cre8-heading` | `tag` |
| `cre8-loading-spinner` | `base`, `label` |
| `cre8-pagination` | `icon` |
| `cre8-select-tile` | `body`, `body-body`, `body-title`, `container`, `footer`, `header`, `select-tile` |
| `cre8-table-object` | `header` |

## Using a part

```css
cre8-card::part(header) {
  border-block-end: 1px solid var(--cre8-border-default);
}
```

You can set properties on the part itself. You **cannot** select its descendants —
`::part(header) h3` does not work. If you need that, the component needs a new
part upstream.
