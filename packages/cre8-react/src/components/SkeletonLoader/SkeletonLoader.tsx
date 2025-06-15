import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8SkeletonLoader as Cre8SkeletonLoaderElement } from '@cre8_dev/cre8-wc/lib/components/skeleton-loader/skeleton-loader';

/**
 * Skeleton Loader allows for the ability to create placeholder UI loading states.
 * Developers are encouraged to pass into the Skeleton Loader their own parameters
 * to create simple (or complex) loading screens.
 *
 * ## How to Use
 * Skeleton states are simplified versions of components used on an initial page load
 * to indicate that the information on the page has not fully loaded yet.
 * They only appear for only a few seconds, disappearing once components and content populate the page.
 * These loaders use motion to convey that the page is not stuck and that data is still being loaded.
 * This can help to reduce user uncertainty. Skeleton objects should generally be visualized
 * by simple primitives which mimic the original content in a recognizable way.
 * It is recommended to use a more elaborate form if that is needed to make the component recognizable.
 *
 * Never represent toast notifications, overflow menus, dropdown items, modals, and loaders with skeleton states.
 * Elements inside a modal may have a skeleton state, but the modal itself should not.
 *
 * **IMPORTANT!** This is not a loading element and will provide no value to a screen reader user,
 * this is a decorative element only!
 */

export const Cre8SkeletonLoader = createComponent({
    react: React,
    tagName: 'cre8-skeleton-loader',
    elementClass: Cre8SkeletonLoaderElement,
});
