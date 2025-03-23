import { createComponent } from '@lit-labs/react';
import { cre8UtilityNavItem as cre8UtilityNavItemElement } from '@cre8/cre8-wc/lib/components/utility-nav-item/utility-nav-item';
import React from 'react';

export const cre8UtilityNavItem = createComponent({
    react: React,
    tagName: 'cre8-utility-nav-item',
    elementClass: cre8UtilityNavItemElement,
});
