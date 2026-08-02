import { createComponent } from '@lit/react';
import { Cre8Accordion as Cre8AccordionElement } from '@tmorrow/cre8-wc/lib/components/accordion/accordion';
import type { Cre8AccordionItemData } from '@tmorrow/cre8-wc/lib/components/accordion/accordion';
import React from 'react';
export type { Cre8AccordionItemData } from '@tmorrow/cre8-wc/lib/components/accordion/accordion';

export interface Cre8AccordionProps {
  /** borderType */
  borderType?: any;
  /** When it is true, the inner dividers are displayed; if it is false, the inner dividers are not displayed */
  hasDivider?: boolean;
  /** Panels for a data-driven accordion. Each becomes a `cre8-accordion-item` with its heading as a prop and its content in the default slot. */
  items?: Cre8AccordionItemData[];
  children?: React.ReactNode;
}

/**
 * The component is a vertically stacked list of headers that reveal or hide sections of related content on a page.
 */
export const Cre8Accordion = createComponent({
  react: React,
  tagName: 'cre8-accordion',
  elementClass: Cre8AccordionElement,

});

export default Cre8Accordion;
