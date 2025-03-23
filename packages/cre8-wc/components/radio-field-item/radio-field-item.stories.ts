import { html } from 'lit';
import '../radio-field/radio-field';
import './radio-field-item';
import { spread } from '../../directives/spread';

export default {
    title: 'cre8 Components/Radio Field Item',
    component: 'cre8-radio-field-item',
    render: (args) => html`
        <cre8-radio-field>
            <cre8-radio-field-item ${spread(args)}></cre8-radio-field-item>
        </cre8-radio-field>
    `,
    parameters: {
        status: { type: 'inProgress' },
        actions: {
            handles: ['input', 'change', 'blur', 'click'],
        },
    },
    argTypes: {
        ariaDescribedBy: {
            control: 'text',
        },
        checked: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
        fieldId: {
            control: 'text',
        },
        fieldNote: {
            control: 'text',
        },
        fieldNoteIconName: {
            options: ['check', 'error'],
            control: { type: 'select' },
        },
        fieldNoteIsError: {
            control: 'boolean',
        },
        fieldNoteKnockout: {
            conntrol: 'boolean',
        },
        isError: {
            control: 'boolean',
        },
        isSuccess: {
            control: 'boolean',
        },
        label: {
            control: 'text',
        },
        name: {
            control: 'text',
        },
        required: {
            control: 'boolean',
        },
    },
};

export const Default = {
    args: {
        label: 'Default',
    },
};

export const Preselected = {
    args: {
        checked: 'true',
        label: 'Preselected',
    },
};

export const Required = {
    args: {
        checked: 'true',
        label: 'Required',
        required: 'true',
    },
};

export const RequiredError = {
    args: {
        checked: 'true',
        isError: 'true',
        label: 'Required Error',
        required: 'true',
    },
};

export const Error = {
    args: {
        checked: 'true',
        isError: 'true',
        label: 'Error',
    },
};

export const Disabled = {
    args: {
        disabled: 'true',
        label: 'Disabled',
    },
};

export const DefaultFieldNote = {
    args: {
        fieldNote: 'This is a default field note.',
        label: 'Default Field Note',
        ariaDescribedBy: 'fieldnote-message',
    },
};

export const SuccessFieldNote = {
    args: {
        fieldNote: 'This is a success field note.',
        fieldNoteIconName: 'check',
        isSuccess: 'true',
        label: 'Success Field Note',
        ariaDescribedBy: 'success-fieldnote-message',
    },
};

export const ErrorFieldNote = {
    args: {
        fieldNote: 'This is an error field note.',
        fieldNoteIconName: 'error',
        isError: 'true',
        label: 'Error Field Note',
        ariaDescribedBy: 'error-fieldnote-message',
    },
};

export const LongTitle = {
    args: {
        label: 'This could mayhaps be the longest title that has ever been put on a radio field ever!',
    },
};
