# leaf-design-tokens
A repository for storing and managing design tokens for the [Enterprise Design System](https://confluence.sys.cigna.com/display/WIPMDL).

> [View the Storybook for this project](https://static-dev.esi-memberweb-dev.aws.evernorthcloud.com/leaf-design-tokens/)

## Dependencies
- yarn (any version >= 1.0 will use the [locally installed version](https://classic.yarnpkg.com/en/docs/yarnrc#toc-yarn-path))
- [Style Dictionary](https://amzn.github.io/style-dictionary/#/) 3.0.0+
- Node >= 14.18.1

## Install

Install `design-tokens` in your project:

```
yarn add @esi/leaf-design-tokens
```
> Using the [@esi/ui-components](https://git.express-scripts.com/ExpressScripts/ui-components)? The design-tokens package is already installed in that library! Please follow the configuration instructions within the uic.

### Cigna Developers

This project builds to the ESI Artifactory for distribution to allow for developers on both the ESI and Cigna side to install the package.

If you're on the **Cigna** side of the firewall, add the following to your `~/.npmrc` and `~/.yarnrc` files:

```
registry "https://artifactory.express-scripts.com/artifactory/api/npm/npm-virtual/"

strict-ssl=false
```

## Configuration

 Your configuration will depend on your project platform. Below are the formats generated currently within this project and their status.

| Format | Status | Implementation |
|--------|-------------|-------------|
| scss | Active Development | Implements tokens as sass variables. Includes a sass mixin for typography presets |
| css | Active Development | Implements tokens as CSS Custom Properties. Used in generated typography sass mixins to help with dynamic theming |
| reactNative | Active Development | JavaScript file containing a JS object of tokens. For use within React Native projects. Consumed and provided within the mobile components library. |

### For Web Projects

For web applications, use the css/scss files provided by the `web` package:

If your project is using Sass variables:

```
// Replace `brand-name` with the brand name your project needs
`@import '@esi/leaf-design-tokens/lib/web/brands/brand-name/tokens-brand.scss';`
```
**Note**: Refrain from importing or using SASS variables located in the `@esi/leaf-design-tokens/lib/web/brands/brand-name/css/_base.css` files found in each brand theme. Any SASS variable starting with `$leaf-base-` is an internal artifact and subject to change without notice. In future versions of this library, these files will not be importable.

If your project is using CSS Custom Properties:

```
// Replace `brand-name` with the brand name your project needs
@import '@esi/leaf-design-tokens/lib/web/brands/brand-name/css/tokens-brand.css';
```
**Note**: Need to support dynamic theming? Use the CSS Custom Properties option!

**Warning**: Internal variables are included in some scopes. These variables start with `--leaf-base-`. Please refrain from using these variables as they are subject to change (in both value and availability) without notice.

#### About Accent Color Overrides

Within the Enterprise token architecture, we benefit from a shared token architecture. What this means for our brands, is that everyone shares a similar naming convention for all of their tokens, which in turn enables dynamic theming across brands and applications.

However, there are times when a brand will have a legitimate use case for overriding this token architecture in order to enhance brand expression. When these use cases arise, we bubble these values up at the brand pattern library level where a designer will override the token utilized on the component with a custom value. These tokens do not populate in the brand file, instead they are isolated into a separate "accent" file.

**Note**: Currently, accent tokens only exist for the Evernorth brand. Additional brands will be added as the needs arise.

If your project is using Sass variables:

```
// Replace `brand-name` with the brand name your project needs
@import '@esi/leaf-design-tokens/lib/web/brands/brand-name/accent.scss';
```

If your project is using CSS Custom Properties:

```
// Replace `brand-name` with the brand name your project needs
@import '@esi/leaf-design-tokens/lib/web/brands/brand-name/css/tokens_accent.css';
```

The name of the game is to keep things as locked down as possible, until there is a need for it. We encourage brand designers and developers to work together to take advantage of custom css overrides in order to allow for these brand level use cases.

Again, by utilizing these accent tokens, you are departing from the dynamic theming of your application across brands. Accept these tokens at your own risk as these are changes that the design system cannot maintain on your behalf and is maintenance that your product team is taking on. 

## Storybook URLs
This project deploys its Storybook for documentation at the following AWS sites:

- Beta Version: https://www-dev-candidate.express-scripts.com/leaf-design-tokens/ 
- Released Version: https://static-dev.esi-memberweb-dev.aws.evernorthcloud.com/leaf-design-tokens/ 

## References & Further Reading
- [Design Tokens W3C Community Group](https://www.designtokens.org/)
- [Style Dictionary API](https://amzn.github.io/style-dictionary/#/api)
- [Style Dictionary Pre-defined Transform Groups](https://amzn.github.io/style-dictionary/#/transform_groups?id=pre-defined-transform-groups)
- [Design Tokens POC Demo](https://confluence.sys.cigna.com/display/WIPMDL/Design+tokens+demo+-+Aug+16%2C+2021)
- [Dynamic Theming Demo, 2023](https://confluence.sys.cigna.com/display/WIPMDL/Dynamic+Theming+Demo+-+Apr+7%2C+2023)
- [Design Token Docs in Confluence](https://confluence.sys.cigna.com/pages/viewpage.action?pageId=639569302)

