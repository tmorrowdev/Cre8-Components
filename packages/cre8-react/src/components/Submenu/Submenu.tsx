import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8Submenu as cre8SubmenuElement } from '@cre8/cre8-wc/lib/components/submenu/submenu';

export const cre8Submenu = createComponent({
    react: React,
    tagName: 'cre8-submenu',
    elementClass: cre8SubmenuElement,

});
