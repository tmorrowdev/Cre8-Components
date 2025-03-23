import { createComponent } from '@lit-labs/react';
import { cre8PrimaryNavItem as cre8PrimaryNavItemElement } from '@cre8/cre8-wc/lib/components/primary-nav-item/primary-nav-item';
import React from 'react';

export const cre8PrimaryNavItem = createComponent({
    react: React,
    tagName: 'cre8-primary-nav-item',
    elementClass: cre8PrimaryNavItemElement,
});
