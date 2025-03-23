/* eslint-disable import/no-unresolved */
import svgCaretLeft from '@cre8/cre8-icons/lib/icons/System/Regular/Caret Left.svg?raw';
import svgCaretRight from '@cre8/cre8-icons/lib/icons/System/Regular/Caret Right.svg?raw';
import svgArrowRight from '@cre8/cre8-icons/lib/icons/System/Regular/Arrow - Right.svg?raw';
import { html } from 'lit';
import { spread } from '../../directives/spread';
import './danger-button';

const meta = {
  title: 'In Development/Danger Button',
  component: 'cre8-danger-button',
  render: (args) => html`<cre8-danger-button ${spread(args)}></cre8-danger-button>`,
  parameters: {
    status: {type: 'inProgress'},
    actions: {
      handles: ['click', 'submit'],
    },
  },
  argTypes: {
    ariaLive: { options: ['assertive', 'polite'], control: 'radio'},
    buttonAriaExpanded: {control: 'boolean'},
    disabled: {control: 'boolean'},
    fullWidth: {control: 'boolean'},
    hideText: {control: 'boolean'},
    svg: {control: 'text'},
    iconRotateDegree: {control: 'text'},
    iconPosition: {
      options: ['before', 'after'],
      control: { type: 'radio' }
    },
    inverted: {control: 'boolean'},
    loading: {control: 'boolean'},
    loadingComplete: {control: 'boolean'},
    text: {
      control: 'text'
    },
    href: {
      control: 'text'
    },
    size: {
      options: ['sm', 'lg'],
      control: { type: 'radio' }
    },
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'radio' }
    }
  },
  args: {
    text: 'Button',
    loading: undefined,
  }
};
export default meta;

export const Primary = {
  args: {
    text: 'Primary'
  }
};

/**
 * Button defaults to type of `button`. By passing `submit` to `type`, the button can submit form data.
 */
export const PrimarySubmit = {
  args: {
    type: 'submit',
    text: 'Submit'
  }
};

export const PrimaryDisabled = {
  args: {
    disabled: true,
    text: 'Button'
  }
};

export const PrimaryInverted = {
  args: {
    text: 'Primary',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryInvertedDisabled = {
  args: {
    text: 'Button',
    disabled: true,
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const IconBefore = {
  args: {
    svg: svgCaretLeft,
    iconPosition: 'before',
    text: 'Button'
  }
};

export const IconAfter  = {
  args: {
    svg: svgCaretRight,
    iconPosition: 'after',
    text: 'Button'
  }
};

export const Secondary = {
  args: {
    text: 'Button',
    variant: 'secondary'
  }
};

export const SecondaryInverted = {
  args: {
    text: 'Button',
    variant: 'secondary',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryDisabled = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'secondary'
  }
};

export const SecondaryDisabledInverted = {
  args: {
    text: 'Button',
    variant: 'secondary',
    inverted: true,
    disabled: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Tertiary = {
  args: {
    text: 'Button',
    variant: 'tertiary'
  }
};

export const TertiaryInverted = {
  args: {
    text: 'Button',
    variant: 'tertiary',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryDisabled = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'tertiary',
  }
};

export const TertiaryDisabledInverted = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'tertiary',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const FullWidth = {
  args: {
    fullWidth: true,
    text: 'Button',
  }
};

export const Small= {
  args: {
    size: 'sm',
    text: 'Button',
  }
};

export const SmallInverted= {
  args: {
    size: 'sm',
    text: 'Button',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SmallIconAfter= {
  args: {
    svg: svgCaretRight,
    iconPosition: 'after',
    size: 'sm',
    text: 'Button',
  }
};

export const Large = {
  args: {
    size: 'lg',
    text: 'Button',
  }
};

export const LargePrimaryInverted = {
  args: {
    size: 'lg',
    text: 'Button',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const LargeIconAfter= {
  args: {
    svg: svgCaretRight,
    iconPosition: 'after',
    size: 'lg',
    text: 'Button',
  }
};


/**
 * When implementing an icon only button, passing `hideText` will visually hide the button's text while still allowing
 * it to be read by accessibility devices.
 */

export const IconOnlyPrimary = {
  args: {
    hideText: true,
    svg: svgArrowRight,
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'primary'
  }
};

export const IconOnlyPrimaryInverted = {
  args: {
    hideText: true,
    svg: svgArrowRight,
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'primary',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const IconOnlySecondary = {
  args: {
    hideText: true,
    svg:  svgArrowRight,
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'secondary'
  }
};

export const IconOnlySecondaryInverted = {
  args: {
    hideText: true,
    svg:  svgArrowRight,
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'secondary',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const IconOnlyTertiary = {
  args: {
    hideText: true,
    svg: svgArrowRight,
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'tertiary'
  }
};

export const IconOnlyTertiaryInverted = {
  args: {
    hideText: true,
    inverted: true,
    svg: svgArrowRight,
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'tertiary'
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Loading = {
  args: {
    loading: true,
    text: 'Submit',
    variant: 'primary'
  }
};

export const LoadingComplete = {
  args: {
    loadingComplete: true,
    text: 'Submit',
    variant: 'primary'
  }
};