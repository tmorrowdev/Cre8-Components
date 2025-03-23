import { createComponent } from '@lit-labs/react';
import { cre8GridItem as cre8GridItemElement } from '@cre8/cre8-wc/lib/components/grid-item/grid-item';
import React from 'react';

export const cre8GridItem = createComponent({
    react: React,
    tagName: 'cre8-grid-item',
    elementClass: cre8GridItemElement,
});
