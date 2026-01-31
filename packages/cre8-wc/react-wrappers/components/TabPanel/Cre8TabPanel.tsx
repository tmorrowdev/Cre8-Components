import { createComponent } from '@lit/react';
import { Cre8TabPanel as Cre8TabPanelElement } from '@tmorrow/cre8-wc/lib/components/tab-panel/tab-panel';
import React from 'react';

export interface Cre8TabPanelProps {
  /** This will remove focus on panel element */
  skipFocusOnPanel?: boolean | undefined;
  /** Indicates if the panel is active <br/><br/> _*This property is dynamically set_ */
  isActive?: boolean | undefined;
  /** Used to align the tab panel with the tab <br/><br/> _*This property is dynamically set_ */
  index?: number | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8TabPanel component
 */
export const Cre8TabPanel = createComponent({
  react: React,
  tagName: 'cre8-tab-panel',
  elementClass: Cre8TabPanelElement,

});

export default Cre8TabPanel;
