import { createComponent } from '@lit/react';
import { Cre8TertiaryNav as Cre8TertiaryNavElement } from '@cre8_dev/cre8-wc/lib/components/tertiary-nav/tertiary-nav';
import React from 'react';

export const Cre8TertiaryNav = createComponent({
    react: React,
    tagName: 'cre8-tertiary-nav',
    elementClass: Cre8TertiaryNavElement,
});
