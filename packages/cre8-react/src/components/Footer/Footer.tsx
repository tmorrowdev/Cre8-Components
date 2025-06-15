import { createComponent } from '@lit/react';
import { Cre8Footer as Cre8FooterElement } from '@cre8_dev/cre8-wc/lib/components/footer/footer';
import React from 'react';

export const Cre8Footer = createComponent({
    react: React,
    tagName: 'cre8-footer',
    elementClass: Cre8FooterElement,
});
