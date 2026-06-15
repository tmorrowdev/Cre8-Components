




# Cre8 Design System - Frontend Development

Build production-ready, framework-agnostic UI components using the Cre8 Design System specification. This skill enables consistent, accessible, and themeable interfaces across any frontend framework.

## Trigger Conditions

Use this skill when the user asks to:

- Build UI components, pages, or layouts
- Create frontend interfaces with consistent styling
- Generate components from design tokens
- Implement responsive, accessible UI patterns
- Create themed or dark-mode-ready interfaces
- Translate designs into code for React, Vue, Svelte, or vanilla HTML/CSS

## Design System Reference Files

```
.claude/skills/frontend-development/references/design-system/
├── components/cre8-component-schema.json  # Component specifications & patterns
└── theming/
    ├── tokens.ts                          # TypeScript theme object
    └── apple.css                          # Example theme (Apple HIG-inspired)
```

## Core Principles

### 1. Token-First Development

All styling derives from design tokens. Never use hardcoded colors, spacing, or other values.

```css
/* CORRECT */
background: var(--cre8-color-bg-default);
border-radius: var(--cre8-border-radius-default);
padding: 16px; /* Use spacing scale: 0, 2, 4, 8, 16, 24 */

/* INCORRECT */
background: #ffffff;
border-radius: 8px;
padding: 15px;
```

### 2. Semantic Color Usage

Use semantic color tokens that adapt to themes and dark mode:

| Purpose | Token Pattern | Example |
|---------|---------------|---------|
| Backgrounds | `--cre8-color-bg-{variant}` | `--cre8-color-bg-default`, `--cre8-color-bg-error` |
| Text/Content | `--cre8-color-content-{variant}` | `--cre8-color-content-default`, `--cre8-color-content-subtle` |
| Borders | `--cre8-color-border-{variant}` | `--cre8-color-border-default`, `--cre8-color-border-brand` |
| Buttons | `--cre8-color-button-{variant}-{property}` | `--cre8-color-button-primary-bg` |

### 3. Status Colors

Six semantic status values for feedback and states:

| Status | Use Case | Tokens |
|--------|----------|--------|
| `error` | Validation errors, failures | `--cre8-color-bg-error`, `--cre8-color-border-error`, `--cre8-color-content-error` |
| `warning` | Caution, potential issues | `--cre8-color-bg-warning`, `--cre8-color-border-warning` |
| `success` | Confirmations, completions | `--cre8-color-bg-success`, `--cre8-color-border-success`, `--cre8-color-content-success` |
| `info` | Informational messages | `--cre8-color-bg-info`, `--cre8-color-border-info` |
| `attention` | Highlights, calls to action | `--cre8-color-bg-attention`, `--cre8-color-border-attention` |
| `neutral` | Default, no specific meaning | Uses default tokens |

Each status has `-strong` variants for higher contrast (e.g., `--cre8-color-bg-error-strong`).

---

## Component Categories

The design system organizes 85+ components into 8 categories:

| Category | Count | Purpose | Base Class |
|----------|-------|---------|------------|
| `form` | 15 | User input and form controls | `Cre8FormElement` |
| `layout` | 10 | Page structure and containers | `Cre8Element` |
| `navigation` | 18 | Navigation patterns and links | `Cre8Element` |
| `feedback` | 8 | User feedback and status indicators | `Cre8Element` |
| `data-display` | 17 | Data visualization and content display | `Cre8Element` |
| `overlay` | 4 | Modal and popup content | `Cre8Element` |
| `typography` | 2 | Text formatting components | `Cre8Element` |
| `utility` | 11 | Supporting and structural components | `Cre8Element` |

---

## Common Component Patterns

### Button Pattern

```
Variants: primary | secondary | tertiary | danger
Sizes: sm | md | lg
States: default | hover | disabled | loading

Token mapping:
- Primary: --cre8-color-button-primary-{bg|bg-hover|border|content}
- Secondary: --cre8-color-button-secondary-{bg|bg-hover|border|content}
- Tertiary: --cre8-color-button-tertiary-{bg|bg-hover|content}
- Danger: --cre8-color-button-primary-danger-{bg|bg-hover|border|content}
```

