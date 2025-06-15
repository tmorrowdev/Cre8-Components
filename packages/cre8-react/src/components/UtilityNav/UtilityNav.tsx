import { createComponent } from '@lit/react';
import { Cre8UtilityNav as Cre8UtilityNavElement } from '@cre8_dev/cre8-wc/lib/components/utility-nav/utility-nav';
import React from 'react';

export const Cre8UtilityNav = createComponent({
    react: React,
    tagName: 'cre8-utility-nav',
    elementClass: Cre8UtilityNavElement,
});
