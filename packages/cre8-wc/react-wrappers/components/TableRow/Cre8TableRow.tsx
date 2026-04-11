import { createComponent } from '@lit/react';
import { Cre8TableRow as Cre8TableRowElement } from '@tmorrow/cre8-wc/lib/components/table-row/table-row';
import React from 'react';

export interface Cre8TableRowProps {
  /** Visually show additional expandable content */
  isExpanded?: boolean | undefined;
  /** Indicates row has additional visually hidden related content */
  isExpandable?: boolean | undefined;
  /** Style variants <cre8-text-passage size="sm"> <ul> <li>**bare** renders a table row without a border</li> </ul> </cre8-text-passage> */
  variant?: any;
  /** Expanded button text */
  expandedButtonText?: string;
  /** Expand button text */
  collapsedButtonText?: string;
  children?: React.ReactNode;
}

/**
 * Cre8TableRow component
 */
export const Cre8TableRow = createComponent({
  react: React,
  tagName: 'cre8-table-row',
  elementClass: Cre8TableRowElement,

});

export default Cre8TableRow;
