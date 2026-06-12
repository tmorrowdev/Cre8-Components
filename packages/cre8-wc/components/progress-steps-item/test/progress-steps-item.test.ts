import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../progress-steps-item';
import { Cre8ProgressStepsItem } from '../progress-steps-item';

describe('Cre8ProgressStepsItem', () => {
  it('should render', async () => {
    const el = await fixture<Cre8ProgressStepsItem>(
      html`<cre8-progress-steps-item></cre8-progress-steps-item>`
    );

    expect(el).not.toBeNull();
  });
});
