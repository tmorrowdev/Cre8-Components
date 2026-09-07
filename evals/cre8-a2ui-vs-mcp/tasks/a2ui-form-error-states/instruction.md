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

The **sign-up form** for a new workspace, showing its validated state.

- A form heading reading `Create your workspace`.
- An email input labelled `Work email` that is currently in its **error** state.
  The message shown under the input must read
  `Enter a work email address - free providers are not supported.`
- A password input labelled `Password` that is currently in its **success**
  state, with the message `Strong password.` shown under it.
- A submit action labelled `Create workspace`.
- A confirmation dialog, currently open, headed `Confirm your email` with the
  body `We sent a link to dana@innovexa.com.` and a close control labelled
  `Close`.

The error and success messages must actually reach the rendered output. Some
props are declared by a component but never read by it - a message set through
one of those is silently dropped, which is the failure this page must not have.
