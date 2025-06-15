import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8GlobalNav as Cre8GlobalNavElement } from '@cre8_dev/cre8-wc/lib/components/global-nav/global-nav';

export const Cre8GlobalNav = createComponent({
    react: React,
    tagName: 'cre8-global-nav',
    elementClass: Cre8GlobalNavElement,

});
