import { createComponent } from '@lit-labs/react';
import { cre8TertiaryNav as cre8TertiaryNavElement } from '@cre8/cre8-wc/lib/components/tertiary-nav/tertiary-nav';
import React from 'react';

export const cre8TertiaryNav = createComponent({
    react: React,
    tagName: 'cre8-tertiary-nav',
    elementClass: cre8TertiaryNavElement,
});
