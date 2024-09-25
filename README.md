
> :construction: **Work in Progress**: The Leaf Web Components library is currently in its early foundational stages. These components are **not recommended for production usage yet.**

# Leaf Web Components (Beta)

Leaf Web Components provides presentational UI components to be consumed by Cre8 web applications. It's built using [web components](https://www.webcomponents.org/introduction) that are based on existing, native HTML web standards.

## Dependencies
The following dependencies are required for running this project locally:
- yarn 3.5+ (via `.yarnrc.yml` file)
- Node 16+
- Component files are built using TypeScript and the [Lit](https://lit.dev/docs/v1/lit-html/introduction/) library's templating system [`lit-html`](https://lit.dev/docs/libraries/standalone-templates/)

Additionally this repo is setup as a [yarn workspace](https://yarnpkg.com/features/workspaces) containing separate `packages`.

**Using VS Code?** We highly recommend the [lit-plugin extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin), which enables some extremely useful features for lit-html templates.

## Getting Started

1. Run `yarn install`. If you run into timeout issues, run `yarn install --network-timeout 10000000`
1. Run `yarn start` to run the Leaf Web Components Storybook.
1. Run `yarn cre8-wc:build` to build the transpiled web components to be used in Leaf React wrappers.
1. Run `yarn cre8-react:start` to run the Leaf React Storybook.
1. Run `yarn cre8-react:build` to build the React wrappers to be consumed by downstream teams.

> Looking to use components downstream? See [Using Components in Projects](#using-components-in-projects)

## Using Components in Projects
Leaf Web Components builds out base reusable components as web components. It also creates React wrappers from those components. Your usage will depend on if your project is using web components or the React framework.

### Using web components

Install the package:
```
yarn add @tmorrow/cre8-wc
```

Import it at the top of your file, then call the component where needed:
```
import { cre8-component-name } from "@tmorrow/cre8-wc";
// Other code...
<cre8-component-name>
```


### Using React components

Install the React wrapper package:
```
yarn add @tmorrow/cre8-react
```

Import it at the top of your file, then call the component where needed:
```
import { Cre8ComponentName } from "@tmorrow/cre8-react"
// Other code...
<Cre8ComponentName>
```

## Storybook

Components, recipes and guides exist on this project's Storybook instance, which can be viewed at https://docs.cre8.dev/cre8-wc/?path=/docs/documentation-changelog--docs

The deployment of Storybook is currently a manual process tied to a branch outside of `develop` and will be slightly out of sync with recent merges to the project.

### Deploying Storybook

The current process:
- Run `./publish-storybook.sh`
  - It will create a new branch and switch you to it, build everything and put it in docs/, it will `git add -f ./docs` and then print out a `git push` command for you to run.
- Push up the branch that it created for you
- Update the Settings->Pages and update it to point to your new branch

### AWS Storybook URLS

Due to Cloudfront caching issues, Dev Candidate (blue) should be used as the beta storybook, and Dev (green) should be used as the released / production storybook.

- Dev Candidate (blue)
  - https://www-dev-candidate.pharmacy.com/cre8-wc/
  - https://www-dev-candidate.pharmacy.com/cre8-react/
- Dev (green)
  - https://docs.cre8.dev/cre8-wc/
  - https://docs.cre8.dev/cre8-react/
- QA Candidate (blue)
  - https://static-qa-candidate.hs-member-web-test.aws.cre8cloud.com/cre8-wc/
  - https://static-qa-candidate.hs-member-web-test.aws.cre8cloud.com/cre8-react/
- QA (green)
  - https://static-qa.hs-member-web-test.aws.cre8cloud.com/cre8-wc/
  - https://static-qa.hs-member-web-test.aws.cre8cloud.com/cre8-react/


You'll notice some urls are `*.pharmacy.com` and some are `*.aws.cre8cloud.com`. The former are a little bit nicer, but aren't available for all environments yet. (Team IO is working on it.) The `cre8cloud` will continue to work even once the `pharmacy` versions are available.

## How to test the software

Please see [CONTRIBUTING](./CONTRIBUTING.md) and read the [code guidelines documentation](docs/CODE_GUIDELINES.md) in order to successfully develop with and contribute to the library.

## Known issues

1. This project requires Node16, but most project locally are still on Node14. We [recommend installing `nvm` to switch between versions of Node](https://github.com/nvm-sh/nvm) when running this project. 

## Getting help

See [GitHub Issues](https://github.com/tmorrowdev/cre8-web-components/issues).

## Getting involved

See [CONTRIBUTING](./CONTRIBUTING.md)

## Credits and references
- [webcomponents.org](https://www.webcomponents.org/introduction)
