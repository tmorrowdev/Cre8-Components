import { html, nothing } from 'lit';
import './pagination';
import type { Meta, StoryObj } from '@storybook/web-components';
import { cre8Pagination } from './pagination';
import { withActions } from '@storybook/addon-actions/decorator';
import './page-counter/page-counter';


interface Props extends Pick<cre8Pagination, 'currentPage' | 'totalResults' | 'pageSize' | 'display' | 'visiblePages' | 'hideLastAndFirstButtons'> {
  currentPage: number,
  totalResults: number;
  pageSize: number;
  visiblePages: number;
  display: 'compact' | 'icon-only'| 'default',
  hideFirstAndLastButtons: boolean
}
type Story = StoryObj<Props>;

const meta: Meta= {
  title: 'cre8 Components/Pagination',
  component: 'cre8-pagination',
  args: {
    currentPage: 1,
    totalResults: 300,
    pageSize: 10,
    visiblePages: 5,
    display: 'default'
  },
  argTypes: {
    display: {
      options: ['compact', 'icon-only','range', 'default'],
      defaultValue: 'default',
      control: { type: 'select' }
    },
    hideLastAndFirstButtons: {
      control: { type: 'boolean' }
    }
  },
  parameters: {
    status: { type: 'inProgress' },
    actions: {
      handles: ['pagination.click','button.handleOnBlur', 'pagination.keydown'],
    },
    decorators: [withActions],
  },

  render: ({ currentPage, hideLastAndFirstButtons, totalResults, pageSize, display, visiblePages }) =>
    html`
    <cre8-pagination
      currentPage="${currentPage}"
      totalResults="${totalResults}"
      pageSize="${pageSize}"
      visiblePages="${visiblePages}"
      display="${display}"
      ?hideLastAndFirstButtons=${hideLastAndFirstButtons}
      @pagination.click="${(e: Event) => console.log(e)}"
      @pagination.keydown="${(e: Event) => console.log(e)}"
    ></cre8-pagination>
  `};
export default meta;

export const Default: Story = {
  args: {
    display: 'default',
    currentPage: 1,
    totalResults: 300,
    pageSize: 25
  }
};

export const Compact: Story = {
  args: {
    display: 'compact',
    currentPage: 1,
    totalResults: 43,
    pageSize: 10,
  }
}

export const IconOnly: Story = {
  args: {
    display: 'icon-only'
  }
}

export const HideFirstAndLastButtons: Story = {
  args: {
    display: 'default',
    currentPage: 1,
    totalResults: 300,
    pageSize: 25,
    hideLastAndFirstButtons: true
  }
}

