import { createComponent } from '@lit-labs/react';
import { cre8UtilityNav as cre8UtilityNavElement } from '@cre8/cre8-wc/lib/components/utility-nav/utility-nav';
import React from 'react';

export const cre8UtilityNav = createComponent({
    react: React,
    tagName: 'cre8-utility-nav',
    elementClass: cre8UtilityNavElement,
});
