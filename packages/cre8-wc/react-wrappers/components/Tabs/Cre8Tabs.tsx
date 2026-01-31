import { createComponent } from '@lit/react';
import { Cre8Tabs as Cre8TabsElement } from '@tmorrow/cre8-wc/lib/components/tabs/tabs';
import React from 'react';

export interface Cre8TabsProps {
  /** Tab sizes - **default** displays the cre8-tab text with cre8-typography-label-default - **sm** displays the cre8-tab text with cre8-typography-label-small */
  size?: "sm";
  /** Displays a set of tabs with a spanning the width of the element */
  fullWidth?: boolean;
  /** Sets the initial active tab (e.g. 0 sets the first tab, 1 sets the second tab, etc.) */
  activeIndex?: number;
  /** If position from left is greater than 0, set isStart to false. Otherwise set isStart to true.  _*This property is dynamically set_ */
  isStart?: boolean;
  /** If last child is fully in the viewport, set isEnd to true. Otherwise, set isEnd to false.  _*This property is dynamically set_ */
  isEnd?: boolean;
  children?: React.ReactNode;
  onTabChange?: (event: CustomEvent) => void;
}

/**
 * Tabs are used to quickly navigate back and forth between views.
 */
export const Cre8Tabs = createComponent({
  react: React,
  tagName: 'cre8-tabs',
  elementClass: Cre8TabsElement,
  events: {
    onTabChange: 'tabChange'
  }
});

export default Cre8Tabs;
