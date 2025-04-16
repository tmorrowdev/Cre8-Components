import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8LoadingSpinner as Cre8LoadingSpinnerElement } from '@cre8_dev/cre8-wc/lib/components/loading-spinner/loading-spinner';

/**
 * A loading spinner notifies the user that their request is being processed while the front end is retrieving data
 * or performing slow computations.
 *
 * Providing visibility of a system's status is one of the most important rules of UI design. When the user has to
 * guess or assume that the system is responding to their input, they may send a command such as submit multiple
 * times, while also being anxious that the application is frozen or not working.
 *
 * While it is most ideal to improve system performance such that there is no perceptible delay, in some cases this
 * is not possible. In these cases, the immediate response should be a progress indicator to give a visual indication
 * that their command was received and that the application is working.
 *
 * The length of time for the system response is a good general guideline for which progress indicator to use.
 *
 * ## Determinable vs indeterminate progress
 *
 * A progress meter provides feedback that the system is working and gives the user an indication of how much time
 * they will wait. This indicator should be used when the system response time is longer and determinable. See
 * ProgressMeter component for further examples and accessibility considerations.
 *
 * ## How to Use
 *
 * The loading-spinner component can be used to indicate loading state on the component level all the way up to the
 * page level. There are two loading styles: determinate (loading progress represents percentage of total load time)
 * and indeterminate (a spinning animation that persists while loading continues)
 *
 * 1. Choose a size and use it according to context, guidance should be given by your design team.
 * 2. If you choose to use the determinate loader then you must also control the progress attribute's value which
 * controls the percentage of the circle that shows (values 0-100 accepted);
 * 3. For dark backgrounds, add the `inverted` attribute to the `<Cre8-loading-spinner>` tag.
 * 4. For accessibility reasons, always include a label input unless explicitly informed to do otherwise by design or
 * accessibility teams.
 *
 */
export const Cre8LoadingSpinner = createComponent({
    react: React,
    tagName: 'Cre8-loading-spinner',
    elementClass: Cre8LoadingSpinnerElement,

});
