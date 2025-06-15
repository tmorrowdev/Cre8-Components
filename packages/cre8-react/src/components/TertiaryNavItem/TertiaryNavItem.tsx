import { createComponent } from '@lit/react';
import { Cre8TertiaryNavItem as Cre8TertiaryNavItemElement } from '@cre8_dev/cre8-wc/lib/components/tertiary-nav-item/tertiary-nav-item';
import React from 'react';

export const Cre8TertiaryNavItem = createComponent({
    react: React,
    tagName: 'cre8-tertiary-nav-item',
    elementClass: Cre8TertiaryNavItemElement,
});
