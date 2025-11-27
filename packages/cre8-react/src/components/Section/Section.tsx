import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8Section as Cre8SectionElement } from '@cre8_dev/cre8-wc';

export const Cre8Section = createComponent({
    react: React,
    tagName: 'Cre8-section',
    elementClass: Cre8SectionElement,

});
