# Changelog

All notable changes to this project will be documented in this file.
We follow the [Semantic Versioning 2.0.0](http://semver.org/) format.

## 1.7.0-beta
Released: Not released

### 🌟 New
- bg default active and bg brand active tokens added to the semantic layer of all brands to support active psuedo states (PR: [#195](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/195))
- body/xlarge-link token added for all brands. label/large adjusted for tcg,chc and cre8 (PR: [#208](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/208))
- neutral tertiary button tokens for all brands (PR: [#3](https://github.com/cigna-group/cre8-design-tokens/pull/3))

### 🎉 Updates
- Updated link tokens for cre8 to match with button tokens to give a more consistent look when they sit next to eachother (PR: [#196](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/196))
- Update content/warning-icon token for cre8 from yellow/30 to neutral/100 (PR: [#184](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/184))
- Update attention tokens for tcg/chc to reflect design. This affects bg, content and border (PR: [#197](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/197))
- Update TCG and CHC menu tokens to match prod (PR [#176](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/176))
- Adding new `Cobrand` theme for cre8 (PR: [#198](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/198))
- Updated CHC/TCG headline, title, and meta typography tokens to match design (PR: (https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/202))
- Updated ERS to reference EN colors (PR: [#206](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/206), Remove footer tokens from ERS.json and erstex.css PR: [#207](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/207))

### 🔩 Internal
- Fix Jenkinsfile for aws deployment and pipeline approval.
- Disable `cnp-preflight-check-git-settings` so that Github Rulesets do not break pipeline.
- Migrated the location of the pipeline from [orchestrator27](https://orchestrator27.orchestrator-v2.sys.cigna.com/job/orchestrators-folders/job/hmdcor-dst/job/Non-Production/) to [orchestrator 38](https://orchestrator38.orchestrator-v2.sys.cigna.com/job/orchestrators-folders/job/ba20094/) - to associate this project to our BA Number [PR #201](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/201)
- Refactor storybook header to follow normalized template (PR: [#204](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/204))

## 1.6.0
Released: 2024-08-08

### 🌟 New
- Added Inverse Link, bg/inverse-active tokens (PR: [#177](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/177))

### 🎉 Updates
- Updates to link tokens for all brands to match design (PR: [#177](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/177))
- bg-brand-hover token for en. updated from tempermint/05 to tempermint/10 (PR: [#180](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/180))
- Update PBM header tokens to match prod. This PR also addresses ERS/TRS token additions to match header architecture in the rest of the brands. This PR also includes a small change to the cre8 brand file for bg-tertiary (PR: [#174](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/174))
- Update PBM, Pharmacy, CHC and TCG meta tokens letter spacing to match cre8. Meta token fontWeights all brands minus Cigna-Legacy updated to Medium. Update letterSpacing 3 and 5 globals for TCG/CHC to make room for the change (PR: [#168](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/168))
- Added border-radius-brand and added deprecation descriptions to border-radius-field-brand and border-radius-button for all brands (PR: [#169](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/169))
- Swap bg/brand and bg/brand-hover values for TCG and CHC (PR: [#171](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/171))
- Update cre8, TCG and CHC border tokens to support field focus border styling (PR: [#170](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/170))
- Adding new `Cobrand` theme (PR: [#178](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/178))

### Internal
- Add conditional statement within `copy_brand_assets` action to skip the step if a brand's `assets/fonts` directory does not exist (PR: [#175](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/175))
- Fix for syntax error causing CSS to incorrectly generate (PR: [#185](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/185))
- Update build to handle cobrands separate from other brand tokens (PR: [#179](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/179))

## 1.5.1
Released: 2024-08-06

### 🔧 Fixes
- Fix PBM header tokens to correct values to match production sites and align with cobranding requirements. (PR: [#186](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/186))

## 1.5.0
Released: 2024-05-30

### 🌟 New
- Add new icon only spacing tokens for all brands (PR: [#130](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/130))
- Add new type tokens for all brands and small adjustments to line heights to existing ones to match design (PR: [#131](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/131))
- Add new `borderRadius/field-brand` tokens for all brands (PR: [#134](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/134))
- Add new typography body/strong variant tokens for all brands (PR: [#137](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/137))
- Add/update `header` navigation tokens for all brands (PR: [#140](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/140), [#156](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/156))
- Add Breakpoint documentation for Storybook (PR: [#143](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/143))
- Add border width token documentation for Storybook (PR: [#144](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/144))
- Adding Typography mixin documentation for Storybook (PR: [#138](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/138), [#142](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/142), PR: [#149](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/149))
- Add Spacing documentation for Storybook (PR: [#146](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/146))
- Add cre8 brand accent color tokens (PR: [#148](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/148))
- Add border radius none token for all brands (PR: [#153](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/153))
- Add bg/moderate and bg/inverse-moderate tokens for all brands (PR: [#152](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/152))
- Add shadow token documentation for Storybook (PR: [#151](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/151))
- Add Documentation for Border Radius and Border Style in storybook under "Choosing Right Token" section (PR: [#155](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/155))
- Adds visual representation of token values and update to Storybook left nav (PR: [#158](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/158), [#160](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/160))
- Add button inverse color tokens for all brands (PR: [#161](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/161))
- Adds `spacing-18` token to PBM and Pharmacy (PR: [#162](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/162))

### 🎉 Updates
- Update cre8 brand base and semantic color tokens to reflect rebranding (PR: [#141](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/141))
- Update cre8 border strong token to meet accessibility color contrast requirements (PR: [#147](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/147))
- Update configuration for CSS generated files to exclude `base` tokens from being created as CSS Custom Properties. Base tokens will no longer appear within CSS files. Semantic tokens will still pull the value of base tokens that they reference. (PR: [#150](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/150))
  - **Please note:** Base tokens are for internal Design Team use only. Base tokens are unavailable for public use and have been removed from the package to be consistent with our supported public API. Review documentation on correct use of Semantic tokens.
- To accommodate cre8 brand accent tokens, build configuration updates were made to isolate accent tokens into a separate file (PR: [#157](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/157))
- Add 'import' statement instruction to pull mixins (PR: [#163](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/163))

### Internal
- Remove outdated file associated with removed Storybook addon
- Update Jenkinsfile to migrate to Orchestrator OV
- Fix `invalidationPath` for AWS deployment (PR: [#159](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/159))

### ⚠️ Deprecated
- Old Icon only spacing token has been slated for deprecation per new additions (PR: [#130](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/130))

## 1.4.0
Released: 2024-02-12

### Fixes
- Added responsive typography for any typography token that had a mobile version. those will respond to screen sizes at the new $cre8-breakpoint-md breakpoint
- Fixed issue for opacity tokens so that they are referencing `rgba()` with comma separated color values instead of hex values for web CSS files (PR: [#124](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/124))
- Fixed `fontWeights` tokens for `pharmacy` brand to have number units instead of text so font weights are applied correctly (PR: [#125](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/125))

### Internal
- Adjust AWS deployment to avoid QA caching issues (PR: [#126](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/126))

## 1.3.0
Released: 2024-01-11
 - Local Storybook port changed to `6008`

### Internal
- Deploy documentation to AWS.

### 🌟 New
- Add breakpoint design tokens for all brands (PR: [#115](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/115))


### 🔧 Fixes
- Resolves links color issue and shows ERS links in blue (PR: [#110](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/110))
- A11y color contrast fix for PBM bg-brand-strong token (PR: [#111](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/111))
- ERS Cobrand update to Page Header (PR: [#112](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/112))
- Updating Healthkit token related docs (PR: [#113](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/113))

### 🎉 Updates
- cre8 theme typography updated from NB Akademie to Inter. This decision is supported by brand, and allows for greater support specifically within native mobile. (PR: [#114](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/114))
- Added token for additional support surrounding tab default border width. This applies to all brands. (PR: [#116](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/116))
- Remove outdated token documentation provided by Storybook addon to avoid confusion. (PR: [#117](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/117))
- Update cre8 Icon-only button spacing tokens per designer feedback. (PR: [#112](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/122))

## 1.2.0
Released: 2023-11-27

### 🌟 New
- Add new global color token to PBM theme to support new a11y color contrast requirements for header (PR [#106](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/106))

### 🎉 Updates
- Update cre8 title large mobile tokens (PR: [#105](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/105))
- Updated PBM header tokens to support new a11y color contrast requirements (PR [#106](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/106))

### 🔧 Fixes
- Fix several instances of outdated documentation and broken links for markdown files and Storybook pages. (PR: [#107](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/107))

## 1.1.0
Released: 2023-11-21

### 🌟 New
- Add (hopefully) temporary ERS cobranding file to handle ERS commitments for 1/1 (PR: [#82](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/82), responsive header fix [#85](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/85))
- New title/small-mobile token for all brands (PR: [#96](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/96))
- cre8 theme added. There is no difference between `healthkit` and `cre8` token files, except that all repos utilizing `healthkit` currently should begin migrating their references to `cre8`. (PR: [#102](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/102))

### 🎉 Updates
- Healthkit cre8 meta token updates for letterSpacing and lineHeights (PR:[#76](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/76))
- Padding token updates. Add vertical icon-only token across brands, update values of horizontal icon-only token to match design, and remove unused vertical and horizontal padding dimension tokens in PBM and Pharmacy brands. (PR: [#78](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/78))
- PBM theme update to Tabs selected state border width from 4px to 2px (PR:[#77](feature/DXUXD1-7160#tabs-pbmpharm-border-width-update))
- Refactor and unit tests for `build.js` (PR: [#79](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/79))
- Client theme folder has been refactored to instead separate the two clients into individual client named folders so it can effectively be exported from the repo. (PR: [#80](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/80))
- Clients TRS and ERS token updates for Page Header (PR: [#81](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/81))
- Remove border radius none token from PBM and Pharmacy (PR: [#89](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/89))
- Update cre8 border radius container token (PR: [#97](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/97))
- Update badge horizontal padding to 6px and add global/semantic spacing token for all brands. (PR: [#99](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/99))

### 🔧 Fixes
- Remove an underscore from `cigna-legacy` token json for fonts that was preventing fonts.css from generating (PR: [#83](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/83/))
- React Native: Added support for dashes in theme names (i.e. `cigna-legacy`). Theme names with dashes had been crashing react native apps because they weren't wrapped in quotes (PR: [#88](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/88))
- Fix injected_tokens file for cre8 where 500 was set to Regular instead of Medium (PR: [#98](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/98))

### ⚠️ Deprecated
- Healthkit theme is being deprecated in lieu of the cre8 theme. (PR: [#102](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/102))

## 1.0.1
Released: 2023-11-06

### 🔧 Fixes
- Fix for Font Family token extra quotation for Pharmacy. The extra quote was causing a CSS error that prevented the font family from being found when the token was used for the Pharmacy theme. (PR: [#92](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/92))

## 1.0.0
Released: 2023-09-20

### 🔥 Breaking Changes

- Branded token path name changed to move individual brands into a brands directory (PR: [#50](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/50))

### 🌟 New
- Unit tests implementation (PR: [#7](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/7))
    - Refactored unit tests to find transformer and formats by name instead of array index in mock calls (PR: [#31](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/31))
- Added support for CHC theme in the build output (PR: [#17](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/17))
- Add `scss/mixinFormat` custom formatter and configuration to generate typography mixins (PR: [#40](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/40))
- Generate `mixins` directory into root of `web` platform directory (PR: [#51](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/51))
- Added footer/content-secondary color tokens for all brands (PR: [#30](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/30))
- Added _base/blue-190 for pbm. Switched pbm content/brand to reference this new value to satisfy accessibility requirements (PR: [#29](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/29))
- Adding the following custom client themes: (PR: [#35](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/35))
    - ERS
    - TRS
- Generate `@font-face` declarations by adding custom transform, formatter and action for Style Dictionary (PR: [#28](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/28))
- Added missing header menu and submenu tokens for: (PR: [#47](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/47))
    - PBM
    - Pharmacy
    - TCG
    - CHC
    - Healthkit
    - Custom Clients
- Added missing shadow none tokens to: (PR: [#48](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/48))
    - PBM
    - Pharmacy
- Updating repo with Storybook (PR: [#57](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/57))
- Add JSON linter (PR: [#55](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/55))
- Add progress meter height token to all brands (PR: [#59](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/59))
- Add stylelint-config and have it `--fix` built sass files to make them easier to manually review. (PR: [#62](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/62))
- Github Pages [hosted](https://git.express-scripts.com/pages/ExpressScripts/cre8-design-tokens/) storybook (PR: [#66](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/66)).
- Adding documentation on `how to use tokens` and display of `Healthkit-tokens`  (PR: [#65](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/65))
- Added additional accent colors to base globals for CHC (PR: [#67](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/67))
- Added for all brands a new bg/opacity-default token to accommodate overlay (PR: (69)(https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/69))

### 🎉 Updates
- Border radius container and badge padding tokens (PR: [#18](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/18))
    - Added border radius container
    - Added badge padding
    - Added semantic border widths for pbm and pharmacy (none, default, large, and focus)
    - Removed the plural version of these values
- PBM and Pharmacy bg/active token changed to dark-blue-150, respective of each brand. (PR: [#37](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/37/files))
- Fixed font family formatting for CHC (PR: [#17](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/17))
- Remapped borderStyle to border-style, added _base border-style values and semantic border-style default token to all brands (PR: [#38](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/38))
- tcg/chc color changes. Yellow base ramp updated. Warning tokens updated. Button tokens updated. bg/brand-strong-active updated. chc only: footer/bg-secondary updated (PR: [#26](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/26))
- TCG and CHC color and typography changes for bg-active token. (PR: [#37](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/37))
- Update Style Dictionary config to use `copy_assets` action to include copies of font files into generated `lib` directory (PR: [#41](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/41))
- Update `assets/fonts` to contain appropriate font files per brand (PR: [#42](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/42))
- Internally migrate from yarn v1 to 3.6.1.
- Internally installing `@cigna/` scoped packages should now be supported.
- Update label type tokens for PBM to rubik medium instead of regular (PR: [#46](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/46))
- Update cre8 Healthkit bg/warning-strong and content/warning-icon tokens to yellow.30 (PR: [#45](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/45))
- Updated title default and large tokens to reflect design on PBM brand (PR: [#49](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/49))
- Updated title default and large line height tokens to reflect design on PBM (PR: [#52](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/52))
- Update css/typography brandFormat to add font file when provided as part of build (PR: [#54](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/54))
- Updated cre8 Healthkit headline tokens to bold and adjusted line height/letter spacing (PR: [#58](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/58))
- Updated all brands bg/transparent token to bg/opacity-transparent for clarity and to accommodate additional bg/opacity-default token (PR: (69)(https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/69))

### 🔧 Fixes
- Removed accented colors from the token architecture. These values are handled at the pattern library level now, implemented by brand developers via a custom css overide. (PR: [#14](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/14))
- Small changes to the tcg and chc typography sets surrounding size and weight (PR: [#20](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/20))
- cre8 healthkit changes
    - Link tokens changed from regular to medium weight. (PR: [#24](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/24))
    - Semantic color changes requested from design for bg-subtle and bg-disabled (PR: [#23](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/23))
    - Footer color changes for link-hover and bg-default (PR: [#22](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/22))
- Removed unused token from pharmacy theme (PR: [#27](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/27), Issue: [#21](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/issues/21))
- Use the non-beta version of `@esi/eslint-config` v5.0.1 (PR: [#39](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/39))
- Set correct exit code on error (PR: [#63](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/63))
- Updated PBM and Pharmacy themes to reflect design. Specifically, this is typography changes to meta and headline/xsmall (PR: [#71](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/71))
- Remove `accredo`, `esrx`, `cre8`, `vanilla` themes from repo (PR: [#70](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens/pull/70))

## 0.1.0
Released: 2023-06-28

### 🌟 New

- Using `@esi` package namespace due to complications with artifactory and the need for the package to distribute to multiple teams in varying org structures. See [Artifactory Issues page on Confluence](https://confluence.sys.cigna.com/display/NATS/Artifactory+Issues) for more
 - Moving repo back into ESI Github space, renaming to resolve devops issue with this move.
- Set project to build separate packages of tokens per brand
- Updates to documentation:
    - README
    - CONTRIBUTING
- Fixed tokens from pbm in JSON to be:
    - fontfamilies.rubik: 'Rubik', sans-serif - Design validation received that it works in figma as well
- Fixed tokens from tcg in JSON to be:
    - fontfamilies.mont: 'Montserrat', sans-serif - Design validation received that it works in figma as well
- Fixed a reintroduced bug found in fontweights for pbm:
    - numeric values had all been replaced by their language-based figma values....returned them to numerical and confirmed by Design that they still work and output as expected.
- Fixed the one percentage value to be 0 instead of 0% for letterspacing in pbm
- borderWidth.button.tertiary.outline.focus value changed to correct ref format using {ref} format and validated correct output on build.
- fixed bug in formatter that output broken fontsizes or spacing values or borderWidths that didnt have units of measure associated so that they all still convert to rems
- removed the typography custom formatter that created mixins as we are now using a static set of mixins for tier 2 values (unless we receive new tier 2 values from design which should be documented here if that occurs in the future). Each brand should have a set of {tier 2 name}-{attribute category} tokens which are then grouped together in a @mixin {tier-2-name} format within each component library's theming files.
- Added the new healthkit brand tokens to demonstrate the future state of typography this should be what each brand should be supplying us in the json files
- Added a new version of tcg, pbm and healthkit tokens with typography tokens not expanded, but added a custom formatter to handle expanding the typography tokens and importing in the other brand tokens so all token refs are made available. deleted the legacy pharmacy brand tokens
- Added injectable JSON tokens that merge with the uploaded token to add asset paths and @font-face for fonts, other assets or emergency overrides if needed.

- Integrated `jest-config` enables to run unit tests (PR: [#91](https://github.sys.cigna.com/cigna/design-tokens/pull/91))
