import { createComponent } from '@lit/react';
import { Cre8Tab as Cre8TabElement } from '@tmorrow/cre8-wc/lib/components/tab/tab';
import React from 'react';

export interface Cre8TabProps {
  /** Tab sizes - **default** displays the tab text with cre8-typography-label-default - **sm** displays the tab text with cre8-typography-label-small and decrease padding  _*This property is dynamically set_ */
  size?: any;
  /** If is true, tab has active state and cooresponding tab panel is visible.  _*This property is dynamically set_ */
  isActive?: boolean | undefined;
  /** Used to align the tab with the tab panel  _*This property is dynamically set_ */
  index?: number | undefined;
  /** Used to connect tab trigger and tab panel for accessibility  _*This property is dynamically set_ */
  ariaLabelledBy?: string | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8Tab component
 */
export const Cre8Tab = createComponent({
  react: React,
  tagName: 'cre8-tab',
  elementClass: Cre8TabElement,

});

export default Cre8Tab;
