import { createComponent } from '@lit-labs/react';
import { cre8Layout as cre8LayoutElement } from '@cre8/cre8-wc/lib/components/layout/layout';
import React from 'react';

export const cre8Layout = createComponent({
    react: React,
    tagName: 'cre8-layout',
    elementClass: cre8LayoutElement,
});
