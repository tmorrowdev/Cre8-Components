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

The **platform status strip** shown at the top of the developer console.

- A full-width banner notification, visually strong rather than subtle, warning
  that the API is degraded. Its heading text is `Degraded performance` and its
  body reads `Write requests are queuing in us-east-1. Reads are unaffected.`
  Style it as a warning.
- Three small status pills, one per service, each showing the service name and
  reading as its state: `Dashboard` is healthy (success), `API` is in a warning
  state, `Webhooks` is in an error state.
- A small, lowest-visual-priority action labelled `View incident history`.
- A large, highest-visual-priority action labelled `Subscribe to updates`.

Use the prop and value that each component actually defines for these states -
a status word that a component does not accept will not render the state you
asked for.
