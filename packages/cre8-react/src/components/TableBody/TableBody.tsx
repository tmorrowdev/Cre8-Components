import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8TableBody as Cre8TableBodyElement } from '@cre8_dev/cre8-wc/lib/components/table-body/table-body';

export const Cre8TableBody = createComponent({
    react: React,
    tagName: 'cre8-table-body',
    elementClass: Cre8TableBodyElement,

});
