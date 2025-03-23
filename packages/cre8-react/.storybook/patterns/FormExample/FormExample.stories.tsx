import * as React from "react";
import {
  cre8Button,
  cre8ButtonGroup,
  cre8CheckboxField,
  cre8CheckboxFieldItem,
  cre8Field,
  cre8RadioField,
  cre8RadioFieldItem
} from "../../../src";
import { withActions } from '@storybook/addon-actions/decorator';

export default {
  title: 'Examples/Form Example',
  component: 'FormExample',
  parameters: {
    actions: { handles: ['submit'], },
    status: {type: 'inProgress'}
  },
  decorators: [withActions],
};

export const Default = (args) => {
  return <>
    <iframe name={'dummyframe'} id={'dummyframe'} style={ {'display':'none'} }></iframe>
    <form id={'form-example'} action={'#'} target={'dummyframe'}>
      <cre8Field label={'Enter your name'} name={'name'} className={'cre8-u-display-block cre8-u-margin-bottom-lg'}/>
      <cre8Field label={'cre8 Team'} name={'team'} className={'cre8-u-display-block cre8-u-margin-bottom-lg'}/>
      <cre8CheckboxField label={'Checkbox field'} className={'cre8-u-display-block cre8-u-margin-bottom-lg'}>
        <cre8CheckboxFieldItem
          label={'Checkbox field item 1'}
          name={'checkbox-example'}
          value={'1'}
        />
        <cre8CheckboxFieldItem
          label={'Checkbox field item 2'}
          name={'checkbox-example'}
          value={'2'}
        />
        <cre8CheckboxFieldItem
          label={'Checkbox field item 3'}
          name={'checkbox-example'}
          value={'3'}/>
      </cre8CheckboxField>
      <cre8RadioField className={'cre8-u-display-block cre8-u-margin-bottom-lg'} label={'Radio field'}>
        <cre8RadioFieldItem
          label={'On'}
          name={'radio-example'}
          value={'on'}
        />
        <cre8RadioFieldItem
          label={'Off'}
          name={'radio-example'}
          value={'off'}
        />
      </cre8RadioField>
      <cre8ButtonGroup>
        <cre8Button text={'Submit'} type={'submit'}/>
        <cre8Button text={'Reset'} type={'reset'}/>
      </cre8ButtonGroup>
    </form>
  </>
};
