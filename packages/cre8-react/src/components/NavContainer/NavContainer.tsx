import { createComponent } from '@lit/react';
import { Cre8NavContainer as Cre8NavContainerElement } from '@cre8_dev/cre8-wc/lib/components/nav-container/nav-container';
import React from 'react';

export const Cre8NavContainer = createComponent({
    react: React,
    tagName: 'cre8-nav-container',
    elementClass: Cre8NavContainerElement,
});
