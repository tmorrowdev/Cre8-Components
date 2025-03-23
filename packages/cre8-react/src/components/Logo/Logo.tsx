import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8Logo as cre8LogoElement } from '@cre8/cre8-wc/lib/components/logo/logo';

export const cre8Logo = createComponent({
    react: React,
    tagName: 'cre8-logo',
    elementClass: cre8LogoElement,

});
