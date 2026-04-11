import { createComponent } from '@lit/react';
import { Cre8LayoutContainer as Cre8LayoutContainerElement } from '@tmorrow/cre8-wc/lib/components/layout-container/layout-container';
import React from 'react';

export interface Cre8LayoutContainerProps {
  /** Full height variant 1) Sets the height to 100% */
  fullHeight?: boolean | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8LayoutContainer component
 */
export const Cre8LayoutContainer = createComponent({
  react: React,
  tagName: 'cre8-layout-container',
  elementClass: Cre8LayoutContainerElement,

});

export default Cre8LayoutContainer;
