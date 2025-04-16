import type { StoryObj } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { excludeRegexArray } from '../../../.storybook/preview';
import { Cre8RadioFieldItem } from '../..';
import { Cre8RadioField } from '../RadioField/RadioField';

export default {
    title: 'Cre8 Components/Radio-Field Item',
    component: Cre8RadioFieldItem,
    parameters: {
        status: { type: 'inProgress' },
        controls: {
            exclude: new RegExp(`${excludeRegexArray.join('|')}`),
        },
    },
    render: (args) => (
        <Cre8RadioField>
            <Cre8RadioFieldItem { ...args } />
        </Cre8RadioField>
    ),
    args: {
        name: 'radio-name',
        value: 'radio-value',
        onChange: action('input'),
        onBlur: action('blur'),
    },
};

export const Default: StoryObj<typeof Cre8RadioFieldItem> = {
    args: {
        label: 'Label',
    },
};

export const Preselected: StoryObj<typeof Cre8RadioFieldItem> = {
    args: {
        label: 'Label',
        checked: true,
    },
};

export const Required: StoryObj<typeof Cre8RadioFieldItem> = {
    args: {
        label: 'Label',
        checked: true,
        required: true,
    },
};

export const RequiredError: StoryObj<typeof Cre8RadioFieldItem> = {
    args: {
        label: 'Label',
        isError: true,
        required: true,
    },
};

export const Error: StoryObj<typeof Cre8RadioFieldItem> = {
    args: {
        label: 'Label',
        checked: true,
        isError: true,
    },
};

export const Disabled: StoryObj<typeof Cre8RadioFieldItem> = {
    args: {
        label: 'Label',
        checked: true,
        disabled: true,
    },
};

export const DefaultFieldNote: StoryObj<typeof Cre8RadioFieldItem> = {
    args: {
        label: 'Label',
        fieldNote: 'This is a field note.',
        ariaDescribedBy: 'fieldnote-message',
    },
};

export const SuccessFieldNote: StoryObj<typeof Cre8RadioFieldItem> = {
    args: {
        label: 'Label',
        fieldNote: 'This is a field note.',
        fieldNoteIconName: 'check',
        isSuccess: true,
        ariaDescribedBy: 'success-fieldnote-message',
    },
};

export const ErrorFieldNote: StoryObj<typeof Cre8RadioFieldItem> = {
    args: {
        label: 'Label',
        fieldNote: 'This is an error field note.',
        fieldNoteIconName: 'error',
        isError: true,
        ariaDescribedBy: 'error-fieldnote-message',
    },
};

export const LongTitle: StoryObj<typeof Cre8RadioFieldItem> = {
    args: {
        label: 'This could mayhaps be the longest title that has ever been put on a radio field ever!',
    },
};
