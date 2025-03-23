import { createComponent } from '@lit-labs/react';
import { cre8PrimaryNav as cre8PrimaryNavElement } from '@cre8/cre8-wc/lib/components/primary-nav/primary-nav';
import React from 'react';

export const cre8PrimaryNav = createComponent({
    react: React,
    tagName: 'cre8-primary-nav',
    elementClass: cre8PrimaryNavElement,
});
