import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8Submenu as Cre8SubmenuElement } from '@cre8_dev/cre8-wc/lib/components/submenu/submenu';

export const Cre8Submenu = createComponent({
    react: React,
    tagName: 'cre8-submenu',
    elementClass: Cre8SubmenuElement,

});
