import { createComponent } from '@lit/react';
import { Cre8TextLink as Cre8TextLinkElement } from '@tmorrow/cre8-wc/lib/components/text-link/text-link';
import React from 'react';

export interface Cre8TextLinkProps {
  /** The link URL */
  href?: string | undefined;
  /** Style variant <cre8-text-passage size="sm"> <ul> <li> **display** applies display treatment to the text link (e.g. article title link)</li> <li> **secondary** applies secondary treatment to the text link (e.g. non-prominent links)</li> </ul> </cre8-text-passage> */
  variant?: any;
  /** Size variant <cre8-text-passage size="sm"> <ul> <li> **sm** renders a smaller typography preset than the default</li> </ul> </cre8-text-passage> */
  size?: any;
  /** Inverted variant 1) Used for dark backgrounds */
  inverted?: boolean | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8TextLink component
 */
export const Cre8TextLink = createComponent({
  react: React,
  tagName: 'cre8-text-link',
  elementClass: Cre8TextLinkElement,

});

export default Cre8TextLink;
