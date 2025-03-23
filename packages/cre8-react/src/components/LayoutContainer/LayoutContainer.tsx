import { createComponent } from '@lit-labs/react';
import { cre8LayoutContainer as cre8LayoutContainerElement } from '@cre8/cre8-wc/lib/components/layout-container/layout-container';
import React from 'react';

export const cre8LayoutContainer = createComponent({
    react: React,
    tagName: 'cre8-layout-container',
    elementClass: cre8LayoutContainerElement,
});