### Form Validation Pattern

All form components support:

```typescript
interface FormValidation {
  isError?: boolean;
  errorNote?: string;
  isSuccess?: boolean;
  successNote?: string;
}
```

Tokens for validation states:
- Error: `--cre8-color-border-error`, `--cre8-color-content-error`, `--cre8-color-bg-error`
- Success: `--cre8-color-border-success`, `--cre8-color-content-success`, `--cre8-color-bg-success`
- Disabled: `--cre8-color-bg-disabled`, `--cre8-color-content-disabled`, `--cre8-color-border-disabled`

### Inverse/Dark Background Pattern

For content on dark backgrounds:

```typescript
interface InversePattern {
  inverse?: boolean;  // or 'inverted'
}
```

Use knockout tokens:
- `--cre8-color-content-knockout` (white text on dark)
- `--cre8-color-border-knockout`
- `--cre8-color-content-brand-knockout`

### Icon Pattern

```typescript
interface IconPattern {
  svg?: string;              // Preferred: inline SVG string
  iconPosition?: 'left' | 'right';
  iconRotateDegree?: number;
  iconFlipDirection?: 'horizontal' | 'vertical';
}

// Sizes
--cre8-icon-size-small: 16px
--cre8-icon-size-default: 20px
--cre8-icon-size-large: 24px
```

---

## Framework Implementation Guide

### React / Next.js

Create a theme object for CSS-in-JS or use CSS custom properties directly:

```tsx
// Option 1: Direct CSS variable usage
const Button = ({ variant = 'primary', children }) => (
  <button
    style={{
      background: `var(--cre8-color-button-${variant}-bg)`,
      color: `var(--cre8-color-button-${variant}-content)`,
      borderRadius: 'var(--cre8-border-radius-button)',
      border: 'none',
      padding: '8px 16px',
      cursor: 'pointer',
      transition: `background var(--cre8-anim-fade-quick) var(--cre8-anim-ease)`,
    }}
  >
    {children}
  </button>
);

// Option 2: Import theme object from tokens.ts
import { aidssTheme } from './design-system/theming/tokens';
```

### Tailwind CSS

Extend `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'bg-default': 'var(--cre8-color-bg-default)',
        'bg-subtle': 'var(--cre8-color-bg-subtle)',
        'bg-brand': 'var(--cre8-color-bg-brand)',
        'content-default': 'var(--cre8-color-content-default)',
        'content-subtle': 'var(--cre8-color-content-subtle)',
        'border-default': 'var(--cre8-color-border-default)',
        'error': 'var(--cre8-color-bg-error)',
        'success': 'var(--cre8-color-bg-success)',
      },
      borderRadius: {
        'cre8': 'var(--cre8-border-radius-default)',
        'cre8-sm': 'var(--cre8-border-radius-small)',
        'cre8-container': 'var(--cre8-border-radius-container)',
      },
      boxShadow: {
        'cre8': 'var(--cre8-shadow-default)',
        'cre8-md': 'var(--cre8-theme-box-shadow-md)',
      },
    },
  },
};
```

### Vue / Nuxt

Use CSS custom properties in scoped styles or create a composable:

```vue
<script setup lang="ts">
const tokens = {
  bgDefault: 'var(--cre8-color-bg-default)',
  contentDefault: 'var(--cre8-color-content-default)',
  borderDefault: 'var(--cre8-color-border-default)',
};
</script>

<style scoped>
.card {
  background: var(--cre8-color-bg-default);
  border: 1px solid var(--cre8-color-border-default);
  border-radius: var(--cre8-border-radius-container);
  box-shadow: var(--cre8-shadow-default);
}
</style>
```

### Svelte

Use CSS custom properties in component styles:

```svelte
<style>
  .button {
    background: var(--cre8-color-button-primary-bg);
    color: var(--cre8-color-button-primary-content);
    border-radius: var(--cre8-border-radius-button);
    transition: background var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  }

  .button:hover {
    background: var(--cre8-color-button-primary-bg-hover);
  }
</style>
```

### Vanilla CSS / HTML

Include a theme CSS file (e.g., `apple.css`) and use tokens directly:

