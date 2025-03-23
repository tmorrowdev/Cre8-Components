import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { cre8CheckboxField, cre8CheckboxFieldItem } from '../..';

export default {
    title: 'cre8 Components/CheckboxField',
    component: cre8CheckboxField,
    parameters: {
        status: { type: 'inProgress' },
        controls: {
            exclude: new RegExp(`${excludeRegexArray.join('|')}|^fieldNoteKnockout$`),
        },
    },
};

export const Default: StoryObj<typeof cre8CheckboxField> = {
    args: {
        label: 'Legend',
        fieldNote: 'This is a Field Note!',
        children: (
            <React.Fragment>
                <cre8CheckboxFieldItem label="Default" />
                <cre8CheckboxFieldItem label="Error" isError />
                <cre8CheckboxFieldItem label="Disabled" disabled checked />
            </React.Fragment>
        ),
    },
};
