import { createComponent } from '@lit/react';
import { Cre8UtilityNav as Cre8UtilityNavElement } from '@tmorrow/cre8-wc/lib/components/utility-nav/utility-nav';
import React from 'react';

export interface Cre8UtilityNavProps {
  /** Inverted variant 1) Used for dark backgrounds */
  inverted?: boolean | undefined;
  /** aria-label attribute to designate at name for the nav. Can be override by user */
  navAriaLabel?: string;
  children?: React.ReactNode;
}

/**
 * Cre8UtilityNav component
 */
export const Cre8UtilityNav = createComponent({
  react: React,
  tagName: 'cre8-utility-nav',
  elementClass: Cre8UtilityNavElement,

});

export default Cre8UtilityNav;
