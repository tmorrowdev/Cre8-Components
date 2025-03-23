import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8GlobalNavItem as cre8GlobalNavItemElement } from '@cre8/cre8-wc/lib/components/global-nav-item/global-nav-item';

export const cre8GlobalNavItem = createComponent({
    react: React,
    tagName: 'cre8-global-nav-item',
    elementClass: cre8GlobalNavItemElement,

});
