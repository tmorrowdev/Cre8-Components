import { createComponent } from '@lit/react';
import { Cre8LayoutSection as Cre8LayoutSectionElement } from '@tmorrow/cre8-wc/lib/components/layout-section/layout-section';
import React from 'react';

export interface Cre8LayoutSectionProps {
  /** Behavioral variants - **sticky** allows the layout section to stick to the screen until the   section reaches the bottom of the layout or the next layout section. */
  behavior?: any;
  /** Top style 1) Used to create dynamic sticky containers that can be adjusted based on the content */
  top?: string | undefined;
  /** Full height 1) Stretches the section to fill the height of its row in `cre8-layout`'s   grid. Off by default - only turn this on when the sections in a row   should line up edge to edge regardless of how much content each one   has. */
  fullHeight?: boolean | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8LayoutSection component
 */
export const Cre8LayoutSection = createComponent({
  react: React,
  tagName: 'cre8-layout-section',
  elementClass: Cre8LayoutSectionElement,

});

export default Cre8LayoutSection;
