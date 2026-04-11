import { createComponent } from '@lit/react';
import { Cre8AccordionItem as Cre8AccordionItemElement } from '@tmorrow/cre8-wc/lib/components/accordion-item/accordion-item';
import React from 'react';

export interface Cre8AccordionItemProps {
  /** When true, the Accordion Item is opens, when false it closes; */
  isActive?: boolean;
  /** Optional custom id for the accordion item, if one is not set, a random id is generated for you. */
  accordionItemId?: string | undefined;
  /** Controls the positioning of the dropdown icon in relation to the text, true puts the icon before the text and false/undefined default the icon to the opposite side of the accordion item */
  iconBefore?: boolean | undefined;
  /** Controls the appearance  of dropdown icon as being an icon-only button. true renders the tertiary variant and false/undefined renders the default secondary appearance. */
  tertiaryIcon?: boolean | undefined;
  /** Users can choose between two header sizes:  'sm' [title-default] or 'lg' [title-large]. */
  size?: any;
  /** Purely meant to help the user structure the HTML page hierarchy. Does not change the header size. Defaults to 'h3' */
  headingTagVariant?: any;
  /** Controls the text content of the Accordion Item heading. */
  heading?: string;
  /** Controls whether the header takes on the theme's 'brand-strong' color */
  brandHeader?: boolean | undefined;
  /** The aria attribute to which is assigned the id of the details section which is revealed via interaction with the header. */
  ariaControls?: string;
  children?: React.ReactNode;
}

/**
 * The accordion item component delivers large amounts of content in a small space
 */
export const Cre8AccordionItem = createComponent({
  react: React,
  tagName: 'cre8-accordion-item',
  elementClass: Cre8AccordionItemElement,

});

export default Cre8AccordionItem;
