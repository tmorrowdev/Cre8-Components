import React from 'react';
import { createComponent, EventName } from '@lit/react';
import { Cre8Popover as Cre8PopoverElement } from '@cre8_dev/cre8-wc/lib/components/popover/popover';
import { Cre8DomEvent } from '../../util/Cre8DomEvent';

/**
 * The Popover is for progressive disclosure of relevant content often hidden behind a help or info icon.
 * Its content should be no longer than 3-4 lines in addition to a line of heading text and an optional button.
 */

export const Cre8Popover = createComponent({
    react: React,
    tagName: 'Cre8-popover',
    elementClass: Cre8PopoverElement,
    events: {
        onOpen: 'open' as EventName<Cre8DomEvent<Cre8PopoverElement>>,
        onClose: 'close' as EventName<Cre8DomEvent<Cre8PopoverElement>>,
    },
});
