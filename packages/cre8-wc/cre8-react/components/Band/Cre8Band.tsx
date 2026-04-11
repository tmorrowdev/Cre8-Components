import { createComponent } from '@lit/react';
import { Cre8Band as Cre8BandElement } from '@tmorrow/cre8-wc/lib/components/band/band';
import React from 'react';

export interface Cre8BandProps {
  /** Gradient variant <cre8-text-passage size="sm"> <ul> <li>**1** renders the band with the set gradient background</li> </ul> </cre8-text-passage> */
  variant?: any;
  /** Full height variant 1) Sets the height to 100% */
  fullHeight?: boolean | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8Band component
 */
export const Cre8Band = createComponent({
  react: React,
  tagName: 'cre8-band',
  elementClass: Cre8BandElement,

});

export default Cre8Band;
