import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8Accordion as cre8AccordionElement } from '@cre8/cre8-wc/lib/components/accordion/accordion';

/**
 * The component is a vertically stacked list of headers that reveal or hide sections of related content on a page.
 * The header title gives the user a high level overview of the content allowing the user to decide
 * which sections to expand for the information.
 *
 * Accordion contains Accordion Items as children. This component is the wrapper for grouping related accordion items.
 *
 * Users can select different border types: default (no border), rectangle, rounded bottom, and rounded.
 *
 */

export const cre8Accordion = createComponent({
    react: React,
    tagName: 'cre8-accordion',
    elementClass: cre8AccordionElement,
});
