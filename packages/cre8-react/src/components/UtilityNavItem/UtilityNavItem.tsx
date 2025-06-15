import { createComponent } from '@lit/react';
import { Cre8UtilityNavItem as Cre8UtilityNavItemElement } from '@cre8_dev/cre8-wc/lib/components/utility-nav-item/utility-nav-item';
import React from 'react';

export const Cre8UtilityNavItem = createComponent({
    react: React,
    tagName: 'cre8-utility-nav-item',
    elementClass: Cre8UtilityNavItemElement,
});
