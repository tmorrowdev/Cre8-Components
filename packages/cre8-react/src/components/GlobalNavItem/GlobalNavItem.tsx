import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8GlobalNavItem as Cre8GlobalNavItemElement } from '@cre8_dev/cre8-wc';

export const Cre8GlobalNavItem = createComponent({
    react: React,
    tagName: 'Cre8-global-nav-item',
    elementClass: Cre8GlobalNavItemElement,

});
