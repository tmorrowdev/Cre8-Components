import { createComponent } from '@lit/react';
import { Cre8Tabs as Cre8TabsElement } from '@tmorrow/cre8-wc/lib/components/tabs/tabs';
import type { Cre8TabItemData } from '@tmorrow/cre8-wc/lib/components/tabs/tabs';
import React from 'react';
export type { Cre8TabItemData } from '@tmorrow/cre8-wc/lib/components/tabs/tabs';

export interface Cre8TabsProps {
  /** Tab sizes - **default** displays the cre8-tab text with cre8-typography-label-default - **sm** displays the cre8-tab text with cre8-typography-label-small */
  size?: "sm";
  /** Displays a set of tabs with a spanning the width of the element */
  fullWidth?: boolean | undefined;
  /** Sets the initial active tab (e.g. 0 sets the first tab, 1 sets the second tab, etc.) */
  activeIndex?: number | undefined;
  /** If position from left is greater than 0, set isStart to false. Otherwise set isStart to true.  _*This property is dynamically set_ */
  isStart?: boolean | undefined;
  /** If last child is fully in the viewport, set isEnd to true. Otherwise, set isEnd to false.  _*This property is dynamically set_ */
  isEnd?: boolean | undefined;
  /** Tabs for a data-driven tab set. Each entry becomes a `cre8-tab` in the default slot *and* a `cre8-tab-panel` in the `panel` slot, with matching indices — two slots kept in step, which is the part that goes wrong when these are written by hand. */
  items?: Cre8TabItemData[];
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
    onTabChange: 'tab-change'
  }
});

export default Cre8Tabs;
