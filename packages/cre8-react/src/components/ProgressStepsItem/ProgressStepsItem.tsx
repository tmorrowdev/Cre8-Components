import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8ProgressStepsItem as Cre8ProgressStepsItemElement } from '@cre8_dev/cre8-wc/lib/components/progress-steps-item/progress-steps-item';

/**
 * The Progress Steps Item component is used to display a single step in a multi-step process.
 * It should be used as a child component of `Cre8-progress-steps`.
 * These Components serve a contextual purpose and don't provide any functionality.
 *
 *
 * @property {string} icon - An SVG string to use as the step icon.
 * @property {string} message - Optional message to display under the step name.
 * @property {string} name - The name of the step.
 * @property {string} position - The position of the step in the sequence.
 * @property {string} state - The state of the step.
 *
 * @slot - The component content
 */
export const Cre8ProgressStepsItem = createComponent({
    react: React,
    tagName: 'cre8-progress-steps-item',
    elementClass: Cre8ProgressStepsItemElement,

});
