import { createComponent } from '@lit/react';
import { Cre8Grid as Cre8GridElement } from '@tmorrow/cre8-wc/lib/components/grid/grid';
import React from 'react';

export const Cre8Grid = createComponent({
    react: React,
    tagName: 'Cre8-grid',
    elementClass: Cre8GridElement,
});
