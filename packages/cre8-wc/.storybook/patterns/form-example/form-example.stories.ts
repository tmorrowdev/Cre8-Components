import {html} from 'lit';
import './form-example';
import { action } from '@storybook/addon-actions';
import { withActions } from '@storybook/addon-actions/decorator';

export default {
  title: 'Examples/Form Example',
  component: 'form-example',
  parameters: {
    actions: {
      handles: ['submit'],
    },
    status: {type: 'inProgress'}
  },
  decorators: [withActions],
};

const items = {};

export const Default = (args) => html`
  <iframe name="dummyframe" id="dummyframe" style="display:none" }></iframe>
  <form id="form-example" action="#" target="dummyframe">
    <cre8-field class="cre8-u-display-block cre8-u-margin-bottom-lg" name="name" label="Enter your name"></cre8-field>
    <cre8-field class="cre8-u-display-block cre8-u-margin-bottom-lg" name="textfield2" value="Council of Ricks" label="cre8 team"></cre8-field>
    <cre8-checkbox-field class="cre8-u-display-block cre8-u-margin-bottom-lg" label="Checkbox field">
      <cre8-checkbox-field-item name="checkbox-example" value="1" label="Checkbox field item 1"></cre8-checkbox-field-item>
      <cre8-checkbox-field-item name="checkbox-example" value="2" label="Checkbox field item 2" checked></cre8-checkbox-field-item>
      <cre8-checkbox-field-item name="checkbox-example" value="3" label="Checkbox field item 3"></cre8-checkbox-field-item>
    </cre8-checkbox-field>
    <cre8-radio-field class="cre8-u-display-block cre8-u-margin-bottom-lg" label="radio-field">
      <cre8-radio-field-item name="radio-example" label="On" value="on"></cre8-radio-field-item>
      <cre8-radio-field-item name="radio-example" label="Off" value="off"></cre8-radio-field-item>
    </cre8-radio-field>
    <cre8-select class="cre8-u-display-block cre8-u-margin-bottom-lg" .items=${items} name="select" fieldNote="This is a field note."></cre8-select>
    <cre8-button-group>
      <cre8-button text="Submit" type="submit"></cre8-button>
      <cre8-button text="Reset" type="reset"></cre8-button>
    </cre8-button-group>
  </form>
`
