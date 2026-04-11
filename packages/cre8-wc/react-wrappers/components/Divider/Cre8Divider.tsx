import { createComponent } from '@lit/react';
import { Cre8Divider as Cre8DividerElement } from '@tmorrow/cre8-wc/lib/components/divider/divider';
import React from 'react';

export interface Cre8DividerProps {
  /** Divider variants - By default, the component renders the horizontal divider - **vertical** renders the vertical divider */
  variant?: any;
  /** Status (a color variant prop) - By default, the divider has gray color. - **brand**, the divider has blue color. - **knockout**, the divider has white color. */
  status?: string | undefined;
}

/**
 * The divider component is a separator between sections of content or groups of items.
 */
export const Cre8Divider = createComponent({
  react: React,
  tagName: 'cre8-divider',
  elementClass: Cre8DividerElement,

});

export default Cre8Divider;
