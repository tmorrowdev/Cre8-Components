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

The **Account overview** page for a signed-in customer.

- A page heading reading `Account overview`.
- An identity block for the signed-in customer: their display name `Dana Whitfield`
  and their initials `DW` shown as a compact visual marker next to the name.
- A prominent, dismissible notification that this month's payment failed. It must
  read `Payment failed - update your card to avoid service interruption` and must
  be styled as an error.
- Three key numbers, each with its label and value: `Balance` `$4,280.00`,
  `Open invoices` `3`, `Next payment` `Mar 14`.
- A list of the four most recent account events, each a single line of text:
  `Invoice #4471 issued`, `Card ending 4242 declined`, `Seat added: r.okafor`,
  `Plan changed to Scale`.
- A primary call to action labelled `Add funds`, and a lower-priority action
  labelled `Download statements`.
