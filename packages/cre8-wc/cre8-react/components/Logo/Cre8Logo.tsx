import { createComponent } from '@lit/react';
import { Cre8Logo as Cre8LogoElement } from '@tmorrow/cre8-wc/lib/components/logo/logo';
import React from 'react';

export interface Cre8LogoProps {
  /** Logo link */
  href?: string | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8Logo component
 */
export const Cre8Logo = createComponent({
  react: React,
  tagName: 'cre8-logo',
  elementClass: Cre8LogoElement,

});

export default Cre8Logo;
