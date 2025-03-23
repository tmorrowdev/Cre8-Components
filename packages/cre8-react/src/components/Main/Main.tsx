import { createComponent } from '@lit-labs/react';
import { cre8Main as cre8MainElement } from '@cre8/cre8-wc/lib/components/main/main';
import React from 'react';

export const cre8Main = createComponent({
    react: React,
    tagName: 'cre8-main',
    elementClass: cre8MainElement,
});
