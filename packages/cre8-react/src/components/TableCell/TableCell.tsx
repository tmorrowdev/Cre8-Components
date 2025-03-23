import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8TableCell as cre8TableCellElement } from '@cre8/cre8-wc/lib/components/table-cell/table-cell';

export const cre8TableCell = createComponent({
    react: React,
    tagName: 'cre8-table-cell',
    elementClass: cre8TableCellElement,

});
