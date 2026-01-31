import { createComponent } from '@lit/react';
import { Cre8TableHeader as Cre8TableHeaderElement } from '@tmorrow/cre8-wc/lib/components/table-header/table-header';
import React from 'react';

export interface Cre8TableHeaderProps {
  children?: React.ReactNode;
}

/**
 * Cre8TableHeader component
 */
export const Cre8TableHeader = createComponent({
  react: React,
  tagName: 'cre8-table-header',
  elementClass: Cre8TableHeaderElement,

});

export default Cre8TableHeader;
