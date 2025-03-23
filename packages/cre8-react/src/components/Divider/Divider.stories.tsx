import React from 'react';
import type { StoryObj } from '@storybook/react';
import { cre8Divider } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

interface invertedStyle {
  style: React.CSSProperties;
}
const inverted: invertedStyle = {
    style: {
        background: 'var(--cre8-color-bg-brand-strong)',
        padding: '20px',
        color: 'var(--cre8-color-content-knockout)',
    },
};

export default {
    title: 'cre8 Components/Divider',
    component: cre8Divider,
    parameters: {
        status: { type: 'inProgress' },
        controls: {
            exclude: new RegExp(`${excludeRegexArray.join('|')}`),
        },
    },
    argTypes: {
        status: {
            options: ['default', 'brand', 'knockout'],
            control: { type: 'select' },
        },
        variant: {
            options: ['horizontal', 'vertical'],
            control: { type: 'select' },
        },
    },
};

export const Default: StoryObj<typeof React.JSX> = {
    args: {
        variant: 'horizontal',
    },
};

export const Horizontal: StoryObj<typeof React.JSX> = {
    args: {
        variant: 'horizontal',
    },
    render: (args) => (
        <React.Fragment>
            <p>Lorem ipsum dolor sit amet</p>
            <cre8Divider variant={ args.variant } />
            <p>Agam utroque scribentur eos id</p>
        </React.Fragment>
    ),
};

export const BrandHorizontal: StoryObj<typeof React.JSX> = {
    args: {
        variant: 'horizontal',
        status: 'brand',
    },
    render: (args) => (
        <React.Fragment>
            <p>Lorem ipsum dolor sit amet</p>
            <cre8Divider variant={ args.variant } status={ args.status } />
            <p>Agam utroque scribentur eos id</p>
        </React.Fragment>
    ),
};

// noinspection TypeScriptValidateTypes
export const KnockoutHorizontal : StoryObj<typeof React.JSX> = {
    args: {
        variant: 'horizontal',
        status: 'knockout',
    },
    render: (args) => (
        <div style={ inverted.style }>
            <p>Lorem ipsum dolor sit amet</p>
            <cre8Divider variant={ args.variant } status={ args.status } />
            <p>Agam utroque scribentur eos id</p>
        </div>
    ),
};

export const HorizontalInFlowContainer: StoryObj<typeof React.JSX> = {
    args: {
        variant: 'horizontal',
    },
    render: (args) => (
        <React.Fragment>
            <p>
                Lorem ipsum dolor sit amet, discere evertitur adolescens ea vis, vim ad veniam labitur, ex dicat
                iudicabit delicatissimi cum. Ne sit dicat dolorum reformidans, an ius viris constituto. Mei id verterem
                ullamcorper, ad sit graece utamur quaerendum. Erant adversarium sea ex. Nostrum fabellas referrentur has
                in, qui duis omnis dolores ne.
            </p>
            <cre8Divider variant={ args.variant } />
            <p>
                Agam utroque scribentur eos id, ex dolore accumsan similique duo, vel cu putant vocent singulis. Habeo
                aeterno prompta an quo, duo natum maluisset no. Ex sint perpetua eum, mutat voluptaria comprehensam per
                ea, dicant mandamus eos ei. Sit ipsum tation neglegentur at. His platonem intellegam vituperatoribus ea,
                in molestie accusata per. Eius vituperatoribus cu mel. Nec regione minimum ut, volumus delicata duo ne.
            </p>

        </React.Fragment>
    ),
};

export const Vertical: StoryObj<typeof React.JSX> = {
    args: {
        variant: 'vertical',
    },
    render: (args) => (
        <div style={ { display: 'flex' } }>
            <p>Lorem ipsum dolor sit amet</p>
            <cre8Divider variant={ args.variant } />
            <p>Agam utroque scribentur eos id</p>
        </div>
    ),
};

export const VerticalInFlowContainer: StoryObj<typeof React.JSX> = {
    args: {
        variant: 'vertical',
    },
    render: (args) => (
        <div style={ { display: 'flex' } }>
            <p>
                Lorem ipsum dolor sit amet, discere evertitur adolescens ea vis, vim ad veniam labitur, ex dicat
                iudicabit delicatissimi cum. Ne sit dicat dolorum reformidans, an ius viris constituto. Mei id verterem
                ullamcorper, ad sit graece utamur quaerendum. Erant adversarium sea ex. Nostrum fabellas referrentur has
                in, qui duis omnis dolores ne.
            </p>
            <cre8Divider variant={ args.variant } />
            <p>
                Agam utroque scribentur eos id, ex dolore accumsan similique duo, vel cu putant vocent singulis. Habeo
                aeterno prompta an quo, duo natum maluisset no. Ex sint perpetua eum, mutat voluptaria comprehensam per
                ea, dicant mandamus eos ei. Sit ipsum tation neglegentur at. His platonem intellegam vituperatoribus ea,
                in molestie accusata per. Eius vituperatoribus cu mel. Nec regione minimum ut, volumus delicata duo ne.
            </p>
        </div>
    ),
};
