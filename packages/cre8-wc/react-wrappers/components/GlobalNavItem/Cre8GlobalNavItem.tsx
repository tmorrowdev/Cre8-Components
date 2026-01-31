import { createComponent } from '@lit/react';
import { Cre8GlobalNavItem as Cre8GlobalNavItemElement } from '@tmorrow/cre8-wc/lib/components/global-nav-item/global-nav-item';
import React from 'react';

export interface Cre8GlobalNavItemProps {
  /** Primary nav item text */
  text?: string;
  /** Primary nav item href */
  href?: string;
  /** Icon name */
  iconName?: string | undefined;
  /** Append to the class name. Used for passing in utility classes */
  megaMenu?: boolean | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8GlobalNavItem component
 */
export const Cre8GlobalNavItem = createComponent({
  react: React,
  tagName: 'cre8-global-nav-item',
  elementClass: Cre8GlobalNavItemElement,

});

export default Cre8GlobalNavItem;
