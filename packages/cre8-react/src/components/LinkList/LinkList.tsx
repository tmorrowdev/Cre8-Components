import { createComponent } from '@lit/react';
import { Cre8LinkList as Cre8LinkListElement } from '@cre8_dev/cre8-wc/lib/components/link-list/link-list';
import React from 'react';

export const Cre8LinkList = createComponent({
    react: React,
    tagName: 'cre8-link-list',
    elementClass: Cre8LinkListElement,
});
