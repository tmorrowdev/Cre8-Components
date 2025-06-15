import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8TableHeaderCell as Cre8TableHeaderCellElement } from '@cre8_dev/cre8-wc/lib/components/table-header-cell/table-header-cell';

export const Cre8TableHeaderCell = createComponent({
    react: React,
    tagName: 'cre8-table-header-cell',
    elementClass: Cre8TableHeaderCellElement,

});
