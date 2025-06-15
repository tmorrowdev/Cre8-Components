import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8AccordionItem as Cre8AccordionItemElement } from '@cre8_dev/cre8-wc/lib/components/accordion-item/accordion-item';

/**
 *
 * The accordion item component delivers large amounts of content in a small space
 * through progressive disclosure. That is, the user gets key details about the
 * underlying content and can choose to expand that content within the constraints
 * of the accordion item. Accordion Items work especially well on mobile interfaces or
 * whenever vertical space is at a premium.
 *
 * ## HOW TO USE
 * Avoid “nested” accordion items—that is, collapsible content within collapsible
 * content. This type of pattern goes against UX best practices.
 *
 * The Cre8 accordion item header allows for two sizes:
 * 'sm' [Cre8-typography-title-default] or 'lg' [Cre8-typography-title-large]
 *
 * A chevron is used to indicate the “expand/collapse” action, though the entire
 * header area is clickable for the same action.
 *
 * **NOTE**: The header of the accordion item uses h tags so be sure to choose the headingTagVariant that
 * fits into the hierarchy of your html page layout. THIS WILL NOT CHANGE THE APPEARANCE OF THE HEADER.
 *
 *
 */

export const Cre8AccordionItem = createComponent({
    react: React,
    tagName: 'cre8-accordion-item',
    elementClass: Cre8AccordionItemElement,
});
