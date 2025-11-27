import { createComponent } from '@lit/react';
import { Cre8PrimaryNavItem as Cre8PrimaryNavItemElement } from '@cre8_dev/cre8-wc';
import React from 'react';

export const Cre8PrimaryNavItem = createComponent({
    react: React,
    tagName: 'Cre8-primary-nav-item',
    elementClass: Cre8PrimaryNavItemElement,
});
