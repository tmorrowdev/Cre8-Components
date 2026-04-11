import { createComponent } from '@lit/react';
import { Cre8TertiaryNav as Cre8TertiaryNavElement } from '@tmorrow/cre8-wc/lib/components/tertiary-nav/tertiary-nav';
import React from 'react';

export interface Cre8TertiaryNavProps {
  /** Allows the tertiary nav to take up the full width of it parent container */
  fullWidth?: boolean | undefined;
  /** aria-label attribute to designate at name for the nav. Can be override by user */
  navAriaLabel?: string;
  children?: React.ReactNode;
}

/**
 * Cre8TertiaryNav component
 */
export const Cre8TertiaryNav = createComponent({
  react: React,
  tagName: 'cre8-tertiary-nav',
  elementClass: Cre8TertiaryNavElement,

});

export default Cre8TertiaryNav;
