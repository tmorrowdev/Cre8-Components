import { createComponent } from '@lit/react';
import { Cre8Heading as Cre8HeadingElement } from '@cre8_dev/cre8-wc/lib/components/heading/heading';
import React from 'react';

/**
 *  HTML headings are titles or subtitles that you want to display on a webpage. The H1 is the most important and H6
 *  is the least important in the content hierarchy.
 *
 * # How to Use
 * 1. The Cre8-heading tag wraps around one of the six native HTML "h" tags, depending on your chosen variation.
 * 2. There are two main use cases for using this component: text passage headings and Components with a title (i.e. modal, card or alert)
 * 3. There will be instances when the design requires the heading text to have the brand color applied in which case you should set
 *    the [brandColor](?path=/story/Cre8-components-heading--brand-color) attribute to true on the Cre8-heading tag.
 * 4. For dark backgrounds, add the [inverted](?path=/story/Cre8-components-heading--inverted) attribute to the tag for white text.
 *
 *
 * @slot - The heading text content
 */

export const Cre8Heading = createComponent({
    react: React,
    tagName: 'cre8-heading',
    elementClass: Cre8HeadingElement,
});
