import { createComponent } from '@lit/react';
import { Cre8SkeletonLoader as Cre8SkeletonLoaderElement } from '@tmorrow/cre8-wc/lib/components/skeleton-loader/skeleton-loader';
import React from 'react';

export interface Cre8SkeletonLoaderProps {
  /** Style variant - **rectangle** renders a featureless rectangle as a placeholder for loading elements - **square** renders a featureless square as a placeholder for loading elements - **circle** renders a featureless circle as a placeholder for loading elements */
  variant?: "rectangle" | "square" | "circle";
  /** Height inline style 1. Used to set a height on the skeleton if specific size is needed */
  height?: string;
  /** Width inline style 1. Used to set a width on the skeleton if specific size is needed */
  width?: string;
}

/**
 * Skeleton Loader allows for the ability to create placeholder UI loading states.
 */
export const Cre8SkeletonLoader = createComponent({
  react: React,
  tagName: 'cre8-skeleton-loader',
  elementClass: Cre8SkeletonLoaderElement,

});

export default Cre8SkeletonLoader;
