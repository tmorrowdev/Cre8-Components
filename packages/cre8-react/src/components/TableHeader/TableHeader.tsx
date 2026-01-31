import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8TableHeader as Cre8TableHeaderElement } from '@tmorrow/cre8-wc/lib/components/table-header/table-header';

export const Cre8TableHeader = createComponent({
    react: React,
    tagName: 'Cre8-table-header',
    elementClass: Cre8TableHeaderElement,

});
