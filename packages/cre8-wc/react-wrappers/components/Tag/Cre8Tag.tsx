import { createComponent } from '@lit/react';
import { Cre8Tag as Cre8TagElement } from '@tmorrow/cre8-wc/lib/components/tag/tag';
import React from 'react';

export interface Cre8TagProps {
  /** The text label displayed inside the tag. */
  text?: string;
  /** Type of tag **checkbox** renders a checkbox tag **radio** renders a radio tag */
  type?: any;
  /** Color variant **neutral** renders the default, unselected tag **branded** renders a selected tag **neutral-hybrid** renders a tag when mouse is hovering tag */
  variant?: any;
  /** shape of the tag, supports square and round, and default not mentioned its a square */
  shape?: any;
  isDisabled?: boolean | undefined;
  isSelected?: boolean | undefined;
  /** The fieldId attribute is assigned to the HTML input element of the radio button and the for attribute of the corresponding label. */
  fieldId?: string | undefined;
  onChange?: (event: CustomEvent) => void;
}

/**
 * The tag component allows you to make selections, filter content, or trigger actions. While buttons are
 */
export const Cre8Tag = createComponent({
  react: React,
  tagName: 'cre8-tag',
  elementClass: Cre8TagElement,
  events: {
    onChange: 'change'
  }
});

export default Cre8Tag;
