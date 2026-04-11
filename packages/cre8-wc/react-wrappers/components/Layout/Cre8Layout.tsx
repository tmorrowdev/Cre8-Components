import { createComponent } from '@lit/react';
import { Cre8Layout as Cre8LayoutElement } from '@tmorrow/cre8-wc/lib/components/layout/layout';
import React from 'react';

export interface Cre8LayoutProps {
  /** Style variants <cre8-text-passage size="sm"> <ul> <li>Default is a right sidebar</li> <li>**left-sidebar** formats the first `layout-section` component as a left sidebar</li> </ul> </cre8-text-passage> */
  variant?: any;
  children?: React.ReactNode;
}

/**
 * Cre8Layout component
 */
export const Cre8Layout = createComponent({
  react: React,
  tagName: 'cre8-layout',
  elementClass: Cre8LayoutElement,

});

export default Cre8Layout;
