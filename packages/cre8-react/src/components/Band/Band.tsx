import { createComponent } from '@lit-labs/react';
import { cre8Band as cre8BandElement } from '@cre8/cre8-wc/lib/components/band/band';
import React from 'react';

export const cre8Band = createComponent({
    react: React,
    tagName: 'cre8-band',
    elementClass: cre8BandElement,
});
