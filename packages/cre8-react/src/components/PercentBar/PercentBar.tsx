import React from 'react';
import { createComponent, EventName } from '@lit-labs/react';
import { cre8PercentBar as cre8PercentBarElement } from '@cre8/cre8-wc/lib/components/percent-bar/percent-bar';
import { cre8DomEvent } from '../../util/cre8DomEvent';


/**
 * The percent bar visually indicates a user's current progress and has a few features: a basic display bar with
 * a percentage, an actionable icon that allows a user to revisit a prior step and an actionable link that
 * allows a user save their progress before exiting.
 */

export const cre8PercentBar = createComponent({
    react: React,
    tagName: 'cre8-percent-bar',
    elementClass: cre8PercentBarElement,
    events: {
        onLeftActionButtonClick: 'leftActionButtonClick' as EventName<cre8DomEvent<cre8PercentBarElement>>,
    },
});
