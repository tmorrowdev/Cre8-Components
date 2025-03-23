import { createComponent } from '@lit-labs/react';
import { cre8Footer as cre8FooterElement } from '@cre8/cre8-wc/lib/components/footer/footer';
import React from 'react';

export const cre8Footer = createComponent({
    react: React,
    tagName: 'cre8-footer',
    elementClass: cre8FooterElement,
});
