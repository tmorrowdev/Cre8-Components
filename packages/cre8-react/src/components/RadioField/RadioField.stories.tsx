import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { Cre8RadioField, Cre8RadioFieldItem } from '../..';

export default {
    title: 'Cre8 Components/Radio-Field',
    component: Cre8RadioField,
    subcomponents: { Cre8RadioFieldItem },
    render: (args) => <Cre8RadioField { ...args } />,
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

export const Default: StoryObj<typeof Cre8RadioField> = {
    args: {
        fieldNote: 'This is a field note.',
        children: (
            <React.Fragment>
                <Cre8RadioFieldItem label="Default" />
                <Cre8RadioFieldItem label="Default 2" />
                <Cre8RadioFieldItem label="Error" isError />
            </React.Fragment>
        ),
    },
};

export const WithErrorFieldNote: StoryObj<typeof Cre8RadioField> = {
    args: {
        fieldNote: 'Error Field Note!',
        fieldNoteIconName: 'error',
        isError: true,
        children: (
            <React.Fragment>
                <Cre8RadioFieldItem
                    label="Default"
                />
                <Cre8RadioFieldItem
                    label="Error"
                    isError
                />
                <Cre8RadioFieldItem
                    label="Disabled"
                    disabled
                />
            </React.Fragment>
        ),
    },
};

export const WithSuccessFieldNote: StoryObj<typeof Cre8RadioField> = {
    args: {
        fieldNote: 'Success Field Note!',
        fieldNoteIconName: 'success',
        isSuccess: true,
        children: (
            <React.Fragment>
                <Cre8RadioFieldItem
                    label="Default"
                />
                <Cre8RadioFieldItem
                    label="Error"
                    isError
                />
                <Cre8RadioFieldItem
                    label="Disabled"
                    disabled
                />
            </React.Fragment>
        ),
    },
};

export const WithSuccessFieldNoteAndDefaultChecked: StoryObj<typeof Cre8RadioField> = {
    args: {
        fieldNote: 'Success Field Note!',
        fieldNoteIconName: 'success',
        isSuccess: true,
        children: (
            <React.Fragment>
                <Cre8RadioFieldItem
                    label="Default"
                />
                <Cre8RadioFieldItem
                    label="Error"
                    isError
                />
                <Cre8RadioFieldItem
                    label="Success"
                    checked={true}
                />
            </React.Fragment>
        ),
    },
};