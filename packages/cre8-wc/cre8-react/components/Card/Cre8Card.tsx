import { createComponent } from '@lit/react';
import { Cre8Card as Cre8CardElement } from '@tmorrow/cre8-wc/lib/components/card/card';
import React from 'react';

export interface Cre8CardProps {
  /** Style variants - **bare** renders a card without a border and without padding around the content - **horizontal** renders a card with header, body, footer oriented in a row rather than a column - **horizontal-bare** renders a card with header, body, footer oriented in a row rather than a column   without a border and without padding around the content */
  variant?: any;
  /** Alignment variant - **center** renders a card that has center aligned content/text */
  align?: any;
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
