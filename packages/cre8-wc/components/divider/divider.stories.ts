import { html } from 'lit';
import { spread } from '../../directives/spread';
import './divider';

export default {
    title: 'cre8 Components/Divider',
    component: 'cre8-divider',
    parameters: { status: { type: 'inProgress' } },
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
    args: {
        variant: 'horizontal',
        status: 'default',
    },
    render: (args) => html`<cre8-divider variant=${args.variant} status=${args.status}></cre8-divider>`,
};

export const Default = {
    args: {
        variant: 'horizontal',
    },
};

export const Horizontal = {
    args: {
        variant: 'horizontal',
    },
    render: (args) => html`<p>Lorem ipsum dolor sit amet</p><cre8-divider ${spread(args)}></cre8-divider><p>Agam utroque scribentur eos id</p>`,
};

export const BrandHorizontal = {
    args: {
        variant: 'horizontal',
        status: 'brand',
    },
    render: (args) => html`<p>Lorem ipsum dolor sit amet</p><cre8-divider ${spread(args)}></cre8-divider><p>Agam utroque scribentur eos id</p>`,
};

export const KnockoutHorizontal = {
    args: {
        variant: 'horizontal',
        status: 'knockout',
    },
    render: (args) => html`
  <div style="padding: 20px; background: var(--cre8-color-bg-brand-strong); color: var(--cre8-color-content-knockout);">
    <p>Lorem ipsum dolor sit amet</p><cre8-divider ${spread(args)}></cre8-divider><p>Agam utroque scribentur eos id</p>
  </div>`,
};

export const HorizontalInFlowContainer = {
    args: {
        variant: 'horizontal',
    },
    render: (args) => html`
  <div>
    <p>Lorem ipsum dolor sit amet, discere evertitur adolescens ea vis, vim ad veniam labitur, ex dicat iudicabit delicatissimi cum. Ne sit dicat dolorum reformidans, an ius viris constituto. Mei id verterem ullamcorper, ad sit graece utamur quaerendum. Erant adversarium sea ex. Nostrum fabellas referrentur has in, qui duis omnis dolores ne.</p><cre8-divider ${spread(args)}></cre8-divider><p>Agam utroque scribentur eos id, ex dolore accumsan similique duo, vel cu putant vocent singulis. Habeo aeterno prompta an quo, duo natum maluisset no. Ex sint perpetua eum, mutat voluptaria comprehensam per ea, dicant mandamus eos ei. Sit ipsum tation neglegentur at. His platonem intellegam vituperatoribus ea, in molestie accusata per. Eius vituperatoribus cu mel. Nec regione minimum ut, volumus delicata duo ne.</p>
  </div>`,
};

export const Vertical = {
    args: {
        variant: 'vertical',
    },
    render: (args) => html`
  <div style="display: flex; width: fit-content;">
    <p>Lorem ipsum dolor sit amet</p><cre8-divider ${spread(args)}></cre8-divider><p>Agam utroque scribentur eos id</p>
  </div>`,
};

export const VerticalInFlowContainer = {
    args: {
        variant: 'vertical',
    },
    render: (args) => html`
  <div style="display: flex;">
    <p>Lorem ipsum dolor sit amet, discere evertitur adolescens ea vis, vim ad veniam labitur, ex dicat iudicabit delicatissimi cum. Ne sit dicat dolorum reformidans, an ius viris constituto. Mei id verterem ullamcorper, ad sit graece utamur quaerendum. Erant adversarium sea ex. Nostrum fabellas referrentur has in, qui duis omnis dolores ne.</p><cre8-divider ${spread(args)}></cre8-divider><p>Agam utroque scribentur eos id, ex dolore accumsan similique duo, vel cu putant vocent singulis. Habeo aeterno prompta an quo, duo natum maluisset no. Ex sint perpetua eum, mutat voluptaria comprehensam per ea, dicant mandamus eos ei. Sit ipsum tation neglegentur at. His platonem intellegam vituperatoribus ea, in molestie accusata per. Eius vituperatoribus cu mel. Nec regione minimum ut, volumus delicata duo ne.</p>
  </div>`,
};
