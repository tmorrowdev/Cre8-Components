import { createComponent } from '@lit-labs/react';
import { cre8VerticalCard as cre8VerticalCardElement } from '@cre8/cre8-wc/lib/components/vertical-card/vertical-card';
import React from 'react';

export const cre8VerticalCard = createComponent({
    react: React,
    tagName: 'cre8-vertical-card',
    elementClass: cre8VerticalCardElement,
});
