import { createComponent } from '@lit-labs/react';
import { cre8LinkListItem as cre8LinkListItemElement } from '@cre8/cre8-wc/lib/components/link-list-item/link-list-item';
import React from 'react';

export const cre8LinkListItem = createComponent({
    react: React,
    tagName: 'cre8-link-list-item',
    elementClass: cre8LinkListItemElement,
});
