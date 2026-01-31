import { createComponent } from '@lit/react';
import { Cre8GridItem as Cre8GridItemElement } from '@tmorrow/cre8-wc/lib/components/grid-item/grid-item';
import React from 'react';

export interface Cre8GridItemProps {
  children?: React.ReactNode;
}

/**
 * Cre8GridItem component
 */
export const Cre8GridItem = createComponent({
  react: React,
  tagName: 'cre8-grid-item',
  elementClass: Cre8GridItemElement,

});

export default Cre8GridItem;
