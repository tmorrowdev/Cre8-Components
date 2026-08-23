import { createComponent } from '@lit/react';
import { Cre8GridItem as Cre8GridItemElement } from '@tmorrow/cre8-wc/lib/components/grid-item/grid-item';
import React from 'react';

export interface Cre8GridItemProps {
  /** Full height 1) Stretches the item to fill the height of its row. Off by default -   only turn this on when the items in a row should line up edge to   edge regardless of how much content each one has. */
  fullHeight?: boolean | undefined;
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
