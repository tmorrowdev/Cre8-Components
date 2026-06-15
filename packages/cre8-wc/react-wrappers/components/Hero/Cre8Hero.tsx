import { createComponent } from '@lit/react';
import { Cre8Hero as Cre8HeroElement } from '@tmorrow/cre8-wc/lib/components/hero/hero';
import React from 'react';

export interface Cre8HeroProps {
  /** Image source */
  imgSrc?: string | undefined;
  /** Image alt text */
  imgAlt?: string | undefined;
  /** Position variant. Bottom left is the default position <cre8-text-passage size="sm"> <ul> <li>**top-left** renders content in the top left corner of the image</li> <li>**left** renders content in the left, center part of the image</li> <li>**top-center** renders content in the top, center part of the image</li> <li>**center** renders content center of the image</li> <li>**bottom-center** renders content bottom center of the image</li> <li>**top-right** renders content top-right of the image</li> <li>**right** renders content right of the image</li> <li>**bottom-right** renders content bottom, right part of the image</li> </ul> </cre8-text-passage> */
  align?: any;
  /** Renders a dark overlay between the background image and the content for legibility. */
  hasOverlay?: boolean | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8Hero component
 */
export const Cre8Hero = createComponent({
  react: React,
  tagName: 'cre8-hero',
  elementClass: Cre8HeroElement,

});

export default Cre8Hero;
