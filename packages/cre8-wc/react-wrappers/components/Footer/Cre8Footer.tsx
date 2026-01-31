import { createComponent } from '@lit/react';
import { Cre8Footer as Cre8FooterElement } from '@tmorrow/cre8-wc/lib/components/footer/footer';
import React from 'react';

export interface Cre8FooterProps {
  children?: React.ReactNode;
}

/**
 * Cre8Footer component
 */
export const Cre8Footer = createComponent({
  react: React,
  tagName: 'cre8-footer',
  elementClass: Cre8FooterElement,

});

export default Cre8Footer;
