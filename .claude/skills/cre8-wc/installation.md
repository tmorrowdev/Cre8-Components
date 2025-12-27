# CRE8 Web Components Installation Guide

## Package Information

- **Package**: `@cre8_dev/cre8-wc`
- **Current Version**: 1.0.13
- **Repository**: https://github.com/tmorrowdev/Cre8-Components
- **Framework**: Lit 3.x (Web Components)

## Installation Methods

### 1. npm Registry (Recommended for Production)

```bash
# npm
npm install @cre8_dev/cre8-wc

# pnpm
pnpm add @cre8_dev/cre8-wc

# yarn
yarn add @cre8_dev/cre8-wc
```

### 2. GitHub (Latest Development)

```bash
# Install from main branch
pnpm add github:tmorrowdev/Cre8-Components#main

# Install specific version/tag
pnpm add github:tmorrowdev/Cre8-Components#v1.0.13
```

### 3. Local Development (Monorepo)

If working within the cre8-web-components monorepo:

```bash
# From repo root
pnpm install

# Build the package
cd packages/cre8-wc
pnpm build

# Link for local development
pnpm link --global
```

## Setup

### Basic HTML

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Include design tokens/theme -->
  <link rel="stylesheet" href="node_modules/@cre8_dev/cre8-wc/design-tokens/brands/cre8/css/tokens_cre8.css">
</head>
<body>
  <!-- Import components as ES modules -->
  <script type="module">
    import '@cre8_dev/cre8-wc/components/button/button.js';
  </script>

  <cre8-button text="Hello World" variant="primary"></cre8-button>
</body>
</html>
```

### Vite / Modern Bundler

```typescript
// main.ts or app entry point

// Import all components
import '@cre8_dev/cre8-wc';

// Or import specific components
import '@cre8_dev/cre8-wc/components/button/button.js';
import '@cre8_dev/cre8-wc/components/card/card.js';
import '@cre8_dev/cre8-wc/components/modal/modal.js';

// Import theme
import '@cre8_dev/cre8-wc/design-tokens/brands/cre8/css/tokens_cre8.css';
```

### React Integration

```tsx
// React wrapper approach
import '@cre8_dev/cre8-wc/components/button/button.js';

function App() {
  return (
    <cre8-button
      text="Click Me"
      variant="primary"
      onClick={() => console.log('clicked')}
    />
  );
}
```

For full React support, use `@cre8_dev/cre8-react` package.

### Next.js

```typescript
// next.config.js - ensure transpilation
const nextConfig = {
  transpilePackages: ['@cre8_dev/cre8-wc'],
};

// In component (client-side only)
'use client';
import dynamic from 'next/dynamic';

const Cre8Button = dynamic(
  () => import('@cre8_dev/cre8-wc/components/button/button.js').then(() => null),
  { ssr: false }
);
```

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

// In component
import '@cre8_dev/cre8-wc/components/button/button.js';
```

## TypeScript Configuration

Add to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "types": ["@cre8_dev/cre8-wc"]
  }
}
```

## Theme Setup

### Available Themes

| Theme | Import Path |
|-------|-------------|
| CRE8 (default) | `design-tokens/brands/cre8/css/tokens_cre8.css` |
| Consumer | `design-tokens/brands/consumer/css/tokens_consumer.css` |
| Marketing | `design-tokens/brands/marketing/css/tokens_marketing.css` |

### Custom Theming

Override CSS custom properties:

```css
:root {
  /* Colors */
  --cre8-color-brand-primary: #your-color;
  --cre8-color-brand-secondary: #your-color;

  /* Typography */
  --cre8-font-family-default: 'Your Font', sans-serif;

  /* Spacing */
  --cre8-spacing-default: 16px;

  /* Border radius */
  --cre8-border-radius-default: 8px;
}
```

## Peer Dependencies

The package requires:

```json
{
  "lit": "^3.0.0"
}
```

Install if not already present:

```bash
pnpm add lit
```

## Verification

Test installation:

```html
<script type="module">
  import '@cre8_dev/cre8-wc/components/button/button.js';

  // Verify component is registered
  console.log(customElements.get('cre8-button')); // Should log the class
</script>

<cre8-button text="Test" variant="primary"></cre8-button>
```

## Troubleshooting

### Components not rendering

1. Ensure ES modules are used (`type="module"`)
2. Check console for import errors
3. Verify theme CSS is loaded

### TypeScript errors

1. Add `"skipLibCheck": true` to tsconfig.json
2. Ensure proper moduleResolution

### SSR Issues (Next.js, Nuxt)

Web components require browser APIs. Use dynamic imports with SSR disabled:

```typescript
// Next.js
import dynamic from 'next/dynamic';
const Component = dynamic(() => import('./component'), { ssr: false });
```

## Development

Run Storybook to explore all components:

```bash
cd packages/cre8-wc
pnpm storybook
```

Build the library:

```bash
pnpm build
```

Run tests:

```bash
pnpm test
```
