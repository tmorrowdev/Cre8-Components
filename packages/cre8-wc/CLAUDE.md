# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
- **Start development**: `pnpm start` - Builds custom-elements.json and starts Storybook
- **Build project**: `pnpm build` - Builds library to `/lib` directory using Vite
- **Watch mode**: `pnpm build:watch` - Builds in watch mode for development

### Testing
- **Run all tests**: `pnpm test` - Runs Jest with verbose output
- **Run specific test**: `pnpm test -- --testNamePattern="ComponentName"` - Run tests for specific component
- **Run tests in CI**: `pnpm run test:jenkins` - Runs tests with CI-optimized settings
- Tests are located in `components/*/test/*.test.ts` following the pattern `<component-name>.test.ts`

### Code Quality
- **Lint code**: `pnpm lint` - ESLint check on TypeScript and HTML files
- **Format code**: `pnpm format` - Auto-fix linting issues
- **Generate custom elements**: `pnpm run build:custom-elements.json` - Analyzes components for Storybook

### Versioning & Release
- **Check version**: `pnpm run version:check` - Preview what version bump would occur
- **Bump version**: `pnpm run version:bump` - Automatically bump version based on conventional commits
- **Release (dry run)**: `pnpm run release:dry` - Preview full release process
- **Full release**: `pnpm run release:publish` - Complete release with npm publish and git push

### Storybook
- **Start Storybook**: `pnpm storybook` - Runs on port 6006
- **Build Storybook**: `pnpm run build-storybook` - Builds static Storybook to `/dist`

## Architecture Overview

### Core Structure
This is a **Lit-based web components library** for Cre8 applications, built with TypeScript and modern ESM tooling.

### Base Classes
- **`Cre8Element`** - Base class for all components, extends `LitElement`
  - Provides `componentClassNames()` utility using classnames library
  - Includes slot utilities (`slotEmpty()`, `slotNotEmpty()`)
  - Custom event dispatch system with `dispatch()` method
- **`Cre8FormElement`** - Base class for form components, extends `Cre8Element`
  - Uses `ElementInternals` API for form association (`static formAssociated = true`)
  - Implements form value management and reset callbacks
  - Required abstract properties: `type`, `field` (HTML form element)

### Component Structure
- **Location**: `components/<component-name>/<component-name>.ts`
- **Styling**: `components/<component-name>/<component-name>.scss` (imported as strings)
- **Stories**: `components/<component-name>/<component-name>.stories.ts`
- **Tests**: `components/<component-name>/test/<component-name>.test.ts`

### Build System
- **Vite** with TypeScript declaration generation via `vite-plugin-dts`
- **ESM-only** output with tree-shaking support (`"type": "module"`)
- **Individual component bundles** - Each component builds to `lib/components/<name>/<name>.js`
- **External dependencies**: Lit, icons, design tokens, and stylesheets are externalized
- **Source maps** and unminified output for debugging

### Design Tokens Integration
- **SCSS variables** available via `design-tokens/core/scss/abstracts/variables.scss`
- **Include paths** configured in Vite for easy imports
- **Component theming** through `design-tokens/core/scss/theming/component.scss`

### Icon System
- **External cre8-icons package**: `@cre8_dev/cre8-icons`
- **Raw SVG imports**: Icons imported as `*.svg?raw` for inline usage
- **Icon component**: `Cre8IconLegacy` for dynamic icon rendering

### Testing Strategy
- **Jest** with jsdom environment and TypeScript support
- **Testing Library** integration with custom accessibility matcher (`toBeAccessible`)
- **Coverage collection** from all component TypeScript files
- **ES modules transformation** for Lit and related packages

### Styling Approach
- **SCSS preprocessing** with Vite
- **Shadow DOM styles** using `unsafeCSS()` from Lit
- **Component-scoped styles** - Each component imports its own stylesheet
- **Design token integration** through SCSS include paths

### Type Definitions
- **Global declarations** in `global.d.ts` for SCSS and SVG imports
- **Component exports** through main `index.ts` with full TypeScript support
- **Form element types** with proper ElementInternals typing

### Storybook Configuration
- **Web Components preset** with Webpack 5
- **SCSS support** configured in webpack final
- **A11y addon** for accessibility testing
- **CSS Variables theme** addon for design token visualization
- **Custom elements analysis** for automatic documentation

### Package Export Strategy
- **Modern ESM exports** with conditional `types`, `import`, and `default` fields
- **Tree-shaking optimized** with `"sideEffects": false`
- **Individual component imports** supported via export map patterns
- **Browser and bundler compatible** with fallback `main` and `module` fields

### Automated Versioning
- **Conventional commits** analysis for semantic versioning
- **Git integration** with automatic tagging and changelog generation
- **CI/CD ready** release scripts with quality gates (lint, test, build)
- **npm publishing** support with optional flags