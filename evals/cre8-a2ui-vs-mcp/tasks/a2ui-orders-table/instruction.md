You are building UI for Innovexa, a web app built on the CRE8 design system's
web component package `@tmorrow/cre8-wc` (version 2.3.1).

Write a single A2UI spec to `/app/ui.a2ui.json`. An A2UI spec is a JSON tree of
CRE8 components:

```json
{
  "component": "cre8-layout",
  "props": { "variant": "..." },
  "children": [ { "component": "cre8-main", "children": ["text is allowed here"] } ],
  "slots": { "header": [ { "component": "cre8-heading" } ] }
}
```

- `children` is free content, for components that accept it.
- `slots` addresses a component's named slots.
- A child is either a nested node object or a plain string of text.
- An envelope of the form `{"schema": "cre8-a2ui/1.0", "root": { ... }}` is also
  accepted; so is a bare root node.

Every component name, prop name, prop value and slot name you write must be one
that the installed version of `@tmorrow/cre8-wc` actually ships. A smaller spec
built only out of real components scores better than a richer one that names
components, props or slots the library does not have. Do not invent components
to fill a gap - express the requirement with what exists.

Write only the JSON file. Nothing else is scored.

## What to build

The **Recent orders** table on the billing page.

- A table captioned `Recent orders` with the column headers `Order`, `Customer`,
  `Status`, `Total`.
- Three data rows:
  - `#4471`, `Northwind Labs`, paid, `$1,240.00`
  - `#4470`, `Acme Robotics`, refunded, `$860.00`
  - `#4469`, `Contoso Metals`, failed, `$2,100.00`
- In the `Status` cell of each row, show the state as a small pill rather than
  as bare text.

The table family is a set of parent and child components that have to nest in a
specific order; a level skipped in the middle still renders, but produces markup
that is subtly wrong. Nest them the way the library's own worked examples nest
them.
