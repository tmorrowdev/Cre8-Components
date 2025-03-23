import React from 'react';
import { createComponent, EventName } from '@lit-labs/react';
import { cre8RemoveTag as cre8RemoveTagElement } from '@cre8/cre8-wc/lib/components/remove-tag/remove-tag';
import { cre8DomEvent } from '../../util/cre8DomEvent';

export const cre8RemoveTag = createComponent({
    react: React,
    tagName: 'cre8-remove-tag',
    elementClass: cre8RemoveTagElement,
    events: {
        onRemoveTagClicked: 'removeTagClicked' as EventName<cre8DomEvent<cre8RemoveTagElement>>,
    },
});
