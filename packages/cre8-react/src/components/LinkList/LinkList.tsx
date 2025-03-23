import { createComponent } from '@lit-labs/react';
import { cre8LinkList as cre8LinkListElement } from '@cre8/cre8-wc/lib/components/link-list/link-list';
import React from 'react';

export const cre8LinkList = createComponent({
    react: React,
    tagName: 'cre8-link-list',
    elementClass: cre8LinkListElement,
});
