import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8Logo as Cre8LogoElement } from '@tmorrow/cre8-wc/lib/components/logo/logo';

export const Cre8Logo = createComponent({
    react: React,
    tagName: 'Cre8-logo',
    elementClass: Cre8LogoElement,

});
