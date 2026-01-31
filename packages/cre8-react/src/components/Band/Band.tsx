import { createComponent } from '@lit/react';
import { Cre8Band as Cre8BandElement } from '@tmorrow/cre8-wc/lib/components/band/band';
import React from 'react';

export const Cre8Band = createComponent({
    react: React,
    tagName: 'Cre8-band',
    elementClass: Cre8BandElement,
});
