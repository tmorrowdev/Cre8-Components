---
title: Usage in Other Frameworks
intents:
  - "how do I use cre8 in react"
  - "how do I use cre8 in next.js"
  - "how do I use cre8 in vue"
  - "how do I use cre8 in angular"
  - "how do I use cre8 in svelte"
  - "how do I use cre8 with no build step"
  - "why does my event handler not fire"
  - "why does my form submit nothing"
  - "why do I get hydration errors"
see_also: [01-components, 03-token-theming, 04-a2ui]
sources:
  - packages/cre8-wc/package.json (exports)
  - packages/cre8-wc/react-manifest.json
---

# Usage in Other Frameworks

cre8 components are standard custom elements, so they run in every framework. But
"runs" and "works well" differ, and the gap is always one of four problems. Read
[The four interop problems](#the-four-interop-problems) first — it explains most of what follows, and it is
the section people should have read before filing the bug.

## The four interop problems

Custom elements predate every framework's component model, and each framework
bridges the gap differently.

**1. Events.** Custom elements dispatch `CustomEvent`s. React (≤18) only knows
about its synthetic event system, so `onClick` on a `<cre8-button>` binds nothing.
Vue, Angular, and Svelte have declarative syntax for DOM events, so they are fine.

**2. Complex properties.** HTML attributes are strings. Passing an array or object
requires setting a *property*, not an attribute. Frameworks that always write
attributes (React ≤18, Angular templates without binding syntax) will stringify
your data into `[object Object]`.

**3. SSR.** Custom elements are defined by JavaScript that runs in a browser.
Server rendering produces the tags but no shadow DOM, so the markup arrives
unstyled and unupgraded until hydration. This is the source of both flash-of-
unstyled-content and hydration mismatch warnings.

**4. Forms.** cre8 form components are form-associated
([The two base classes](01-components.md#the-two-base-classes)), so they work inside a native `<form>`
in every framework — submission and reset behave. **Constraint validation does
not**: `required`, `pattern`, `min`/`max` are forwarded to the inner `<input>`,
whose validity never reaches the host, so an empty required field passes
`form.checkValidity()` and submits ([Forms that behave](02-composition-patterns.md#forms-that-behave)).
"Native form only" in the table below means exactly that and no more: they do **not**
automatically integrate with framework form libraries that expect to own the
value and read it off a synthetic event.

| | Events | Complex props | SSR | Forms |
|---|---|---|---|---|
| **React 18** | needs wrapper | needs wrapper | needs client boundary | native form only |
| **React 19+** | native | native | needs client boundary | native form only |
| **Vue 3** | native | native | needs `client-only` | native |
| **Angular** | native | native | needs guard | native |
| **Svelte** | native | native | needs guard | native |
| **Plain HTML** | native | native | n/a | native |

The rest of this page is the per-framework version of that table.

## React

Use the wrappers. `@tmorrow/cre8-react` v2.0.7 wraps all 85 components with
`@lit/react` for React 18+, which solves problems 1 and 2 — events and complex
properties.

```bash
pnpm add @tmorrow/cre8-react
```

```tsx
import { Cre8Button, Cre8Card, Cre8Heading } from '@tmorrow/cre8-react';
import '@tmorrow/cre8-wc/themes/cre8';

export function PlanCard() {
  return (
    <Cre8Card>
      <span slot="header">
        <Cre8Heading tagVariant="h3" type="title-default">Monthly plan</Cre8Heading>
      </span>
      <p>Everything in Basic, plus priority support.</p>
      <span slot="footer">
        <Cre8Button text="Upgrade" variant="primary" onClick={handleUpgrade} />
      </span>
    </Cre8Card>
  );
}
```

Notes that save time:

- **Names are PascalCase**, props are camelCase: `Cre8Button`, `tagVariant`.
  `@lit/react` maps them onto the underlying element correctly.
- **Slots still use the `slot` attribute.** There is no React-idiomatic slot API —
  wrap slotted content in an element carrying `slot="header"`.
- **Tokens are a plain CSS import**, once, at the app entry. They are bundled in
  `@tmorrow/cre8-wc`; do not go looking for a separate tokens package
  ([What ships](00-orientation.md#what-ships)).
- **React 19** supports custom elements natively — properties and events both —
  so raw tags work. Keep using the wrappers anyway: you get TypeScript types and
  autocomplete, which raw tags do not give you.
- **Forms need care — the wrappers do not solve problem 4.** Because cre8 form
  components are form-associated ([The two base classes](01-components.md#the-two-base-classes)), they
  participate correctly in a **native** `<form>`: submission and reset work, and
  `new FormData(form)` sees their values — but constraint validation does not
  propagate ([Forms that behave](02-composition-patterns.md#forms-that-behave)). What does *not* happen
  automatically is integration with React's controlled-input model or with form
  libraries such as React Hook Form, which expect to own the value and read it
  off a synthetic event. For those, read values from the form on submit, or
  register the control manually — the React equivalent of the
  `ControlValueAccessor` work described under [Angular](#angular).

→ *To render agent-generated UI inside React, validate and render the A2UI spec
into a ref'd container rather than translating it to JSX by hand — see
[Validation](04-a2ui.md#validation). Use `generate_code` with `format: "react"` when you want
committed JSX instead.*

## Next.js and SSR

Custom elements need `document` and `window`. Two rules cover every case:

**1. Mark the boundary.** In the App Router, any file importing cre8 components
needs `'use client'`.

```tsx
'use client';
import { Cre8Button } from '@tmorrow/cre8-react';
```

**2. Import tokens in the root layout**, where they are a plain stylesheet and
have no client requirement:

```tsx
// app/layout.tsx  — a server component
import '@tmorrow/cre8-wc/themes/cre8';
```

If you get hydration mismatches, the cause is almost always that the element
definition loaded on the client and changed the DOM the server had produced.
Dynamic import with SSR disabled is the escape hatch:

```tsx
const Chart = dynamic(() => import('./chart').then(m => m.Chart), { ssr: false });
```

Use it narrowly — per component, not per page. Custom elements do not currently
declarative-shadow-DOM their way to a clean SSR story here, so the pragmatic
position is: server-render the page shell, client-render the components.

**Flash of unstyled content.** Between HTML arriving and definitions upgrading,
elements are unstyled. Load the token stylesheet in `<head>` (the root layout
import does this) and, if the flash is still visible, gate the first paint on
`customElements.whenDefined('cre8-button')` for above-the-fold content.

## Vue

Vue 3 handles events and complex props natively. One config line stops Vue from
warning about unknown components:

```js
// vite.config.js
export default {
  plugins: [vue({
    template: { compilerOptions: { isCustomElement: tag => tag.startsWith('cre8-') } },
  })],
};
```

```vue
<script setup>
import '@tmorrow/cre8-wc';
import '@tmorrow/cre8-wc/themes/cre8';
</script>

<template>
  <cre8-card>
    <span slot="header">
      <cre8-heading tagVariant="h3" type="title-default">Monthly plan</cre8-heading>
    </span>
    <cre8-button text="Upgrade" variant="primary" @click="onUpgrade" />
    <cre8-select :items="items" @change="onChange" />
  </cre8-card>
</template>
```

- **Attributes are camelCase, not kebab-case** — `tagVariant`, never
  `tag-variant`, which binds to nothing. This is not a Vue rule; it applies to
  all hand-written markup. See
  [Attribute names are camelCase, never kebab-case](01-components.md#attribute-names-are-camelcase-never-kebab-case).
- `:prop` binding sets a **property**, which is how arrays and objects get through
  intact. Use it for anything non-scalar.
- `@event` works for custom events, including cre8's own. Names are
  `component-action` kebab-case (`tab-change` on tabs, `modal-close` on modal),
  except form components that keep the native name (`change` on select). See
  [`reference/events.md`](reference/events.md).
- For Nuxt, wrap in `<client-only>` or import components in a client-side plugin.
- Volar and the VS Code custom-data extensions can type these from a custom
  elements manifest. One exists at `packages/cre8-wc/custom-elements.json` (and
  a copy at the `.storybook/` path named in the package's `customElements`
  field) — but note it is **not in the published `files` list**, so it is
  reachable when working in this repo and not from an installed
  `node_modules/@tmorrow/cre8-wc`. Publishing it would be a small, high-value
  change for downstream editor tooling.

## Angular

Add the schema once, per module or standalone component:

```ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <cre8-card>
      <span slot="header">
        <cre8-heading tagVariant="h3" type="title-default">Monthly plan</cre8-heading>
      </span>
      <cre8-button text="Upgrade" variant="primary" (click)="onUpgrade()"></cre8-button>
      <cre8-select [items]="items" (change)="onChange($event)"></cre8-select>
    </cre8-card>
  `,
})
export class PlanCardComponent {}
```

- `[prop]` sets a property (use for arrays/objects); a bare attribute sets a
  string.
- `(event)` binds DOM events, custom ones included.
- Import the library and tokens once in `main.ts`.
- For Angular Universal, guard definition registration behind
  `isPlatformBrowser`.
- **Reactive forms** need a `ControlValueAccessor` per control type. Form-associated
  custom elements satisfy native forms, not Angular's form model — this is
  problem 4 in its Angular shape.

## Svelte

Svelte's compiler is the most forgiving target: events and properties both work
without configuration.

```svelte
<script>
  import '@tmorrow/cre8-wc';
  import '@tmorrow/cre8-wc/themes/cre8';
  let items = [{ label: 'Monthly', value: 'm' }];
</script>

<cre8-card>
  <span slot="header">
    <cre8-heading tagVariant="h3" type="title-default">Monthly plan</cre8-heading>
  </span>
  <cre8-button text="Upgrade" variant="primary" on:click={onUpgrade} />
  <cre8-select {items} on:change={onChange} />
</cre8-card>
```

Svelte sets a property when one exists on the element and falls back to an
attribute otherwise, which is the behavior you want. For SvelteKit, import the
library in `onMount` or a `browser`-guarded module.

## Plain HTML and CDN

The fastest path, and the one to use for prototypes, demos, and anything an agent
renders standalone. **Use the `cdn/` build, not `lib/`.**

```html
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@tmorrow/cre8-wc@2.0.7/lib/design-tokens/brands/cre8/css/tokens_cre8.css">
<script type="module"
        src="https://cdn.jsdelivr.net/npm/@tmorrow/cre8-wc@2.0.7/cdn/cre8-wc.esm.js"></script>

<cre8-card>
  <span slot="header">
    <cre8-heading tagVariant="h3" type="title-default">Monthly plan</cre8-heading>
  </span>
  <cre8-button text="Upgrade" variant="primary"></cre8-button>
</cre8-card>
```

> **This is the most common CDN mistake.** The `lib/` build lists Lit and other
> dependencies as *external* — it is built for bundlers and will fail from a CDN
> with unresolved bare imports. The `cdn/` build inlines everything and
> self-registers every component. There is no import map and no named import to
> write; one `<script type="module">` is the whole integration.

Two artifacts:

| File | Format | Use |
|---|---|---|
| `cdn/cre8-wc.esm.js` | ES module | Modern browsers, `<script type="module">` |
| `cdn/cre8-wc.min.js` | IIFE, global `Cre8WC` | Legacy loaders |

Pin the version in the URL. `@latest` will silently move your UI under you.

## Choosing an integration

| Situation | Do this |
|---|---|
| React app | `@tmorrow/cre8-react` wrappers |
| Next.js App Router | Wrappers + `'use client'`; tokens in root layout |
| Vue / Nuxt | Raw elements + `isCustomElement`; `client-only` for Nuxt |
| Angular | Raw elements + `CUSTOM_ELEMENTS_SCHEMA` |
| Svelte / SvelteKit | Raw elements, browser-guarded import |
| Prototype, demo, email-able page | CDN `esm.js` |
| Agent-rendered UI | A2UI renderer — [A2UI — Agent-Generated UI](04-a2ui.md) |

→ *Whatever the framework, the theme import is the same file and the token
overrides work identically — see [Token Theming](03-token-theming.md).*
