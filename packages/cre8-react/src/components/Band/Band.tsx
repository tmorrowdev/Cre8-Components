import { createComponent } from '@lit/react';
import { Cre8Band as Cre8BandElement } from '@cre8_dev/cre8-wc';
import React from 'react';

export const Cre8Band = createComponent({
    react: React,
    tagName: 'Cre8-band',
    elementClass: Cre8BandElement,
});
