import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8TableCell as Cre8TableCellElement } from '@tmorrow/cre8-wc/lib/components/table-cell/table-cell';

export const Cre8TableCell = createComponent({
    react: React,
    tagName: 'Cre8-table-cell',
    elementClass: Cre8TableCellElement,

});
