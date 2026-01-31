import { createComponent } from '@lit/react';
import { Cre8Main as Cre8MainElement } from '@tmorrow/cre8-wc/lib/components/main/main';
import React from 'react';

export interface Cre8MainProps {
  /** Full height variant 1) Sets the height to 100% */
  fullHeight?: boolean | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8Main component
 */
export const Cre8Main = createComponent({
  react: React,
  tagName: 'cre8-main',
  elementClass: Cre8MainElement,

});

export default Cre8Main;
