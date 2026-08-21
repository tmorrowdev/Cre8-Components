
> :construction: **Work in Progress**: The cre8 Web Components library is currently in its early foundational stages. These components are **not recommended for production usage yet.**

# cre8 Web Components (Beta)

cre8 Web Components provides presentational user interface (UI) reusable components to be consumed by Cre8 web applications. It's built using [web components](https://www.webcomponents.org/introduction) that are based on existing, native HTML web standards.

## Documentation

The [cre8 Knowledge Base](docs/kb/README.md) covers components, composition patterns, token theming, A2UI, AI fluency, and framework integration. It is intent-routed — start at the [Intent Map](docs/kb/INTENT-MAP.md) and search by what you are trying to do:

**Guides** — [Components](docs/kb/01-components.md) · [Composition patterns](docs/kb/02-composition-patterns.md) · [Token theming](docs/kb/03-token-theming.md) · [A2UI (agent-generated UI)](docs/kb/04-a2ui.md) · [AI fluency in cre8](docs/kb/05-ai-fluency.md) · [Other frameworks](docs/kb/06-frameworks.md) · [Research and sources](docs/kb/07-research.md)

**Look something up** — generated from the manifests and component source, so they cannot go stale:
[components](docs/kb/reference/components.md) · [props](docs/kb/reference/props.md) · [events](docs/kb/reference/events.md) · [tokens](docs/kb/reference/tokens.md) · [CSS parts](docs/kb/reference/parts.md) · [A2UI content model](docs/kb/reference/content-model.md)

Regenerate with `pnpm kb:generate`; `pnpm kb:check` verifies every claim, link, and code example in the KB against the shipped implementation.

## Agent tooling, and an eval of it

Two ways an agent can build UI from this library: the `cre8-a2ui` skill (markdown
reference pages) and [`@tmorrow/cre8-mcp`](packages/cre8-mcp) (the catalog
answered live over MCP).

[`evals/cre8-a2ui-vs-mcp`](evals/cre8-a2ui-vs-mcp) is a five-task
[Harbor](https://github.com/harbor-framework/harbor) case study comparing them
against a no-knowledge baseline. Scoring is deterministic and offline — no LLM
judge — against fixtures regenerated from this repo's own generated catalog.
`./selftest.sh` in that directory reproduces the scorer's behaviour with no
Docker, agent, or API key.

## Dependencies
The following dependencies are required for running this project locally:

- pnpm
- Node 18+
- Component files are built using TypeScript and the [Lit](https://lit.dev/docs/v1/lit-html/introduction/) library's templating system [`lit-html`](https://lit.dev/docs/libraries/standalone-templates/)



## How to Use Components in Your Projects
cre8 Web Components builds out base reusable components as web components. It also creates React wrappers from those components. Your usage will depend on if your project is using web components or the React framework.





### Using components in cre8-wc

1. Install the package:
```
pnpm i @tmorrow/cre8-wc
```

2. Import the library and a theme once, then use the elements anywhere in your markup:
```js
import '@tmorrow/cre8-wc';
import '@tmorrow/cre8-wc/themes/cre8';
```
```html
<cre8-button text="Save" variant="primary"></cre8-button>
```




## Storybook

### How to Run Storybook:

#### MAC
To run the cre8 Web Component Storybook
1. Run `pnpm install`. If you run into timeout issues, run `pnpm install --network-timeout 10000000`
1. Run `cd packages/cre8-wc && pnpm start` to run the cre8 Web Components Storybook.
1. Run `pnpm build` to build the transpiled web components 
