import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8ProgressMeter as Cre8ProgressMeterElement } from '@cre8_dev/cre8-wc';

/**
 * The Progress Steps component is used to display where a user is in a multistep process.
 * It clearly indicates the total number of steps, which steps are complete and incomplete,
 * and which step you’re currently on. They help users estimate how long a task will take and can be
 * used to track status on orders.
 *
 * The Progress Steps component should be used as a parent component for `Cre8-progress-steps-item` components.
 * These Components serve a contextual purpose and don't provide any functionality.
 *
 * # How to Use
 *
 * Progress Steps is used when there is ample horizontal space and two to six steps. It displays each step by name
 * and number to help users understand exactly where they are in a process. It is the preferred option for desktop.
 * Progress Steps should change to Compact Steps on mobile web to conserve space.
 *
 * Progress Steps can also be used to track order status. It provides a quick visual of how an order is progressing
 * with options to alert users of any problems along the way. When used for order status, Progress Steps should
 * change to Vertical Steps on mobile web to conserve space while allowing alerts and messages to remain visible.
 *
 * @slot - The Progress Steps Item components that represent the steps in the multistep process.
 */
export const Cre8ProgressMeter = createComponent({
    react: React,
    tagName: 'Cre8ProgressMeter',
    elementClass: Cre8ProgressMeterElement,

});
