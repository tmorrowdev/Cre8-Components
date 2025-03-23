import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8Divider as cre8DividerElement } from '@cre8/cre8-wc/lib/components/divider/divider';

/**
 * The divider component is a separator between sections of content or groups of items.
 * It often contains a horizontal or vertical line.
 *
 * ##How to use
 * - By default, the component renders the **horizontal divider**
 * - The user can set variant === "vertical" so it will render the vertical divider
 * - By default, the divider has gray color.
 * - The user can set status === "brand" to set the divider to blue color.
 * - The user can set status === "knockout" to set the divider to white color.
*/

export const cre8Divider = createComponent({
    react: React,
    tagName: 'cre8-divider',
    elementClass: cre8DividerElement,
});
