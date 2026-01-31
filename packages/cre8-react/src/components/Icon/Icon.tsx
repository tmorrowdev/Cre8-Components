import { createComponent } from '@lit/react';
import { Cre8Icon as Cre8IconElement } from '@tmorrow/cre8-wc/lib/components/icon/icon';
import React from 'react';

/**
 *
 * <cre8-icon> is a web component, which can be used with any frontend framework and use any svg.
 * It takes raw svgs as props and renders them.
 *
 * ##Usability Considerations
 * - If the icon is decorative: set `aria-hidden` to true.
 * - If the icon is interactive (not decorative): set `aria-hidden` to false and add the `aria-label`
 * - If the icon is key to functionality from a screen reader perspective, it is required to add `aria-label`
 * which will describe the icon.
 * For example, if the icon is a close button, setting `aria-label="Close"`will give
 * the SVG an aria-label to make it sufficiently accessible.
 */

export const Cre8Icon = createComponent({
    react: React,
    tagName: 'cre8-icon',
    elementClass: Cre8IconElement,
});

// Legacy alias for backwards compatibility
export const Cre8IconLegacy = Cre8Icon;
