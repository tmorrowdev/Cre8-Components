import { createComponent } from '@lit/react';
import { Cre8GridItem as Cre8GridItemElement } from '@tmorrow/cre8-wc/lib/components/grid-item/grid-item';
import React from 'react';

export const Cre8GridItem = createComponent({
    react: React,
    tagName: 'Cre8-grid-item',
    elementClass: Cre8GridItemElement,
});
