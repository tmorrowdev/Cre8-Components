import { createComponent } from '@lit/react';
import { Cre8VerticalCard as Cre8VerticalCardElement } from '@tmorrow/cre8-wc/lib/components/vertical-card/vertical-card';
import React from 'react';

export const Cre8VerticalCard = createComponent({
    react: React,
    tagName: 'Cre8-vertical-card',
    elementClass: Cre8VerticalCardElement,
});
