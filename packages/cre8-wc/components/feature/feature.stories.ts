import { html } from 'lit';
import { spread } from '../../directives/spread';
import '../heading/heading';
import '../text-passage/text-passage';
import './feature';

export default {
  title: 'Cre8 Components/Feature',
  component: 'cre8-feature',
  parameters: { status: { type: 'notStarted' } }
};

export const Default = (args) => html`
  <cre8-feature ${spread(args)} imgSrc="https://via.placeholder.com/600x400.png" imgAlt="Placeholder Text">
    <cre8-heading headingTagName="h2">Feature Title</cre8-heading>
    <cre8-text-passage>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </cre8-text-passage>
  </cre8-feature>
`;

export const Inverted = () => html`
  <div style="background: #000; padding: 1rem;">
    <cre8-feature ?inverted=${true} imgSrc="https://via.placeholder.com/600x400.png" imgAlt="Placeholder Text">
      <cre8-heading headingTagName="h2">Feature Title</cre8-heading>
      <cre8-text-passage>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </cre8-text-passage>
    </cre8-feature>
  </div>
`;
