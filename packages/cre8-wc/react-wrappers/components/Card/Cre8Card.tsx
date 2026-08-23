import { createComponent } from '@lit/react';
import { Cre8Card as Cre8CardElement } from '@tmorrow/cre8-wc/lib/components/card/card';
import React from 'react';

export interface Cre8CardProps {
  /** Style variants - **bare** renders a card without a border and without padding around the content - **horizontal** renders a card with header, body, footer oriented in a row rather than a column - **horizontal-bare** renders a card with header, body, footer oriented in a row rather than a column   without a border and without padding around the content */
  variant?: any;
  /** Alignment variant - **center** renders a card that has center aligned content/text */
  align?: any;
  /** Full height 1) Stretches the card to fill its parent's height and width. Off by   default - only turn this on when the card is a flex/grid item whose   siblings should determine its height, e.g. a row of cards that should   line up edge to edge regardless of how much content each one has. */
  fullHeight?: boolean | undefined;
  children?: React.ReactNode;
}

/**
 * The card component acts a general container element sectioned off by slots: `header`, `body`, `footer`.
 */
export const Cre8Card = createComponent({
  react: React,
  tagName: 'cre8-card',
  elementClass: Cre8CardElement,

});

export default Cre8Card;
