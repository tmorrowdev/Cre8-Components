import { createComponent } from '@lit/react';
import { Cre8TableBody as Cre8TableBodyElement } from '@tmorrow/cre8-wc/lib/components/table-body/table-body';
import React from 'react';

export interface Cre8TableBodyProps {
  children?: React.ReactNode;
}

/**
 * Cre8TableBody component
 */
export const Cre8TableBody = createComponent({
  react: React,
  tagName: 'cre8-table-body',
  elementClass: Cre8TableBodyElement,

});

export default Cre8TableBody;
