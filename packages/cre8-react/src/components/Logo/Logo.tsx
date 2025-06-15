import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8Logo as Cre8LogoElement } from '@cre8_dev/cre8-wc/lib/components/logo/logo';

export const Cre8Logo = createComponent({
    react: React,
    tagName: 'cre8-logo',
    elementClass: Cre8LogoElement,

});
