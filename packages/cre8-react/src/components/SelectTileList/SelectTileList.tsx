import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8SelectTileList as Cre8SelectTileListElement } from '@cre8_dev/cre8-wc/lib/components/select-tile-list/select-tile-list';

export const Cre8SelectTileList = createComponent({
    react: React,
    tagName: 'Cre8-select-tile-list',
    elementClass: Cre8SelectTileListElement,

});
