import { createComponent } from '@lit/react';
import { Cre8Main as Cre8MainElement } from '@cre8_dev/cre8-wc/lib/components/main/main';
import React from 'react';

export const Cre8Main = createComponent({
    react: React,
    tagName: 'Cre8-main',
    elementClass: Cre8MainElement,
});
