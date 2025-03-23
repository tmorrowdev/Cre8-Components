# Change Log

All pull requests should add an entry (or entries) to this log.
Doing helps when releasing and debugging production.
This file should use [Semantic Versioning](http://semver.org/).

This CHANGELOG lists changes for all `packages` contained within this repository.

---

## 1.0.0-beta

Release date: TBD

### Fixes
- Fix the `popover` accessibility issues [#549](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/549)
- Clarify usage of `onClose` in cre8-react storybook documentation for `cre8Modal` [#557](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/557)
- Modal responsive fixes for footer slot padding and body not scrolling [#7](https://github.com/cigna-group/cre8-web-components/pull/7)
- Remove deprecated `Healthkit` theme from Storybook's theme switcher. This theme [was deprecated from the cre8-design-tokens package in v1.1.0](https://github.com/cigna-group/cre8-design-tokens/blob/develop/CHANGELOG.md#%EF%B8%8F-deprecated-1) and has not received updates. `Evernorth` theme is loaded by default instead. [#18](https://github.com/cigna-group/cre8-web-components/pull/18)

### Updates
- `Alert` component build:
  - Create Alert component based on the design requirements [#548](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/548)
- `MultiSelect` component work:
  - Design and Accessibility review [#2](https://github.com/cigna-group/cre8-web-components/pull/2)
  - Design and Accessibility review 2.0 (checkbox items) [#11](https://github.com/cigna-group/cre8-web-components/pull/11)
- Add Inverted styles to `Danger Button` [#561](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/561)
- Tag List component build, includes updates to Tag component [#556](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/556)
  - Design review [#20](https://github.com/cigna-group/cre8-web-components/pull/20)
  - Accessibility review [#19](https://github.com/cigna-group/cre8-web-components/pull/19)
- `Button` Add neutral property to secondary variant of button component. [537](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/537)
- Progress Steps and Progress Steps item component builds [PR#538](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/538)
- Update to use `@cre8/cre8-icons` version 0.6.0 [#566](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/566)
- Danger Button Accessibility review adjustments ([#PR-5](https://github.com/cigna-group/cre8-web-components/pull/5), [#PR-9](https://github.com/cigna-group/cre8-web-components/pull/9))
- Update event types for React components [#14](https://github.com/cigna-group/cre8-web-components/pull/14)
- `Button` Add inverse property to Primary, Secondary, and Tertiary variants of button component [#6](https://github.com/cigna-group/cre8-web-components/pull/6), add Tertiary Neutral and Tertiary Neutral Inverse variants [#21](https://github.com/cigna-group/cre8-web-components/pull/21)

### Internal
- Bump version of `devDependency` `@cre8/eslint-config` to v6.0.0-beta to use ignore pattern related to cre8-icons imports (PR: [#567](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/567))
- Change the click functionality of the cre8 Storybook logo to redirect the user to the main page/changelog without opening a new tab (PR: [#555](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/555))
- Run `test:jenkins` with `--runInBand` flag to avoid resource timeout issues on builds (PR: [#568](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/568))
- Disable `cnp-preflight-check-git-settings` so that Github Rulesets do not break pipeline.
- Update `README.md` to clarify the package installation for users.

## 0.5.0

Release date: 2024-09-11

### Fixes
- Fix the inner dividers between accordion items and make it as optional in the `accordion` [#508](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/508)
- Adjustments to `breadcrumb` related components for better accessibility and linting alignments [#541](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/541)
- Design tokens update and fixes styles for `link` component [#552](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/552)

### Updates
- DatePicker component build:
  - Calendar new feature enhancements and adjustments (design and accessbility reveiw not included) [#479](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/479)
  - Date Picker Accessibility review adjustments [#494](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/494)
  - Date Picker Design Review adjustments [#505](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/505)
  - Date Picker final signoff requirements from design/accessibility [#521](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/521)
- Add the icon variant for the badge component and update to the unit tests. [PR#485](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/485)
- Pagination component updated to adhere to accessibility standards; Voiceover experience improved.  [#492](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/492)
- `Button` Add inverse neutral property to Secondary variant of button component. [553](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/553)
- Documentation update to storybook move table documentation from unsupported to components section. [517](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/517)
- Added Select component documentation to storybook to show a preselected option variant [#515](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/515)
- `Dropdown` components updates allow button and link on dropdown and dropdown items [#510](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/510
)
- Remove Tag component build:
  - A Remove Tag can be used within Multi-Select or used entirely on their own, such as in a list of filters [#520](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/520)
- Percent Bar of Progress Steps component build [#526](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/526)
- Danger Button component build:
  - Danger Button initial build [#533](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/533)
- Checkbox Tag variant build [#528](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/528)
- Multi Select component build:
  - `MultiSelect` initial build! (pending design/accessibility review) [#529](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/529)
- Update to use `@cre8/cre8-design-tokens` version 1.6.0 [#544](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/544)
- Update storybook navigation `@cre8/cre8-web-components` to better reflect supported and depreciated components. [#546](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/546)
- Update document for `Icon` [#545](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/545), [#547](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/547)

### Internal
- adjust frameWaitTime for toBeAccessible tests to help with failing Jenkins builds
- Pagination jest test fix [#503](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/503)
- Update cre8-icon-legacy to cre8-icon [#507](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/507), [#527](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/527), [#535](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/535), [#543](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/543)
  - `accordion-item`
  - `breadcrumbs-item`
  - `checkbox-field-item`
  - `modal`
  - `select-title`
  - `table-row`
  -`field-note`
  -`inline-alert`
  -`select`
  - `button`
  - `link`
  - `tooltip`
- Fix the select.test.ts [522](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/522)
- Migrate from HS Jenkins to OV2 Jenkins ([#523](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/523)).
- Fix pipeline aws deployment after migrating from CNP to EPF ([#539](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/539)).
- Normalize storybook headers to align storybook presentation across all repositories ([#542](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/542))
- Update `plop` templates used to generated new components ([#551](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/551))

## 0.4.1

Release date: 2024-07-01

### Fixes
- Removed an unnecessary referral to a source-map file in the index file of cre8 React. (PR: [#500](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/500))
  - This fixes compilation issues related to `@cre8/cre8-react` that was causing an error for consumers.


---

## 0.4.0

Release date: 2024-06-13

### Breaking Changes
- Rename `cre8-accordion` to `cre8-accordion-item` and `cre8-accordion-group` to `cre8-accordion` in LWC and cre8 React. PR: [#484](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/484)

### Fixes
- Removes unnecessary z-index on active tab to prevent overlay issues. PR [431](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/431)
- Fix bug in `checkbox-field-item` that prevented onchange handler from being called when disabled="false". PR [443](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/443)
- Hotfix to pagination to ensure that focus leaves the selected page after selection for accessibility compliance which recommends focus shift to the top of the results page that has been selected. PR[446](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/446)
- Fixes to prevent multiple radio options selection PR: [#448](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/448)
- Design review edits for pagination. PR[450](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/450)
- Adds min date prop to field and max and min are valid props for type number and type date PR[#458](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/458) solves Issue[#459](https://git.express-scripts.com/ExpressScripts/cre8-web-components/issues/459)
- Add description for `Breadcrumb` component [#461] (https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/461)
- Add description for `Switch` component. PR: [#462] (https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/462)
- Add description for `Accordion Group` component. PR[#463](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/463)
- Update css border color to default token in `accordion-group`. PR: [#464] (https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/464)
- Update breakpoints of the components to use the correct ones from cre8-design-tokens. PR[#466](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/466)
- Fix disabled and hover states of the `Tertiary Button` component. PR [#469](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/469) solves issue [#407](https://git.express-scripts.com/ExpressScripts/cre8-web-components/issues/407).
- Replace --cre8-base-tokens to the correct one in `Button` component. PR[473](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/473)
- Set `role="listitem"` for  `cre8-list-item` and `cre8-primary-nav-item` to resolve accessibility issues (PR: [#467](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/467) , Issue: [#420](https://git.express-scripts.com/ExpressScripts/cre8-web-components/issues/420))
- Revert changes to Tab from PR: [441](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/441) which were causing component to hang (PR: [#477](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/477))
- Add event onTabChange in cre8 React `Tabs`. PR[#478](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/478) to solve the issue [#460](https://git.express-scripts.com/ExpressScripts/cre8-web-components/issues/460)
- Fix accessibility issues related to `cre8-field` and its use of `cre8-field-note`. PR: [#480](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/480)
- Update `@cre8/cre8-design-tokens` version from `1.4.0` to `1.5.0` [#481](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/481)

### Internal
- Add templates for filing Issues to the project to provide more context from issue contributers.
- Upgrade eslint-config to the version that supports lit and web component rules.
  - Remove related lit and web component rules from this project.
  - Remove related lit and web component dependencies from this project.
  - Fix errors related to new rules.
- Handled eslint rules for typescript that were previously set to off or warn:
  - @typescript-eslint/no-unused-vars
  - @typescript-eslint/no-non-null-assertions
  - @typescript-eslint/indent
  - @typescript-eslint/explicit-function-return-type
  - @typescript-eslint/explicit-module-boundary-types
  - @typescript-eslint/no-explicit-any PR [441](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/441)
- Code cleanup, remove old boilerplate code, and unused script commands [#447](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/447)
- Fix invalidationPath not invalidating some storybook files [#465](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/465)

### Updates
- Pagination component build in both cre8-WC and cre8-React [#379](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/379)
- DatePicker component build:
  - Date field only part of component with native calendar in cre8-WC and cre8-React: [#458](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/458)
  - Custom Calendar with base Functionality in cre8-wc and cre8-react: [#474](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/474)

- Documentation update on selected attribute use for select component documentation and update to unit tests. [PR#476](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/476)
- Divider component build in cre8-WC and cre8-React [#483](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/483)

## 0.3.0

Release date: 2024-03-14

### Breaking Changes
- cre8-icon web component renamed to cre8-icon-legacy in preperation for cre8-icons package integration [#394](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/394)
  - Storybook update and element rename cre8Icon to cre8IconLegacy [#402](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/402)

### Fixes
- Aligning with Design - removing fieldnote from `ProgressMeter`. PR [391](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/391)
- Address additional unnecessary spacing of `Card` body (PR: [#404](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/404), Issue: [#398](https://git.express-scripts.com/ExpressScripts/cre8-web-components/issues/398))
- Breadcrumbs documentation in cre8-React fixed to reflect proper usage. PR [414](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/414)
- Fixes `Accordion` header color styles (PR: [#439](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/439), Issue: [#427](https://git.express-scripts.com/ExpressScripts/cre8-web-components/issues/427))

### Internal
- Include AWS urls in the README for the project (PR: [#363](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/363))
- Fix storybook deployment AWS cloudfront invalidation.
- Enable errors for multiple eslint rules previously set to `off` or `warn`
  - Base `@cre8/eslint-config` related rules: PR: [#380](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/380)
  - Enabling `eslint-plugin-lit:recommended` rules minus a few rules specifically needed by our current code. PR: [#387] (https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/387)
  - Enabling `@typescript-eslint:recommended` rules minus a few rules specifically needed by our current code. PR: [#387] (https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/392)
- cre8-react now imports cre8-wc components based on cre8-wc's built folder structure. [#389](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/389)
- cre8-icon-legacy now uses [@cre8/cre8-icons package](https://git.express-scripts.com/ExpressScripts/cre8-icons) [#386](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/386)
- Fix google font loaded in both cre8-wc and cre8-react. [#406](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/406)
- Re-enable linting on tests and reduce all current errors related to linting test files to warnings [#395](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/395)
- Run `yarn cre8-wc:lint --fix --fix-type layout,suggestion` command to auto-fix multiple eslint issues for test files (PR: [#408](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/408))
- Enable eslint errors for lit-related rules:
  - 'lit/no-value-attribute' [#396](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/396)
  - 'lit/no-classfield-shadowing' [#396](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/396)
  - 'lit/no-useless-template-literals' [#396](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/396)
  - 'lit-a11y/click-events-have-key-events' [#401](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/401)
  - 'lit-a11y/anchor-is-valid' [#399](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/399)
  - 'lit-a11y/accessible-name' [#399](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/399)
  - 'no-unused-expressions' [#399](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/399)
- Handled eslint rules for typescript that were previously set to off or warn:
  - 'class-methods-use-this': typescript can extend a Class and override its methods without using this by redeclaring them so this has to stay off
  - 'no-shadow': only applies to js, ts equivalent is now turned off (see below)
  - '@typescript-eslint/no-shadow'
  - 'import/extensions': typescript has no issues and in most cases requires the js extension on an import from a package that wasn't built in typescript so this has to remain off for packages only
  - '@typescript-eslint/indent': formatting related rule
  - '@typescript-eslint/explicit-function-return-type': proper typing of function output helps maintain consistency in component behavior
  - '@typescript-eslint/explicit-module-boundary-types': 'off'
  - '@typescript-eslint/no-explicit-any'
- Changed .babelrc file into the babel.config.json format so that the build automatically picks up the configuration on build. [#411](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/411)
- Turn off eslint errors for 'lit-a11y/list' and 'lit-a11y/no-redundant-roles' as temporary solution to lists in cre8 [#401](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/401)


### Updates
- Fixing message position in Field [PR#385](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/385)
- cre8-react now installs cre8-wc as a `dependency` and not a `peerDependency`. [#389](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/389)
- Update `@cre8/cre8-design-tokens` version from `1.3.0` to `1.4.0` [#400](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/400)
- Allow `max` prop in the `Field` [PR#403](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/403)
- Added an index.ts file so that components could more easily be exported from cre8-wc if the consumer prefers [#411](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/411)

## 0.2.0

Release date: 2024-02-07

### Fixes

- Update `Tabs` so the function to change the active tab only triggers if a `Tab` button is clicked (Issue: [#303](https://git.express-scripts.com/ExpressScripts/cre8-web-components/issues/303), PR: [#353](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/353))
- Update `Button` to make aria-disabled property reflect proper Lit syntax. [Issue: [#377]](https://git.express-scripts.com/ExpressScripts/cre8-web-components/issues/377) PR: [#381](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/381)

### Updates

- Accessibility review edits
  - `Checkbox`: PR: [#370](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/370)
  - `Field`: PR [#375](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/375)
  - `Field Note`: PR: [#337](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/337)
  - `Tabs`: PR: [#353](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/353)
  - `Inline Alert`: PR: [#360](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/360)
  - `Heading`: PR: [#364](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/364)
  - `Radio`: PR: [#370](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/370)
  - `Switch`: PR: [#362](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/362)
  - `Radio Field Item`: PR: [#372](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/372)
- Remove unused props from Storybook of `CheckboxField` & `RadioField` [PR#: 354](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/354)
- Improve DX for Form Example pattern in StoryBook [PR#378](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/378)

### Internal

- Turned on linting in the build pipeline. PR [348](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/348)
- Remove deploys to AWS QA. PR [349](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/349)
- Component Level Accessibility Unit Tests (Using Jest-Axe):
  - `Card`: [PR: #335](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/335)
  - `Checkbox` [PR: #341](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/341)
  - `Field`: [PR: #351](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/351 )
  - `Field Note`: [PR: #357](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/357)
  - `Icon`: [PR: #350](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/350)
  - `Inline Alert`: [PR: #346](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/346)
  - `Link`: [PR: #342](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/342)
  - `Popover`: [PR: #358](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/358)
  - `Radio Field` [PR: #361](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/361)
  - `Skeleton Loader` [PR: #367](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/367)
  - `Text Passage`: [PR: #352](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/352)
  - `LoadingSpinner`: [PR: #356](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/356)
  - `Accordion`, `AccordionGroup`: [PR: #369](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/369)
  - `Tooltip`: [PR: #355](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/355)
  - `Select`: [PR: 366](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/366)
  - `Switch`: PR: [#362](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/362)
  - `Section`: PR: [#365](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/365)
  - `Tabs`: [PR: 376](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/376)

- Added a node configuration to package.json's exports so that consuming applications that need to unit test with commonjs can still import cre8-react. [PR: 368](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/368)


## 0.1.0

Release date: 2024-01-22

### Breaking Changes

> **Note!** The Breaking Changes listed for this release are based on the date this CHANGELOG was created, which was 11/17/2023

- Accordion was renamed to Accordion Group as this is in alignment to our Design System nomenclature. On the same note, what was previously called Accordion Panel is now called Accordion. This decision aligns with the actual ui anatomy of the component wherein the panel only represents the portion that expands into view. PR [#271](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/271)
- `dist/` was renamed to `lib/`, `dist/` now contains the storybook static build.  PR: [#312](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/312)

### Fixes
- Removed the font files for each brand and added appropriate imports of those files from the design token repo package. PR: [#263](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/263)
- `Accordion`
  - Aligned accordion component name with design. PR: [#271](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/271), Issue [#225](https://git.express-scripts.com/ExpressScripts/cre8-web-components/issues/255)
    - Added a property called `brandHeader` that changes accordion header from `content-default` to `brand-strong`.
    - Added support for changing the h tag variant in the header for better html structuring for keyboard navigation and screen readers.
  - Fixed an accessibility bug wherein `role="region"` can't have child nodes and there was one on accordion so those now have a role of listitem while the container accordion group has a role of list. PR [#317](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/317)
- `cre8Select`
  - Fix issue where cre8Select (React wrapper around Select) was not emitting `onChange`. PR: [#282](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/282)
  - Fixed type annotation of `items` property on `cre8Select`. PR: [#291](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/291)
    - Removed check for `optGroupLabel` in `cre8Select` options rendering code (now checking for `options`, instead)
- Storybook fixes.
  - Storybook v1 release alignment. PR [#277](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/277)
    - Added the version of both WC and React storybooks in the title and made it dynamic based on the `package.json` file found in the script directories.
    - Changed the story directories to better align with the v1 release. Also included a tag that indicates the version of storybook represented by the current iteration.
    - Removed some "Patterns" that didn't hold relevance to consuming teams and removed the "pages" directory.
  - Adjusted color contrast of Storybook FPO component [PR: #290](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/290)

### New
- Added `Link` Component. PR: [#266](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/266)
  - Updated `Link` Component to align with UX Design Review. PR: [#287](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/287)
  - CTA Link design changes to reflect primary button css feel to icon and CTA icon change to arrow from caret. PR: [#302](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/302)
- Composed Storybook with cre8 Design Tokens; you can now browse that Storybook from the cre8 component Storybooks PR: [#267](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/267)

### Updates
- Documentation improvements: PR [#260 ](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/260)
  - Use `MDX` file format for Guidelines related documentation instead of Stories
  - `CHANGELOG.md` file created for documenting project changes per release
  - Page regarding Design Tokens links to `@cre8/cre8-design-tokens` Storybook
  - Updated Code Guidelines regarding event handling, particularly around `composed`, `stopPropagation`, and lit-react's event mapping [PR: #288](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/288)
  - Add padding globally for each story in Storybook Docs. PR: [#311](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/311)
- Component level documentation and Storybook controls improvements:
  - `Badge`: PR [#261](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/261)
  - `Radio Field Item`: PR [#284](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/284)
  - `Field Note`: (PR: [#281](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/281))
  - `Inline Alert`: PR [#278](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/278)
  - `Checkbox Field Item`: PR [#286](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/286), [#293](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/293)
  - `Popover`:  PR [#292](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/292), [#323](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/323)
  - `Checkbox Field`: PR [#293](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/293)
  - `Radio Field`: PR [#295](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/295)
  - `Heading`: PR [#294](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/294)
  - `Field`: PR [#289](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/289)
  - `LoadingSpinner`:  PR [#306](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/306)
  - `Progress Meter` PR [#299](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/299)
  - `Tabs`: PR [#301](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/301)
  - `Tooltip`: PR [#315](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/315)
  - `Select`: PR [316](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/316)
  - `Skeleton Loader`: PR [#332](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/332)
- Component Updates
  - Updated `cre8-heading` and `cre8-text-passage` stories PR: [#262](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/262)
    - Updated their stories.ts file in cre8WC to use controls properly at the story level
  - `Accordion` A11y review edits. PR: [#317](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/317)
  - `Button` a11y review edits. PR: [#334](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/334)

### Internal
- Upgraded Storybook (@7.5.3 for @storybook/\*). PR: [#262](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/262)
  - Ran 'npx storybook@latest update' which ran an automigration for most of this effort
  - Reconfigured the main.js and babel.config.js for cre8-react to get it to render
  - Added .gitignore for all files located in the .nx cache directory if its used
- Added storybook addon `@whitespace/storybook-htmladdon` for rendering the resulting cre8 element with any selected controls correctly updated for rendering the component as shown in the canvas view. PR: [#300](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/300)
- Linting configuration and rules
  - Added @cre8/eslint-config and enabled linting rules in the repo. PR [#314](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/314).
  - Added linting command based off of the recommendations from [@open-wc](https://open-wc.org/guides/tools/linting-and-formatting/)
  - Temporary set several rules to 'warn' in eslintrc.js for both cre8 and cre8-react to get the linting command to work.
  - Ran linting `--fix` on the monorepo
- Adds accessibility jest testing capabilities [PR: #275](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/275)
- Component Level Accessibility Unit Tests (Using Jest-Axe):
  - `Badge`: PR [#275](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/275)
  - `Breadcrumbs`: PR [#328](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/328)
  - `Button`: PR [#329](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/329)
  - `Progress Meter`: PR [#331](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/331)
- Update version of `@cre8/cre8-design-tokens`  PR: [#263](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/263), [#327](https://git.express-scripts.com/ExpressScripts/ui-components/pull/327)
- We now deploy storybook to AWS PR: [#312](https://git.express-scripts.com/ExpressScripts/cre8-web-components/pull/312)
