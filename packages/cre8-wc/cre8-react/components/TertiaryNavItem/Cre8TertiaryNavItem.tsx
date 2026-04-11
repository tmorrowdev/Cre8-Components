import { createComponent } from '@lit/react';
import { Cre8TertiaryNavItem as Cre8TertiaryNavItemElement } from '@tmorrow/cre8-wc/lib/components/tertiary-nav-item/tertiary-nav-item';
import React from 'react';

export interface Cre8TertiaryNavItemProps {
  /** The href value of the tertiary nav link */
  href?: string | undefined;
  /** The current state of the tertiary nav link */
  isCurrent?: boolean | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8TertiaryNavItem component
 */
export const Cre8TertiaryNavItem = createComponent({
  react: React,
  tagName: 'cre8-tertiary-nav-item',
  elementClass: Cre8TertiaryNavItemElement,

});

export default Cre8TertiaryNavItem;
