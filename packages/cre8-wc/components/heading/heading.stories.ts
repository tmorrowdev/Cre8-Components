import {html} from 'lit';
import {spread} from '../../directives/spread';
import './heading';

export default {
  title: 'cre8 Components/Heading',
  component: 'cre8-heading',
  parameters: {status: {type: 'inProgress'}},
  render: (args) => html`<cre8-heading ${spread(args)}>Heading</cre8-heading>`,
  argTypes: {
    type: {
      options: [
        'display-default',
        'display-small',
        'headline-large',
        'headline-default',
        'headline-small',
        'title-xlarge',
        'title-large',
        'title-default',
        'title-small',
        'label-large',
        'label-default',
        'label-small',
        'meta-large',
        'meta-default',
        'meta-small',
      ],
      control: {type: 'radio'},
    },
    tagVariant: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: {type: 'radio'},
    },
    brandColor: {
      control: {type: 'boolean'},
    },
    inverted: {
      control: {type: 'boolean'},
    },
  },
};

export const Default = {};

export const DisplayDefault = {
  args: {
    type: 'display-default',
  }
};

export const DisplaySmall = {
  args: {
    type: 'display-small',
  }
};

export const HeadlineLarge = {
  args: {
    type: 'headline-large',
  }
};

export const HeadlineDefault = {
  args: {
    type: 'headline-default',
  }
};

export const HeadlineSmall = {
  args: {
    type: 'headline-small',
  }
};

export const TitleXLarge = {
  args: {
    type: 'title-xlarge',
  }
};

export const TitleLarge = {
  args: {
    type: 'title-large',
  }
};

export const TitleDefault = {
  args: {
    type: 'title-default',
  }
};

export const TitleSmall = {
  args: {
    type: 'title-small',
  }
};

export const LabelLarge = {
  args: {
    type: 'label-large',
  }
};

export const LabelDefault = {
  args: {
    type: 'label-default',
  }
};

export const LabelSmall = {
  args: {
    type: 'label-small',
  }
};

export const MetaLarge = {
  args: {
    type: 'meta-large',
  }
};

export const MetaDefault = {
  args: {
    type: 'meta-default',
  }
};

export const MetaSmall = {
  args: {
    type: 'meta-small',
  }
};

export const h1 = {
  args: {
    tagVariant: 'h1',
  }
};

export const h2 = {
  args: {
    tagVariant: 'h2',
  }
};

export const h3 = {
  args: {
    tagVariant: 'h3',
  }
};

export const h4 = {
  args: {
    tagVariant: 'h4',
  }
};

export const h5 = {
  args: {
    tagVariant: 'h5',
  }
};

export const h6 = {
  args: {
    tagVariant: 'h6',
  }
};

export const BrandColor = {
  args: {
    brandColor: true,
  }
};

export const Inverted = {
  render: (args) => html`<div style="padding: 20px; background: #000;">
    <cre8-heading ${spread(args)} ?inverted=${true}>Heading style for dark backgrounds</cre8-heading>
  </div>`,
};

export const InvertedBrandColor = {
  render: (args) => html`<div style="padding: 20px; background: #000;">
    <cre8-heading ${spread(args)}  ?brandColor=${true} ?inverted=${true}>Heading with brand color for dark backgrounds</cre8-heading>
  </div>`,
};

