You are building UI for Innovexa, a web app built on the CRE8 design system's
web component package `@tmorrow/cre8-wc` (version 2.3.2).

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

Write only the JSON file. Nothing else is scored.

## The brief

Design and build a unique and eye-catching portfolio for an AI engineer.

Invent the person and their work — name, focus, projects, results. Make it
something they would be glad to send to a hiring manager.
