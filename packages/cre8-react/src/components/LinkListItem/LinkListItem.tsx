import { createComponent } from '@lit/react';
import { Cre8LinkListItem as Cre8LinkListItemElement } from '@cre8_dev/cre8-wc/lib/components/link-list-item/link-list-item';
import React from 'react';

export const Cre8LinkListItem = createComponent({
    react: React,
    tagName: 'Cre8-link-list-item',
    elementClass: Cre8LinkListItemElement,
});
