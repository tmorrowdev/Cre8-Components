import { createComponent } from '@lit/react';
import { Cre8PageHeader as Cre8PageHeaderElement } from '@tmorrow/cre8-wc/lib/components/page-header/page-header';
import React from 'react';

export interface Cre8PageHeaderProps {
  /** Page header title */
  heading?: string;
  children?: React.ReactNode;
}

/**
 * Cre8PageHeader component
 */
export const Cre8PageHeader = createComponent({
  react: React,
  tagName: 'cre8-page-header',
  elementClass: Cre8PageHeaderElement,

});

export default Cre8PageHeader;
