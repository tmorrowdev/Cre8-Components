import { createComponent } from '@lit/react';
import { Cre8Submenu as Cre8SubmenuElement } from '@tmorrow/cre8-wc/lib/components/submenu/submenu';
import React from 'react';

export interface Cre8SubmenuProps {
  children?: React.ReactNode;
}

/**
 * Cre8Submenu component
 */
export const Cre8Submenu = createComponent({
  react: React,
  tagName: 'cre8-submenu',
  elementClass: Cre8SubmenuElement,

});

export default Cre8Submenu;
