import { createComponent } from '@lit/react';
import { Cre8PrimaryNav as Cre8PrimaryNavElement } from '@tmorrow/cre8-wc/lib/components/primary-nav/primary-nav';
import React from 'react';

export const Cre8PrimaryNav = createComponent({
    react: React,
    tagName: 'Cre8-primary-nav',
    elementClass: Cre8PrimaryNavElement,
});
