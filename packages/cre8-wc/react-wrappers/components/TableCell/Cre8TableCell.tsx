import { createComponent } from '@lit/react';
import { Cre8TableCell as Cre8TableCellElement } from '@tmorrow/cre8-wc/lib/components/table-cell/table-cell';
import React from 'react';

export interface Cre8TableCellProps {
  /** Colspan attribute on td */
  colspan?: number | undefined;
  /** Style variants <cre8-text-passage size="sm"> <ul> <li>**bare** renders a table cell without a border</li> </ul> </cre8-text-passage> */
  variant?: any;
  /** Column header text for cell to display when table is using responsive variant */
  dataHeader?: string | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8TableCell component
 */
export const Cre8TableCell = createComponent({
  react: React,
  tagName: 'cre8-table-cell',
  elementClass: Cre8TableCellElement,

});

export default Cre8TableCell;
