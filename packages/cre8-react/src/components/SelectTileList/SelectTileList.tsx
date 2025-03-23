import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8SelectTileList as cre8SelectTileListElement } from '@cre8/cre8-wc/lib/components/select-tile-list/select-tile-list';

export const cre8SelectTileList = createComponent({
    react: React,
    tagName: 'cre8-select-tile-list',
    elementClass: cre8SelectTileListElement,

});