```html
<link rel="stylesheet" href="path/to/apple.css">

<style>
  .card {
    background: var(--cre8-color-bg-default);
    border: var(--cre8-border-width-default) solid var(--cre8-color-border-default);
    border-radius: var(--cre8-border-radius-container);
    box-shadow: var(--cre8-shadow-default);
    padding: 16px;
  }
</style>
```

---

## Token Reference

### Spacing Scale

| Token | Value |
|-------|-------|
| `0` | 0 |
| `2` | 2px |
| `4` | 4px |
| `8` | 8px |
| `16` | 16px |
| `24` | 24px |

### Border Radius

| Token | Purpose |
|-------|---------|
| `--cre8-border-radius-none` | No rounding |
| `--cre8-border-radius-small` | Subtle rounding |
| `--cre8-border-radius-default` | Standard components |
| `--cre8-border-radius-button` | Buttons |
| `--cre8-border-radius-container` | Cards, modals |
| `--cre8-border-radius-round` | Pills, badges |

### Shadows

| Token | Purpose |
|-------|---------|
| `--cre8-shadow-default` | Subtle elevation |
| `--cre8-shadow-button` | Button depth |
| `--cre8-theme-box-shadow-md` | Medium elevation (cards, dropdowns) |

### Animation

| Token | Purpose |
|-------|---------|
| `--cre8-anim-fade-quick` | Fast transitions (200ms typical) |
| `--cre8-anim-ease` | Standard easing curve |
| `--cre8-loading-animation` | Spinner animation |

### Layout

| Token | Purpose |
|-------|---------|
| `--cre8-l-max-width` | Page max width |
| `--cre8-l-linelength-width` | Optimal text line length |
| `--cre8-sidebar-width` | Sidebar width |

---

## Implementation Workflow

### 1. Load the Schema

Before building components, read the schema to understand:
- Available component specifications
- Required and optional props
- Semantic usage guidelines (whenToUse, whenNotToUse)
- AI hints for prop inference

### 2. Apply a Theme

Include a theme CSS file that defines all `--cre8-*` custom properties. The theme provides:
- Light mode defaults
- Dark mode via `@media (prefers-color-scheme: dark)`
- All color, spacing, and effect tokens

### 3. Build Components

For each component:
1. Check the schema for prop definitions and patterns
2. Use semantic HTML elements
3. Apply tokens via CSS custom properties
4. Include accessibility attributes (aria-*, role)
5. Support all standard states (hover, focus, disabled, loading)
6. Add TypeScript types when applicable

### 4. Validate Accessibility

Ensure components meet WCAG 2.1 AA:
- Color contrast ratios (use strong variants for text on colored backgrounds)
- Keyboard navigation
- Screen reader support
- Focus indicators (`--cre8-color-border-active-outline`)

---

## Output Requirements

When generating components:

1. **Semantic HTML** — Use appropriate elements (`<button>`, `<nav>`, `<article>`, etc.)
2. **Token-based styling** — All colors, spacing, radii, shadows from tokens
3. **Accessibility** — Include `aria-*` attributes, proper roles, focus states
4. **State support** — Handle hover, focus, disabled, loading, error, success
5. **Responsive** — Use layout tokens and responsive patterns
6. **TypeScript** — Include type definitions for props when applicable
7. **Documentation** — Add comments explaining token usage and patterns

---

## Example: Card Component

```tsx
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated';
  status?: 'error' | 'warning' | 'success' | 'info';
}

const Card: React.FC<CardProps> = ({ children, variant = 'default', status }) => {
  const borderColor = status
    ? `var(--cre8-color-border-${status})`
    : 'var(--cre8-color-border-default)';

  const bgColor = status
    ? `var(--cre8-color-bg-${status})`
    : 'var(--cre8-color-bg-default)';

  return (
    <div
      style={{
        background: bgColor,
        border: `var(--cre8-border-width-default) solid ${borderColor}`,
        borderRadius: 'var(--cre8-border-radius-container)',
        boxShadow: variant === 'elevated' ? 'var(--cre8-theme-box-shadow-md)' : 'none',
        padding: '16px',
      }}
    >
      {children}
    </div>
  );
};
```
