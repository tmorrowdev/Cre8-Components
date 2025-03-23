import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8TextLink as cre8TextLinkElement } from '@cre8/cre8-wc/lib/components/text-link/text-link';

export const cre8TextLink = createComponent({
    react: React,
    tagName: 'cre8-text-link',
    elementClass: cre8TextLinkElement,

});
