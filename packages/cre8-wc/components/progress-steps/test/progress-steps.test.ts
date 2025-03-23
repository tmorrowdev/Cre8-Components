import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../progress-steps';
import { cre8ProgressSteps } from '../progress-steps';
import '../../progress-steps-item/progress-steps-item';
import svgCheckCircle from '@cre8/cre8-icons/lib/icons/System/Filled/Check.svg?raw';
import svgFilledCircleTwo from '@cre8/cre8-icons/lib/icons/System/Filled/Circle Two.svg?raw';
import svgRegularCircleThree from '@cre8/cre8-icons/lib/icons/System/Regular/Circle Three.svg?raw';

describe('cre8ProgressSteps', () => {
  it('container should render', async () => {
    const el = await fixture<cre8ProgressSteps>(
      html`<cre8-progress-steps></cre8-progress-steps>`
    );

    expect(el).not.toBeNull();
  });
  it('container with items should render correctly', async () => {
    const el = await fixture<cre8ProgressSteps>(
      html`<cre8-progress-steps>
        <cre8-progress-steps-item></cre8-progress-steps-item>
        <cre8-progress-steps-item></cre8-progress-steps-item>
        <cre8-progress-steps-item></cre8-progress-steps-item>
      </cre8-progress-steps>`
    );
    expect(el).not.toBeNull();
  });

  it('container with items should be accessible', async () => {
    const el = await fixture<cre8ProgressSteps>(
      html`<cre8-progress-steps>
        <cre8-progress-steps-item svg="${svgCheckCircle}" message="I am a long message so that we can see what that looks like in an example with three steps" name="Step 1 of a Total of 3 Steps" state="complete"></cre8-progress-steps-item>
        <cre8-progress-steps-item svg="${svgFilledCircleTwo}" message="I am a long message so that we can see what that looks like in an example with three steps" name="Step 2 of a Total of 3 Steps" state="current"></cre8-progress-steps-item>
        <cre8-progress-steps-item svg="${svgRegularCircleThree}" message="I am a long message so that we can see what that looks like in an example with three steps" name="Step 3 of a Total of 3 Steps" state="incomplete"></cre8-progress-steps-item>
      </cre8-progress-steps>`
    );
    expect(el).toBeAccessible();
  });
});
