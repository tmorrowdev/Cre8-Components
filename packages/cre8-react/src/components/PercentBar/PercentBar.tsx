import React from 'react';
import { createComponent, EventName } from '@lit/react';
import { Cre8PercentBar as Cre8PercentBarElement } from '@cre8_dev/cre8-wc/lib/components/percent-bar/percent-bar';
import { Cre8DomEvent } from '../../util/Cre8DomEvent';


/**
 * The percent bar visually indicates a user's current progress and has a few features: a basic display bar with
 * a percentage, an actionable icon that allows a user to revisit a prior step and an actionable link that
 * allows a user save their progress before exiting.
 */

export const Cre8PercentBar = createComponent({
    react: React,
    tagName: 'cre8-percent-bar',
    elementClass: Cre8PercentBarElement,
    events: {
        onLeftActionButtonClick: 'leftActionButtonClick' as EventName<Cre8DomEvent<Cre8PercentBarElement>>,
    },
});
