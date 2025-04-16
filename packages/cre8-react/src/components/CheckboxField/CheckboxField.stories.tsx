import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { Cre8CheckboxField, Cre8CheckboxFieldItem } from '../..';

export default {
    title: 'Cre8 Components/CheckboxField',
    component: Cre8CheckboxField,
    parameters: {
        status: { type: 'inProgress' },
        controls: {
            exclude: new RegExp(`${excludeRegexArray.join('|')}|^fieldNoteKnockout$`),
        },
    },
};

export const Default: StoryObj<typeof Cre8CheckboxField> = {
    args: {
        label: 'Legend',
        fieldNote: 'This is a Field Note!',
        children: (
            <React.Fragment>
                <Cre8CheckboxFieldItem label="Default" />
                <Cre8CheckboxFieldItem label="Error" isError />
                <Cre8CheckboxFieldItem label="Disabled" disabled checked />
            </React.Fragment>
        ),
    },
};
