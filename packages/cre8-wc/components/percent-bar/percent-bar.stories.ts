import { html } from 'lit';
import { spread } from '../../directives/spread';
import './percent-bar';
import '../link/link';

const meta = {
    title: 'In Development/Percent Bar',
    component: 'cre8-percent-bar',
    render: (args) => html`<cre8-percent-bar ${spread(args)}></cre8-percent-bar>`,
    parameters: {
        status: { type: 'inProgress' },
        actions: {
            handles: ['dropdown-item-selected'],
        },
    },
    argTypes: {
        max: { control: 'number' },
        value: { control: 'number' },
    },
};
export default meta;

export const Default = {
    args: {
        value: '2',
        max: '10',
    },
};

export const tenPercent = {
    args: {
        value: '1',
        max: '10',
    },
};

export const thirtyThreePercent = {
    args: {
        value: '1',
        max: '3',
    },
};

export const fiftyPercent = {
    args: {
        value: '5',
        max: '10',
    },
};

export const oneHundredPercent = {
    args: {
        value: '10',
        max: '10',
    },
};

export const disableActionLeft = {
    args: {
        value: '2',
        max: '10',
        disableActionLeft: true,
    },
};
