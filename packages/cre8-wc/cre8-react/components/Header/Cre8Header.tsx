import { createComponent } from '@lit/react';
import { Cre8Header as Cre8HeaderElement } from '@tmorrow/cre8-wc/lib/components/header/header';
import React from 'react';

export interface Cre8HeaderProps {
  children?: React.ReactNode;
}

/**
 * Cre8Header component
 */
export const Cre8Header = createComponent({
  react: React,
  tagName: 'cre8-header',
  elementClass: Cre8HeaderElement,

});

export default Cre8Header;
