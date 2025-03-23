import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8TableHeader as cre8TableHeaderElement } from '@cre8/cre8-wc/lib/components/table-header/table-header';

export const cre8TableHeader = createComponent({
    react: React,
    tagName: 'cre8-table-header',
    elementClass: cre8TableHeaderElement,

});
