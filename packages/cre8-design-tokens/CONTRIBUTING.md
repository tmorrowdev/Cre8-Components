# Contributing

Please reference our centralized [contributing documentation](https://confluence.sys.cigna.com/x/QR8fJg) that this project shares with other Council of Ricks projects.

## Set up your dev environment

See [package.json](https://git.express-scripts.com/ExpressScripts/cre8-web-components/blob/develop/package.json) and [README.md](https://git.express-scripts.com/ExpressScripts/cre8-web-components/blob/develop/README.md) for full list of project dependencies.

To install locally, clone the repository and then run `yarn install`

> **Note** This project runs Storybook 7+ to display documentation, which requires Node16. You will need to `nvm` switch to this before doing the storybook build if your local doesn't default to Node16.

## Building the Tokens

We use [Style Dictionary](https://amzn.github.io/style-dictionary/#/) to build our design tokens.

To build the tokens locally, run `yarn build` in your terminal. This generates the files in the `lib` folder after removing any pre-existing files from it.

### Package Distribution

The `lib` directory is what's published to artifactory to consume by projects using the design tokens.

Style Dictionary lets you define which code format you want for your tokens. Our current package distribution creates the following to be consumed, separated per brand:

- `web`: css/scss files
  - `css/fonts.css`: This file provides the `@font-face` declarations specific to each brand's font files.
  - `assets/fonts`: Font files referenced within `fonts.css`
- `react-native`: js files with js object.


## How the build works

The `build` command will run the custom script `build.js`. The file contains a list of brands to loop through to build tokens.

The tokens are stored in different folders within the `tokens` directory, with separate directories per brand. These files are what are used by Style Dictionary as it builds out different file formats containing tokens to consume by developers.

During the build:
1. The script loops on all the possible combinations of platforms on a per-brand basis to generate a configuration file for Style Dictionary to use when it builds.
1. This configuration object is created from the `getStyleDictionaryConfig` function within `build.js`.
1. This config is passed to Style Dictionary's `buildPlatform()` function
1. The generated files and folders are dropped into the `lib`  directory, after any existing files in that directory are removed.

We're currently developing with the usage of the [Token Studio](https://docs.tokens.studio/) plugin to generate JSON files straight from Figma. These JSON files are currently committed into the repo in the `tokens` directory, pushed up as branches via Token Studio.

### Add once, alias frequently

One goal of the tokenization effort is to use aliases as much as possible. This helps to reduce maintenance by having a value exist in one place should the need for changes come up. An example of this is the definition of color related tokens.

The ideal format is that once a certain token value is defined, that instance is referenced in other tokens. Base tokens are defined within the JSON files, and those base tokens are referenced elsewhere. Style Dictionary reads the dot notation format of the base tokens aliases and outputs the correct references in the generated files at build time.

During the build, these tokens may also be transformed based on build configurations (for platform, format, etc).

### Naming conventions, transforms, and organization

Transforms, formatting, and filtering within Style Dictionary are used to determine organizing related tokens into their final file.

While Style Dictionary provides a number of pre-defined [transforms](https://amzn.github.io/style-dictionary/#/transforms?id=pre-defined-transforms) and [transformGroups](https://amzn.github.io/style-dictionary/#/transform_groups) for manipulating the final generated file output, we will add our own transforms as needed.

### Token Injection/Overrides
The build script will append/replace root tokens from the `tokens_injected.json` file located in the `tokens/brand/[BRAND_NAME]` directories. This is used to inject `cssFontFace` platform `asset` tokens to allow for the wiring of font files to families and weights. In the future this pattern could be used to do the same with iconography or other linked assets in CSS. 

**note** `tokens_injected.json` is deep-merged into the brand token on build. This means that **_any_** token can be changed through this file. Since this file is not generated from Figma these overrides can produce deviation from the visual design that generated the tokens. Any use, outside of providing paths to assets (or other token related tasks not covered by Figma exports), should be temporary in nature if done at all. These changes will not be present in the `tokens_[BRAND].json` file, so be sure when troubleshooting to verify that problematic tokens were not added to this file. 

#### Platforms

We've defined the following `platform` configurations:

- `importedScss`: Used to create `.scss` partials based on token category. 
  - Used to build the files referenced in `tokens-brand.scss` file generated by `web`
- `importedCss`: Used to create `.css` partials based on token category.
  - Contains CSS Custom Properties
  - Files build to `css` directory within each brand contained by `web`
- `web`: For use in web application projects.
    - Files build to `web` directory, separated by brand
      - `tokens-brand.scss`: File containing Sass imports built by `importedScss` via a custom format. Exclude typography tokens due to mixins presets
     
- `sassVarToCSSVar`: A backward compatible mapping of Sass Variables to CSS Custom Properties with the same naming convention. Created using a custom format.
    - Files build to `support` directory, separated by brand
    - Is an optional configuration for projects that currently use Sass variables & want to migrate to using CSS Custom Properties
- `reactNative`: For use in React Native projects. Tokens formatted as a JS Object.
  - Creates `tokens-brand.js` and its corresponding `tokens-brand.d.ts` file in the `react-native` directory, separated by brand.
  - Creates `index.js` and its corresponding `index.d.ts` file in the `react-native` directory.

**In progress**
- `cssFontFace`: Used to generate `@font-face` declarations based on the `asset` JSON schema in token files

#### Current custom formats

- `font-face`: Generates a file that contains `@font-face` declarations from tokens with the `fontFiles` type. Based on a [Style Dictionary example](https://github.com/amzn/style-dictionary/tree/main/examples/advanced/font-face-rules)
- `scss/brandWithGlobals`: Loops through the tokens and configuration to build a Sass file that does `@import`s of Sass partials named after token types.
- `support-scss/variables`: Builds a Sass file that maps Sass variables to their CSS Custom Property equivalent.
- `react-native/object`: Exports a flat object with key/value pairs of token and RN style value
- `react-native/typescript-declaration`: Exports a .d.ts file for the object created with the above format, returning a `string`, `number`, `TextStyle` or `ViewStyle`
-  `css/typography`: Takes the typography composite token from token studio export and breaks it up into its comprising attributes: `font-family`, `font-size`, `line-height`, `letter-spacing`, `font-weight`, `text-decoration`, and `text-transform` so that appending the name to the token type provides an abstraction layer for brand theming
- `scss/mixinFormat`: Builds a typography mixin based on Design System definitions for tokens with the `typography` type. Maps to CSS Custom Properties definitions for dynamic theming purposes.

[See more on creating formats on Style Dictionary's documentation](https://amzn.github.io/style-dictionary/#/formats)

#### Current custom transforms

**Note**: The ordering of transforms matter in Style Dictionary.

- `attribute/font`: This adds necessary attributes specific to font file tokens to use when transforming them into `@font-face` declarations. Based on a [Style Dictionary example](https://github.com/amzn/style-dictionary/tree/main/examples/advanced/font-face-rules)
- `size/convertPxToRem`: Figma includes the suffix of `px` by default for its font sizing and spacing related values. This transform removes the `px` if it exists, looks at the `basePxFontSize` setting in the config and uses that setting to convert those values to `rem` units instead for the final file.
- `lineHeights/percentageToUnitless`: Figma can handle percent based line-heights, but doesn't account for unitless. Unitless values work better for development, so this transform makes the necessary calculation to transform the percentage line-heights into unitless values.
- `name/cre8Format`, `name/cre8FormatJs`: The JSON structure of the tokens includes `_base` definitions that are considered Tier One tokens used for defining and aliasing to other tokens. While we want references to these base tokens, we need the name structure changed to reference the token's `type` attribute for use in projects.
- `rn/shadow`: converts a css shadow to React Native object shadow style.
- `rn/typographyValue`: converts css to React Native object style for typography values
- `rn/unitlessValues`: React Native doesn't deal with relative units (rem), percentages for many values, or px. This transform converts string values with units to numbers.
- `web/hexrgba`: Converts Figma's usage of hex code in `rgba()` into comma separated `rgba()` format for web.

[See more on Style Dictionary's documentation](https://amzn.github.io/style-dictionary/#/transforms?id=transforms).
