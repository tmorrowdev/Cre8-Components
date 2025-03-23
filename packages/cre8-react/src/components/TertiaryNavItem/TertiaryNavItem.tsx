import { createComponent } from '@lit-labs/react';
import { cre8TertiaryNavItem as cre8TertiaryNavItemElement } from '@cre8/cre8-wc/lib/components/tertiary-nav-item/tertiary-nav-item';
import React from 'react';

export const cre8TertiaryNavItem = createComponent({
    react: React,
    tagName: 'cre8-tertiary-nav-item',
    elementClass: cre8TertiaryNavItemElement,
});
