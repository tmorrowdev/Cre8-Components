import { createComponent } from '@lit/react';
import { Cre8LayoutSection as Cre8LayoutSectionElement } from '@tmorrow/cre8-wc/lib/components/layout-section/layout-section';
import React from 'react';

export const Cre8LayoutSection = createComponent({
    react: React,
    tagName: 'Cre8-layout-section',
    elementClass: Cre8LayoutSectionElement,
});
