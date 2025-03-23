import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8TabPanel as cre8TabPanelElement } from '@cre8/cre8-wc/lib/components/tab-panel/tab-panel';

export const cre8TabPanel = createComponent({
    react: React,
    tagName: 'cre8-tab-panel',
    elementClass: cre8TabPanelElement,
});
