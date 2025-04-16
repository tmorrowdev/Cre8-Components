import { createComponent } from '@lit/react';
import { Cre8Layout as Cre8LayoutElement } from '@cre8_dev/cre8-wc/lib/components/layout/layout';
import React from 'react';

export const Cre8Layout = createComponent({
    react: React,
    tagName: 'Cre8-layout',
    elementClass: Cre8LayoutElement,
});
