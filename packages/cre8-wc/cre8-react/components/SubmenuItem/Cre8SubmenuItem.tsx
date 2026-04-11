import { createComponent } from '@lit/react';
import { Cre8SubmenuItem as Cre8SubmenuItemElement } from '@tmorrow/cre8-wc/lib/components/submenu-item/submenu-item';
import React from 'react';

export interface Cre8SubmenuItemProps {
  /** The link URL */
  href?: string | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8SubmenuItem component
 */
export const Cre8SubmenuItem = createComponent({
  react: React,
  tagName: 'cre8-submenu-item',
  elementClass: Cre8SubmenuItemElement,

});

export default Cre8SubmenuItem;
