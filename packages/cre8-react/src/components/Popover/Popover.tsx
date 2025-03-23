import React from 'react';
import { createComponent, EventName } from '@lit-labs/react';
import { cre8Popover as cre8PopoverElement } from '@cre8/cre8-wc/lib/components/popover/popover';
import { cre8DomEvent } from '../../util/cre8DomEvent';

/**
 * The Popover is for progressive disclosure of relevant content often hidden behind a help or info icon.
 * Its content should be no longer than 3-4 lines in addition to a line of heading text and an optional button.
 */

export const cre8Popover = createComponent({
    react: React,
    tagName: 'cre8-popover',
    elementClass: cre8PopoverElement,
    events: {
        onOpen: 'open' as EventName<cre8DomEvent<cre8PopoverElement>>,
        onClose: 'close' as EventName<cre8DomEvent<cre8PopoverElement>>,
    },
});
