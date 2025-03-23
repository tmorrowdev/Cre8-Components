import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8GlobalNav as cre8GlobalNavElement } from '@cre8/cre8-wc/lib/components/global-nav/global-nav';

export const cre8GlobalNav = createComponent({
    react: React,
    tagName: 'cre8-global-nav',
    elementClass: cre8GlobalNavElement,

});
