import { createComponent } from '@lit/react';
import { Cre8GlobalNav as Cre8GlobalNavElement } from '@tmorrow/cre8-wc/lib/components/global-nav/global-nav';
import React from 'react';

export interface Cre8GlobalNavProps {
  /** Inverted variant 1) Used for dark backgrounds */
  inverted?: boolean | undefined;
  /** Behavior variant <cre8-text-passage size="sm"> <ul> <li>**side-by-side** keeps the primary nav item always in a horizontal pattern</li> </ul> </cre8-text-passage> */
  behavior?: "side-by-side" | undefined;
  /** aria-label attribute to designate at name for the nav. Can be override by user */
  navAriaLabel?: string;
  children?: React.ReactNode;
}

/**
 * Cre8GlobalNav component
 */
export const Cre8GlobalNav = createComponent({
  react: React,
  tagName: 'cre8-global-nav',
  elementClass: Cre8GlobalNavElement,

});

export default Cre8GlobalNav;
