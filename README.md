
> :construction: **Work in Progress**: The cre8 Web Components library is currently in its early foundational stages. These components are **not recommended for production usage yet.**

# cre8 Web Components (Beta)

cre8 Web Components provides presentational user interface (UI) reusable components to be consumed by Cigna web applications. It's built using [web components](https://www.webcomponents.org/introduction) that are based on existing, native HTML web standards.

## Dependencies
The following dependencies are required for running this project locally:
- yarn 3.5+ (via `.yarnrc.yml` file)
- Node 16+
- Component files are built using TypeScript and the [Lit](https://lit.dev/docs/v1/lit-html/introduction/) library's templating system [`lit-html`](https://lit.dev/docs/libraries/standalone-templates/)

Additionally this repo is setup as a [yarn workspace](https://yarnpkg.com/features/workspaces) containing separate `packages`.

## How to Use Components in Your Projects
cre8 Web Components builds out base reusable components as web components. It also creates React wrappers from those components. Your usage will depend on if your project is using web components or the React framework.

> :warning: **WARNING**:
> Based on your project's purposes, you **ONLY** need to install ONE package: cre8-wc **OR** cre8-react. 
> DO NOT install both packages.

### Using components in cre8-wc

1. Install the package and the dependencies:
```
yarn add @cre8/cre8-wc
```

2. Import it at the top of your file, then call the component where needed:
```
import { cre8-component-name } from "@cre8/cre8-wc";
```

### Using components in cre8-react

1. Install the React wrapper package and the dependencies:
```
yarn add @cre8/cre8-react
```

2. Import it at the top of your file, then call the component where needed:
```
import { cre8ComponentName } from "@cre8/cre8-react"
```
> :bulb: TIP: 
> **Using VS Code?** We highly recommend the [lit-plugin extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin), which enables some extremely useful features for lit-html templates.

## Storybook

A list of changes for all packages and components of this repository can be found at [Changelog](https://static-dev.esi-memberweb-dev.aws.evernorthcloud.com/cre8-wc/?path=/docs/documentation-changelog--docs)

### How to Run Storybook:
#### WINDOWS
To run the cre8 Web Component Storybook
1. Run `yarn install`. If you run into timeout issues, run `yarn install --network-timeout 10000000`
1. Run `yarn cre8-wc:start` to run the cre8 Web Components Storybook.
1. Run `yarn workspace @cre8/cre8-wc build` to build the transpiled web components to be used in cre8 React wrappers.

To run the cre8 React Storybook
1. Run `yarn run cre8-wc:build` to build the transpiled web components to be used in cre8 React wrappers.
1. Run `yarn workspace @cre8/cre8-react start` to run the cre8 React Storybook.
1. Run `yarn workspace @cre8/cre8-react build` to build the React wrappers to be consumed by downstream teams.

#### MAC
To run the cre8 Web Component Storybook
1. Run `yarn install`. If you run into timeout issues, run `yarn install --network-timeout 10000000`
1. Run `yarn start` to run the cre8 Web Components Storybook.
1. Run `yarn cre8-wc:build` to build the transpiled web components to be used in cre8 React wrappers.

To run the cre8 React Storybook
1. Run `yarn cre8-react:start` to run the cre8 React Storybook.
1. Run `yarn cre8-react:build` to build the React wrappers to be consumed by downstream teams.

### Storybook Links

Extensive documentation on our products that can be found here:
- **Release Guides**: contains only the changes up to and including the mostly recent stable release.
- **Preview Guides**: contains the cutting-edge latest changes merged into our develop branch that have not been released. Great for beta testing! 

- cre8-Web-Components:
  - [Release Web Components Style Guide](https://static-dev.esi-memberweb-dev.aws.evernorthcloud.com/cre8-wc/)
  - [Preview Web Components Style Guide](https://www-dev-candidate.express-scripts.com/cre8-wc/)

  - [Release React Components Style Guide](https://static-dev.esi-memberweb-dev.aws.evernorthcloud.com/cre8-react/) 
  - [Preview React Components Style Guide](https://www-dev-candidate.express-scripts.com/cre8-react/) 

> :information_source: NOTICE:
> You'll notice some urls are `*.express-scripts.com` and some are `*.aws.evernorthcloud.com`. The former are a little bit nicer, but aren't available for all environments yet. (Team IO is working on it.) The `evernorthcloud` will continue to work even once the `express-scripts` versions are available.

## How to test the software

Please see [CONTRIBUTING](./CONTRIBUTING.md) and read the [CODE_GUIDELINES](./packages/cre8-wc/docs/CODE_GUIDELINES.md) in order to successfully develop with and contribute to the library.

## Known issues

1. This project requires Node16, but most project locally are still on Node14. We [recommend installing `nvm` to switch between versions of Node](https://github.com/nvm-sh/nvm) when running this project. 

## Getting help

- See [GitHub Issues](https://github.com/cigna-group/cre8-web-components/issues)
- [WebEx Support Channel](https://eurl.io/#WROPzYNg7)
- [Stack Overflow](https://esrx.stackenterprise.co/)

## Getting involved

See [CONTRIBUTING](./CONTRIBUTING.md)

## Credits and references
- [webcomponents.org](https://www.webcomponents.org/introduction)
