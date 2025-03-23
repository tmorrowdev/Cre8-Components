import { html } from 'lit';
import { spread } from '../../directives/spread';
import './skeleton-loader';

export default {
    title: 'cre8 Components/Skeleton Loader',
    component: 'cre8-skeleton-loader',
    render: (args) => html`<cre8-skeleton-loader ${spread(args)}></cre8-skeleton-loader>`,
    parameters: {
        status: {
            type: 'inProgress',
        },
    },
    argTypes: {
        variant: {
            options: ['rectangle', 'square', 'circle'],
            control: { type: 'radio' },
        },
    },
};

export const Default = {};

export const Rectangle = {
    args: {
        variant: 'rectangle',
    },
};

export const Square = {
    args: {
        variant: 'square',
    },
};

export const Circle = {
    args: {
        variant: 'circle',
    },
};

export const CustomHeightWidth = {
    args: {
        height: '20px',
        width: '300px',
    },
};

export const CustomHeight = {
    args: {
        height: '100px',
    },
};

export const CustomWidth = {
    args: {
        width: '100px',
    },
};
