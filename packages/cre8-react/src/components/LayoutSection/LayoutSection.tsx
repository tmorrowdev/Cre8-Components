import { createComponent } from '@lit-labs/react';
import { cre8LayoutSection as cre8LayoutSectionElement } from '@cre8/cre8-wc/lib/components/layout-section/layout-section';
import React from 'react';

export const cre8LayoutSection = createComponent({
    react: React,
    tagName: 'cre8-layout-section',
    elementClass: cre8LayoutSectionElement,
});
