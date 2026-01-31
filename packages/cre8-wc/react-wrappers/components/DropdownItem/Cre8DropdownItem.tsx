import { createComponent } from '@lit/react';
import { Cre8DropdownItem as Cre8DropdownItemElement } from '@tmorrow/cre8-wc/lib/components/dropdown-item/dropdown-item';
import React from 'react';

export interface Cre8DropdownItemProps {
  ariaLabel?: string;
  onDropdownItemSelected?: (event: CustomEvent) => void;
}

/**
 * The Dropdown item component is designed to be used with Dropdown component, each item represents a
 */
export const Cre8DropdownItem = createComponent({
  react: React,
  tagName: 'cre8-dropdown-item',
  elementClass: Cre8DropdownItemElement,
  events: {
    onDropdownItemSelected: 'dropdown-item-selected'
  }
});

export default Cre8DropdownItem;
