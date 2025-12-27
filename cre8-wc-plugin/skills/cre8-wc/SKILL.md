---
name: cre8-wc
description: CRE8 Web Components library skill. Use when building UI with cre8-wc components, asking about cre8 components (button, modal, card, form fields, etc.), needing component API documentation, installing @cre8_dev/cre8-wc, or implementing design system patterns. Triggers on "cre8", "web components", "design system", component names like "cre8-button", "cre8-modal".
allowed-tools: Read, Grep, Glob, Bash
---

# CRE8 Web Components Skill

This skill provides documentation and guidance for using the **@cre8_dev/cre8-wc** web components library - a collection of 85+ UI components built with Lit.

## Quick Reference

### Installation

```bash
# npm
npm install @cre8_dev/cre8-wc

# pnpm (recommended)
pnpm add @cre8_dev/cre8-wc

# From GitHub (latest)
pnpm add github:tmorrowdev/Cre8-Components#main
```

### Basic Usage

```html
<!-- Import components -->
<script type="module">
  import '@cre8_dev/cre8-wc/components/button/button.js';
  import '@cre8_dev/cre8-wc/components/card/card.js';
</script>

<!-- Use components -->
<cre8-button text="Click me" variant="primary"></cre8-button>

<cre8-card>
  <div slot="header">Card Title</div>
  <p>Card content goes here</p>
  <div slot="footer">
    <cre8-button text="Action" variant="secondary"></cre8-button>
  </div>
</cre8-card>
```

### Import All Components

```typescript
import '@cre8_dev/cre8-wc';
```

## Component Documentation

For detailed component information, query the documentation file:

```bash
# Search components
node packages/cre8-wc/scripts/search-components.js <keyword>

# Get full component details
node packages/cre8-wc/scripts/search-components.js --tag <component-name>

# List by category
node packages/cre8-wc/scripts/search-components.js --category form
```

**Or read the JSON documentation directly:**
- `packages/cre8-wc/components.json` - Full component API documentation

## Component Categories

| Category | Components |
|----------|------------|
| **Form** | button, checkbox-field, radio-field, select, field, date-picker, multi-select |
| **Layout** | grid, layout, section, band, linelength-container |
| **Navigation** | tabs, breadcrumbs, pagination, primary-nav, global-nav |
| **Feedback** | alert, modal, loading-spinner, progress-meter, skeleton-loader |
| **Data Display** | card, table, badge, tag, icon, list |
| **Overlay** | modal, popover, tooltip, dropdown |

## Common Patterns

### Form with Validation

```html
<cre8-field
  label="Email"
  type="email"
  required
  errorNote="Please enter a valid email">
</cre8-field>

<cre8-button text="Submit" type="submit" variant="primary"></cre8-button>
```

### Modal Dialog

```html
<cre8-modal
  ariaLabel="Confirmation dialog"
  .isActive=${showModal}>
  <div slot="header">
    <cre8-heading type="title-large">Confirm Action</cre8-heading>
  </div>
  <p>Are you sure you want to proceed?</p>
  <div slot="footer">
    <cre8-button text="Cancel" variant="secondary" @click=${close}></cre8-button>
    <cre8-button text="Confirm" variant="primary" @click=${confirm}></cre8-button>
  </div>
</cre8-modal>
```

### Card Grid

```html
<cre8-grid columns="3" gap="md">
  <cre8-grid-item>
    <cre8-card>
      <div slot="header"><img src="image.jpg" alt=""></div>
      <cre8-heading type="title-small">Card Title</cre8-heading>
      <p>Description text</p>
    </cre8-card>
  </cre8-grid-item>
</cre8-grid>
```

## Theming

Components support theming via CSS custom properties:

```css
:root {
  --cre8-color-brand-primary: #0066cc;
  --cre8-color-brand-secondary: #004499;
  --cre8-border-radius-default: 8px;
}
```

Import a theme:
```javascript
import '@cre8_dev/cre8-wc/design-tokens/brands/cre8/css/tokens_cre8.css';
```

## Additional Documentation

For detailed reference, read these files:

- [Installation Guide](installation.md) - Complete setup instructions for all frameworks
- [Components Quick Reference](components-quick-ref.md) - Copy-paste examples for all components

## Resources

- **Component Source**: `packages/cre8-wc/components/`
- **Documentation JSON**: `packages/cre8-wc/components.json`
- **Storybook**: Run `pnpm storybook` in packages/cre8-wc
- **Design Tokens**: `packages/cre8-wc/design-tokens/`

## Getting Help

To look up a specific component's API:

1. Read `packages/cre8-wc/components.json` and search for the component
2. Or run: `node packages/cre8-wc/scripts/search-components.js --tag <name>`
3. Check the component source at `packages/cre8-wc/components/<name>/<name>.ts`
