import { createComponent } from '@lit/react';
import { Cre8LayoutContainer as Cre8LayoutContainerElement } from '@cre8_dev/cre8-wc/lib/components/layout-container/layout-container';
import React from 'react';

export const Cre8LayoutContainer = createComponent({
    react: React,
    tagName: 'cre8-layout-container',
    elementClass: Cre8LayoutContainerElement,
});
