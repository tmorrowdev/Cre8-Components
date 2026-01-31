import { createComponent } from '@lit/react';
import { Cre8UtilityNavItem as Cre8UtilityNavItemElement } from '@tmorrow/cre8-wc/lib/components/utility-nav-item/utility-nav-item';
import React from 'react';

export interface Cre8UtilityNavItemProps {
  /** Hide text toggle 1) Visually hides the text so screenreaders can still read for accessibility when set to true. */
  hideText?: boolean | undefined;
  /** URL of the utility nav item */
  href?: string | undefined;
  /** Icon name */
  iconName?: string | undefined;
  /** Icon position <cre8-text-passage size="sm"> <ul> <li>**before** places the icon before the text</li> <li>**after** places the icon after the text</li> </ul> </cre8-text-passage> */
  iconPosition?: "before" | "after" | undefined;
  /** Text of the utility nav item */
  text?: string | undefined;
}

/**
 * Cre8UtilityNavItem component
 */
export const Cre8UtilityNavItem = createComponent({
  react: React,
  tagName: 'cre8-utility-nav-item',
  elementClass: Cre8UtilityNavItemElement,

});

export default Cre8UtilityNavItem;
