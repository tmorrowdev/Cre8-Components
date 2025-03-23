import { html } from 'lit';
import { spread } from '../../directives/spread';
import './inline-alert';

export default {
    title: 'cre8 Components/Inline Alert',
    component: 'cre8-inline-alert',
    render: ({ slot, ...args }) => html`<cre8-inline-alert ${spread(args)}>${slot}</cre8-inline-alert>`,
    parameters: { status: { type: 'beta' } },
    argTypes: {
        iconName: { control: 'text' }, // iconName will be deprecated
        iconTitle: { control: 'text' },
        variant: { options: ['subtle', 'transparent'], control: { type: 'radio' } },
        status: {
            options: ['default', 'error', 'warning', 'success', 'attention', 'neutral'],
            control: { type: 'select' },
        },
        fullWidth: { control: 'boolean' },
    },
    args: {
        status: undefined,
        variant: undefined,
    },
};

export const Default = {
    args: {
        status: 'info',
        slot: 'In-line DEFAULT lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    },
};

export const FullWidthTitleSmall = {
    args: {
        status: 'info',
        fullWidth: true,
        slot: html`<cre8-heading type="title-small">Full Width Title Small</cre8-heading>`,
    },
};

export const Error = {
    args: {
        slot: 'In-line ERROR lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        status: 'error',
        iconTitle: 'Error Message',
    },
};

export const Warning = {
    args: {
        status: 'warning',
        iconTitle: 'Warning Alert',
        slot: 'In-line WARNING lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    },
};

export const Success = {
    args: {
        status: 'success',
        iconTitle: 'Confirmation Message',
        slot: 'In-line SUCCESS lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    },
};

export const Help = {
    args: {
        status: 'help',
        iconTitle: 'Helpful Message',
        slot: 'In-line HELP lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    },
};

export const Info = {
    args: {
        status: 'info',
        iconTitle: 'Important Information',
        slot: 'In-line INFO lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    },
};

/**
* **Note** Certain brands don't currently use the `Attention` status
*
*/

export const Attention = {
    args: {
        status: 'attention',
        iconTitle: 'Attention Notice',
        slot: 'In-line ATTENTION lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    },
};

export const Neutral = {
    args: {
        status: 'neutral',
        slot: 'In-line NEUTRAL lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    },
};

export const TransparentError = {
    args: {
        variant: 'transparent',
        status: 'error',
        iconTitle: 'Transparent Alert Error Message',
        slot: 'In-line ERROR lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    },
};

export const TransparentWarning = {
    args: {
        variant: 'transparent',
        status: 'warning',
        iconTitle: 'Transparent Alert Warning Message',
        slot: 'In-line WARNING lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    },
};

export const TransparentSuccess = {
    args: {
        variant: 'transparent',
        status: 'success',
        iconTitle: 'Transparent Alert Confirmation Message',
        slot: 'In-line SUCCESS lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    },
};

export const TransparentHelp = {
    args: {
        status: 'help',
        variant: 'transparent',
        iconTitle: 'Transparent Alert Helpful Message',
        slot: 'In-line HELP lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    },
};

export const TransparentInfo = {
    args: {
        status: 'info',
        variant: 'transparent',
        iconTitle: 'Transparent Alert Important Information',
        slot: 'In-line INFO lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    },
};

/**
* **Note** Certain brands don't currently use the `Attention` status
*
*/

export const TransparentAttention = {
    args: {
        variant: 'transparent',
        status: 'attention',
        iconTitle: 'Transparent Alert Attention Notice',
        slot: 'In-line ATTENTION lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    },
};

export const TransparentNeutral = {
    args: {
        variant: 'transparent',
        status: 'neutral',
        slot: 'In-line NEUTRAL lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    },
};
