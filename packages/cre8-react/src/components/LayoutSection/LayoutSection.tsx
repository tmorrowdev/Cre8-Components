import { createComponent } from '@lit/react';
import { Cre8LayoutSection as Cre8LayoutSectionElement } from '@cre8_dev/cre8-wc/lib/components/layout-section/layout-section';
import React from 'react';

export const Cre8LayoutSection = createComponent({
    react: React,
    tagName: 'cre8-layout-section',
    elementClass: Cre8LayoutSectionElement,
});
