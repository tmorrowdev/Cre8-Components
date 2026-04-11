import { createComponent } from '@lit/react';
import { Cre8PrimaryNav as Cre8PrimaryNavElement } from '@tmorrow/cre8-wc/lib/components/primary-nav/primary-nav';
import React from 'react';

export interface Cre8PrimaryNavProps {
  /** Inverted variant 1) Used for dark backgrounds */
  inverted?: boolean | undefined;
  /** Behavior variant <cre8-text-passage size="sm"> <ul> <li>**side-by-side** keeps the primary nav item always in a horizontal pattern</li> </ul> </cre8-text-passage> */
  behavior?: any;
  /** aria-label attribute to designate at name for the nav. Can be override by user */
  navAriaLabel?: string;
  children?: React.ReactNode;
}

/**
 * Cre8PrimaryNav component
 */
export const Cre8PrimaryNav = createComponent({
  react: React,
  tagName: 'cre8-primary-nav',
  elementClass: Cre8PrimaryNavElement,

});

export default Cre8PrimaryNav;
