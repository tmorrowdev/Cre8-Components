import { createComponent } from '@lit/react';
import { Cre8GridItem as Cre8GridItemElement } from '@cre8_dev/cre8-wc/lib/components/grid-item/grid-item';
import React from 'react';

export const Cre8GridItem = createComponent({
    react: React,
    tagName: 'cre8-grid-item',
    elementClass: Cre8GridItemElement,
});
