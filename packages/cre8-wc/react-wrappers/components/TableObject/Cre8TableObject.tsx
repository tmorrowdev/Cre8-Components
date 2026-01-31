import { createComponent } from '@lit/react';
import { Cre8TableObject as Cre8TableObjectElement } from '@tmorrow/cre8-wc/lib/components/table-object/table-object';
import React from 'react';

export interface Cre8TableObjectProps {
  children?: React.ReactNode;
}

/**
 * Cre8TableObject component
 */
export const Cre8TableObject = createComponent({
  react: React,
  tagName: 'cre8-table-object',
  elementClass: Cre8TableObjectElement,

});

export default Cre8TableObject;
