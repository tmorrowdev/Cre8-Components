import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8Section as Cre8SectionElement } from '@cre8_dev/cre8-wc/lib/components/section/section';

export const Cre8Section = createComponent({
    react: React,
    tagName: 'cre8-section',
    elementClass: Cre8SectionElement,

});
