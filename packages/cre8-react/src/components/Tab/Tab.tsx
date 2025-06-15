import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8Tab as Cre8TabElement } from '@cre8_dev/cre8-wc/lib/components/tab/tab';

export const Cre8Tab = createComponent({
    react: React,
    tagName: 'cre8-tab',
    elementClass: Cre8TabElement,
});
