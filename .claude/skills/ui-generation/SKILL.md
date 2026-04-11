---
description: Generate a working HTML page using cre8 web components via the cre8-mcp server
---

# Generate Cre8 UI Page

You are generating a complete, browser-ready HTML page using the cre8 web component library.

## Steps

1. **Understand the request**: Ask clarifying questions only if the user's intent is truly ambiguous. Otherwise, proceed with reasonable defaults.

2. **Use cre8-mcp tools** to build the UI:
   - Use `mcp__cre8-mcp__list_components` or `mcp__cre8-mcp__search_components` to find relevant components
   - Use `mcp__cre8-mcp__get_component` for detailed API info (slots, attributes, events) when needed
   - Use `mcp__cre8-mcp__get_patterns` for common layout patterns
   - Use `mcp__cre8-mcp__generate_code` to produce the component HTML from a JSON schema

3. **Wrap the generated code** in a full HTML page. Every generated page MUST include these CDN imports in the `<head>`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{PAGE_TITLE}}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
  <script type="module" src="https://cdn.jsdelivr.net/npm/@tmorrow/cre8-wc@latest/cdn/cre8-wc.esm.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tmorrow/cre8-wc@latest/lib/design-tokens/brands/cre8-a2ui/css/tokens_cre8-a2ui.css"/>
</head>
<body>
  {{GENERATED_COMPONENT_HTML}}
</body>
</html>
```

4. **Fix any generate_code quirks** before writing the file:
   - Replace any `<cre8-html>` tags with proper HTML elements (`<p>`, `<div>`, etc.)
   - Ensure slot attributes are correctly placed
   - Use plain HTML tags (`<p>`, `<ul>`, `<li>`, `<div>`, `<span>`, `<h1>`-`<h6>`, etc.) for non-component content inside cre8 components like `<cre8-text-passage>`

5. **Write the file** to the project root (or user-specified path) and tell the user the file path so they can open it.

## Schema Tips for generate_code

- Use `{"component": "p", "children": ["text"]}` for plain HTML elements (not `"html"`)
- Use `slots` for named slot content: `{"slots": {"header": [...], "body": [...], "footer": [...]}}`
- Use `children` for default slot content
- Props use camelCase in the schema; the generator converts to kebab-case for web components

## User prompt

$ARGUMENTS
