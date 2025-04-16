import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8TabPanel as Cre8TabPanelElement } from '@cre8_dev/cre8-wc/lib/components/tab-panel/tab-panel';

export const Cre8TabPanel = createComponent({
    react: React,
    tagName: 'Cre8-tab-panel',
    elementClass: Cre8TabPanelElement,
});
