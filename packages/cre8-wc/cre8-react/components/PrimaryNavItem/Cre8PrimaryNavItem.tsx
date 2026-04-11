import { createComponent } from '@lit/react';
import { Cre8PrimaryNavItem as Cre8PrimaryNavItemElement } from '@tmorrow/cre8-wc/lib/components/primary-nav-item/primary-nav-item';
import React from 'react';

export interface Cre8PrimaryNavItemProps {
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
 * Cre8PrimaryNavItem component
 */
export const Cre8PrimaryNavItem = createComponent({
  react: React,
  tagName: 'cre8-primary-nav-item',
  elementClass: Cre8PrimaryNavItemElement,

});

export default Cre8PrimaryNavItem;
