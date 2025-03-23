import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { cre8RadioField, cre8RadioFieldItem } from '../..';

export default {
    title: 'cre8 Components/Radio-Field',
    component: cre8RadioField,
    subcomponents: { cre8RadioFieldItem },
    render: (args) => <cre8RadioField { ...args } />,
    parameters: {
        status: { type: 'inProgress' },
        controls: {
            exclude: new RegExp(`${excludeRegexArray.join('|')}`),
        },
    },
    args: {
        ariaDescribedBy: undefined,
        fieldNote: undefined,
        fieldNoteIconName: undefined,
        fieldNoteKnockout: undefined,
        isError: undefined,
        isSuccess: undefined,
        label: 'Legend',
    },
};

export const Default: StoryObj<typeof cre8RadioField> = {
    args: {
        fieldNote: 'This is a field note.',
        children: (
            <React.Fragment>
                <cre8RadioFieldItem label="Default" />
                <cre8RadioFieldItem label="Default 2" />
                <cre8RadioFieldItem label="Error" isError />
            </React.Fragment>
        ),
    },
};

export const WithErrorFieldNote: StoryObj<typeof cre8RadioField> = {
    args: {
        fieldNote: 'Error Field Note!',
        fieldNoteIconName: 'error',
        isError: true,
        children: (
            <React.Fragment>
                <cre8RadioFieldItem
                    label="Default"
                />
                <cre8RadioFieldItem
                    label="Error"
                    isError
                />
                <cre8RadioFieldItem
                    label="Disabled"
                    disabled
                />
            </React.Fragment>
        ),
    },
};

export const WithSuccessFieldNote: StoryObj<typeof cre8RadioField> = {
    args: {
        fieldNote: 'Success Field Note!',
        fieldNoteIconName: 'success',
        isSuccess: true,
        children: (
            <React.Fragment>
                <cre8RadioFieldItem
                    label="Default"
                />
                <cre8RadioFieldItem
                    label="Error"
                    isError
                />
                <cre8RadioFieldItem
                    label="Disabled"
                    disabled
                />
            </React.Fragment>
        ),
    },
};

export const WithSuccessFieldNoteAndDefaultChecked: StoryObj<typeof cre8RadioField> = {
    args: {
        fieldNote: 'Success Field Note!',
        fieldNoteIconName: 'success',
        isSuccess: true,
        children: (
            <React.Fragment>
                <cre8RadioFieldItem
                    label="Default"
                />
                <cre8RadioFieldItem
                    label="Error"
                    isError
                />
                <cre8RadioFieldItem
                    label="Success"
                    checked={true}
                />
            </React.Fragment>
        ),
    },
};