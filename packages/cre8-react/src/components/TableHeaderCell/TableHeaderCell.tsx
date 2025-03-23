import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8TableHeaderCell as cre8TableHeaderCellElement } from '@cre8/cre8-wc/lib/components/table-header-cell/table-header-cell';

export const cre8TableHeaderCell = createComponent({
    react: React,
    tagName: 'cre8-table-header-cell',
    elementClass: cre8TableHeaderCellElement,

});
