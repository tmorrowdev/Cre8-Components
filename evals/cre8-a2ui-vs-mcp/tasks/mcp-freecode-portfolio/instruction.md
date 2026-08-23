You are building UI for Innovexa, a web app built on the CRE8 design system's
React package `@tmorrow/cre8-react` (version 2.3.5).

A minimal Vite + React + TypeScript app is already scaffolded at `/app`.
`react`, `react-dom`, and `@tmorrow/cre8-react` are already installed. Edit
`/app/src/App.tsx` - it's the only file that's scored. Write real code:
import components from `@tmorrow/cre8-react` and use them as JSX, the way a
developer actually building this page would.

```tsx
import { Cre8Card, Cre8Heading } from '@tmorrow/cre8-react';

export default function App() {
  return (
    <Cre8Card>
      <div slot="header"><Cre8Heading tagVariant="h2">Title</Cre8Heading></div>
      <p>Body content.</p>
    </Cre8Card>
  );
}
```

- Props go on the JSX element as normal React props.
- A named slot is a plain element with a `slot="name"` attribute, same as
  the underlying custom element expects - `@tmorrow/cre8-react` doesn't
  invent a different convention for this.
- `App.tsx` must export a default component and build cleanly
  (`npm run build` from `/app`, already wired up). A component that fails to
  build scores zero - there is nothing to render.

Every component name, prop name, prop value and slot name you use must be one
that the installed version of `@tmorrow/cre8-react` actually exports and
declares. A smaller component built only out of real ones scores better than
a richer one that invents props, values or slots the library does not have.
Do not invent components to fill a gap - express the requirement with what
exists. Plain HTML elements (`div`, `span`, `p`, ...) are fine for layout and
text; they just aren't scored the way `cre8-*` components are.

Do not add new npm dependencies. Nothing outside `/app/src/App.tsx` is
scored.

## The brief

Design and build a unique and eye-catching portfolio for an AI engineer.

Invent the person and their work - name, focus, projects, results. Make it
something they would be glad to send to a hiring manager.
