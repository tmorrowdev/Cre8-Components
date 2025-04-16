import { createComponent } from '@lit/react';
import { Cre8IconLegacy as Cre8IconLegacyElement } from '@cre8_dev/cre8-wc/lib/components/icon/icon';
import React from 'react';

/**
 *
 * <Cre8-icon> is a web component, which can be used with any frontend framework and use any svg.
 * It takes raw svgs as props and renders them.
 *
 * **'Cre8-icon-legacy'** will be **deprecated** in Web Components v0.5.0
 *
 * - [List of new figma icons](https://www.figma.com/file/j1a0rBkoH65XiGKfq7ppWa/Iconography?type=design&node-id=2037-5773&mode=design&t=6ZzC6KH3Gkxf3fj5-4)
 * - The new `Cre8-icon` from the Cre8-icon package: https://static-dev.esi-memberweb-dev.aws.evernorthcloud.com/Cre8-icons/.
 *
 * ##Usability Considerations
 * - If the icon is decorative: set `aria-hidden` to true.
 * - If the icon is interactive (not decorative): set `aria-hidden` to false and add the `aria-label`
 * - If the icon is key to functionality from a screen reader perspective, it is required to add `aria-label`
 * which will describe the icon.
 * For example, if the icon is a close button, setting `aria-label="Close"`will give
 * the SVG an aria-label to make it sufficiently accessible.
 *
 * [More information on Accessibility with Cre8-icons](https://static-dev.esi-memberweb-dev.aws.evernorthcloud.com/Cre8-icons/?path=/story/getting-started-accessibility--page)
 *
 * ##How to use
 * Cre8 Web Components (Cre8-wc) includes the `@Cre8/Cre8-icons` package.
 * If you need to install a newer version than what's included, please see
 * the [installation instructions for Cre8-icons](https://git.express-scripts.com/ExpressScripts/Cre8-icons#installation).
 * - Import the component (this is the icon container): `import '@Cre8/Cre8-icons';`
 * - Import an svg as a string: `import svgInfo from '!!raw-loader!@Cre8/Cre8-icons/lib/icons/System/Regular/Info.svg';`
 *
 * Your import paths may be different depending on your project's build configuration.
 * Please see [Importing Icons](https://static-dev.esi-memberweb-dev.aws.evernorthcloud.com/Cre8-icons/?path=/story/icon-sets-importing-icons--page)
 * of the `@Cre8/Cre8-icons` documentation for more information.
 */

export const Cre8IconLegacy = createComponent({
    react: React,
    tagName: 'Cre8-icon-legacy',
    elementClass: Cre8IconLegacyElement,
});
