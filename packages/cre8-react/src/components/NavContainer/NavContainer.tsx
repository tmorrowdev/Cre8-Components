import { createComponent } from '@lit-labs/react';
import { cre8NavContainer as cre8NavContainerElement } from '@cre8/cre8-wc/lib/components/nav-container/nav-container';
import React from 'react';

export const cre8NavContainer = createComponent({
    react: React,
    tagName: 'cre8-nav-container',
    elementClass: cre8NavContainerElement,
});
