import { createComponent } from '@lit/react';
import { Cre8Feature as Cre8FeatureElement } from '@tmorrow/cre8-wc/lib/components/feature/feature';
import React from 'react';

export interface Cre8FeatureProps {
  /** Image source */
  imgSrc?: string | undefined;
  /** Image alt text */
  imgAlt?: string | undefined;
  /** Inverted variant 1) Used for dark backgrounds */
  inverted?: boolean | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8Feature component
 */
export const Cre8Feature = createComponent({
  react: React,
  tagName: 'cre8-feature',
  elementClass: Cre8FeatureElement,

});

export default Cre8Feature;
