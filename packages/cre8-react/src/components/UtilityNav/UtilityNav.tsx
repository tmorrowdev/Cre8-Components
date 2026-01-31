import { createComponent } from '@lit/react';
import { Cre8UtilityNav as Cre8UtilityNavElement } from '@tmorrow/cre8-wc/lib/components/utility-nav/utility-nav';
import React from 'react';

export const Cre8UtilityNav = createComponent({
    react: React,
    tagName: 'Cre8-utility-nav',
    elementClass: Cre8UtilityNavElement,
});
