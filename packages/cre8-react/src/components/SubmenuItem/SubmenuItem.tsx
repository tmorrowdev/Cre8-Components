import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8SubmenuItem as cre8SubmenuItemElement } from '@cre8/cre8-wc/lib/components/submenu-item/submenu-item';

export const cre8SubmenuItem = createComponent({
    react: React,
    tagName: 'cre8-submenu-item',
    elementClass: cre8SubmenuItemElement,

});
