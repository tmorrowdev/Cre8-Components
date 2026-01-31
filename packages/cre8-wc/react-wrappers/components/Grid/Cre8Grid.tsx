import { createComponent } from '@lit/react';
import { Cre8Grid as Cre8GridElement } from '@tmorrow/cre8-wc/lib/components/grid/grid';
import React from 'react';

export interface Cre8GridProps {
  /** Style variant - **side-by-side** yields a grid whose grid items display side-by-side (2 per row) on all screen sizes - **2up** yields a grid whose grid items are stacked on small screens   but display side-by-side when enough screen real estate is available to do so - **3up** yields a grid whose grid items are stacked on small screens,   transforms to a 2-across pattern and then transforms again to a 3-across pattern - **1-3up** yields a grid whose grid items are stacked on small screens   and transforms to a 3-across pattern on larger screens - **4up** yields a grid whose grid items are stacked on small screens,   transforms to a 2-across pattern, transforms again to a 3-across pattern,   and ultimately transforms to a 4-across pattern - **1-2-4up** yields a grid whose grid items are stacked on small screens,   transforms to a 2-across pattern, and ultimately transforms to a 4-across pattern - **1-4up** yields a grid whose grid items are stacked on small screens,   transforms to a 4-across pattern on medium/large screens */
  variant?: "side-by-side" | "2up" | "3up" | "1-3up" | "4up" | "1-4up" | "1-2-4up" | "2-4-6up" | undefined;
  /** Style variant - **none** yields a grid whose grid items are spaced without any gutter in between - **sm** yields a grid whose grid items are spaced with a gap smaller than the default - **lg** yields a grid whose grid items are spaced with a gap larger than the default */
  gap?: "sm" | "lg" | "none" | undefined;
  /** Break variant - **faster** breaks the grid at a smaller width than the default.   Example: 2up grid breaks to 2 per row at smaller width than default - **slower** breaks the grid at a larger width than the default.   Example: 2up grid breaks to 2 per row at larger width than default - **lg** yields a grid whose grid items are spaced with a gap larger than the default */
  break?: "faster" | "slower" | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8Grid component
 */
export const Cre8Grid = createComponent({
  react: React,
  tagName: 'cre8-grid',
  elementClass: Cre8GridElement,

});

export default Cre8Grid;
