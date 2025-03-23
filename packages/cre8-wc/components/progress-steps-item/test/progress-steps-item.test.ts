import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../progress-steps-item';
import { cre8ProgressStepsItem } from '../progress-steps-item';

describe('cre8ProgressStepsItem', () => {
  it('should render', async () => {
    const el = await fixture<cre8ProgressStepsItem>(
      html`<cre8-progress-steps-item></cre8-progress-steps-item>`
    );

    expect(el).not.toBeNull();
  });
});
