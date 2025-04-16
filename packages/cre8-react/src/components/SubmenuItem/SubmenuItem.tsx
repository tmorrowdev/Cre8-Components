import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8SubmenuItem as Cre8SubmenuItemElement } from '@cre8_dev/cre8-wc/lib/components/submenu-item/submenu-item';

export const Cre8SubmenuItem = createComponent({
    react: React,
    tagName: 'Cre8-submenu-item',
    elementClass: Cre8SubmenuItemElement,

});
