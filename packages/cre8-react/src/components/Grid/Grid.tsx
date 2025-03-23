import { createComponent } from '@lit-labs/react';
import { cre8Grid as cre8GridElement } from '@cre8/cre8-wc/lib/components/grid/grid';
import React from 'react';

export const cre8Grid = createComponent({
    react: React,
    tagName: 'cre8-grid',
    elementClass: cre8GridElement,
});
