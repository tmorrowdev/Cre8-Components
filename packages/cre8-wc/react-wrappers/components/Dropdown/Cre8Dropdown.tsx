import { createComponent } from '@lit/react';
import { Cre8Dropdown as Cre8DropdownElement } from '@tmorrow/cre8-wc/lib/components/dropdown/dropdown';
import type { Cre8DropdownItemData } from '@tmorrow/cre8-wc/lib/components/dropdown/dropdown';
import React from 'react';
export type { Cre8DropdownItemData } from '@tmorrow/cre8-wc/lib/components/dropdown/dropdown';

export interface Cre8DropdownProps {
  /** Dropdown header */
  buttonText?: string;
  /** Enables scrolling once content reached to specified height, the height should mention in px units, ex: 100px */
  maxHeight?: string | undefined;
  /** button text represents as a link */
  dropdownWithLink?: boolean;
  /** Items for a data-driven dropdown. Set this and the dropdown builds its own `cre8-dropdown-item` children in the light DOM. */
  items?: Cre8DropdownItemData[];
  children?: React.ReactNode;
}

/**
 * The Dropdown menu itself is a container that can host multiple interactive items, commonly formatted as a list
 */
export const Cre8Dropdown = createComponent({
  react: React,
  tagName: 'cre8-dropdown',
  elementClass: Cre8DropdownElement,

});

export default Cre8Dropdown;
