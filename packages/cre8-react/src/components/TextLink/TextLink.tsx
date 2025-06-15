import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8TextLink as Cre8TextLinkElement } from '@cre8_dev/cre8-wc/lib/components/text-link/text-link';

export const Cre8TextLink = createComponent({
    react: React,
    tagName: 'cre8-text-link',
    elementClass: Cre8TextLinkElement,

});
