import React from 'react';
import { createComponent, EventName } from '@lit/react';
import { Cre8RemoveTag as Cre8RemoveTagElement } from '@cre8_dev/cre8-wc/lib/components/remove-tag/remove-tag';
import { Cre8DomEvent } from '../../util/Cre8DomEvent';

export const Cre8RemoveTag = createComponent({
    react: React,
    tagName: 'cre8-remove-tag',
    elementClass: Cre8RemoveTagElement,
    events: {
        onRemoveTagClicked: 'removeTagClicked' as EventName<Cre8DomEvent<Cre8RemoveTagElement>>,
    },
});
