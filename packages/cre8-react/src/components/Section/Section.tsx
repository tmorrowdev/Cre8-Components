import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8Section as cre8SectionElement } from '@cre8/cre8-wc/lib/components/section/section';

export const cre8Section = createComponent({
    react: React,
    tagName: 'cre8-section',
    elementClass: cre8SectionElement,

});
