import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8ProgressMeter as Cre8ProgressMeterElement } from '@cre8_dev/cre8-wc/lib/components/progress-meter/progress-meter';

/**
 * A progress meter provides feedback that the system is working and gives the user an indication of how much time they will wait.
 * This indicator should be used when the system response time is longer and determinable.
 *
 * # How to Use
 * 1. Select a background from the “Surface” dropdown
 * 2. Select completion amount from the “Progress” dropdown
 */
export const Cre8ProgressMeter = createComponent({
    react: React,
    tagName: 'Cre8-progress-meter',
    elementClass: Cre8ProgressMeterElement,

});
