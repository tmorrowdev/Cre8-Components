import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8Breadcrumbs as Cre8BreadcrumbsElement } from '@cre8_dev/cre8-wc/lib/components/breadcrumbs/breadcrumbs';

/**
 * The breadcrumbs component is a secondary navigation pattern that helps a user understand where the user is located.
 * The breadcrumbs component shows the users their current location relative to the information architecture
 * It enables the users to quickly move up to a parent level or previous location.
 *
 * ## How to Use
 *
 * - Import 'Breadcrumbs' component.
 * - Add the pages in the path of the breadcrumbs using `Cre8-breadcrumbs-item`.
 * All the pages in the breadcrumbs component should be interactive.
 * - All the page should link to their respective pages (except the current page) using `Cre8-link`.
 * - The current page is included in the breadcrumbs trail.
 * - The current page is always the last text listed and is not an interactive link.
 *
 */

export const Cre8Breadcrumbs = createComponent({
    react: React,
    tagName: 'Cre8-breadcrumbs',
    elementClass: Cre8BreadcrumbsElement,

});
