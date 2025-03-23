import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8Tab as cre8TabElement } from '@cre8/cre8-wc/lib/components/tab/tab';

export const cre8Tab = createComponent({
    react: React,
    tagName: 'cre8-tab',
    elementClass: cre8TabElement,
});
