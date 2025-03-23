import {html} from 'lit';
import './sample-modal';

export default {
  title: 'Examples/Sample Modal',
  component: 'sample-modal',
  parameters: {
    docs: {
      story: {
        height: '300px',
      },
    },
    status: {type: 'beta'},
  },
};

export const Default = (args) => html`<sample-modal></sample-modal>`;

export const Error = (args) => html`<sample-modal status="error"></sample-modal>`;

export const Warning = (args) => html`<sample-modal status="warning"></sample-modal>`;

export const Success = (args) => html`<sample-modal status="success"></sample-modal>`;

export const Info = (args) => html`<sample-modal status="info"></sample-modal>`;

export const Help = (args) => html`<sample-modal status="help"></sample-modal>`;

export const NotDismissible = (args) => html`<sample-modal notDismissible="${true}"></sample-modal>`;

export const LongPageHieght = (args) => html`<sample-modal></sample-modal>
  <p style="max-width: 400px;">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hendrerit gravida
    rutrum quisque non tellus orci ac auctor. Euismod nisi porta lorem mollis aliquam ut porttitor. Diam vel quam elementum pulvinar etiam non. Netus
    et malesuada fames ac turpis. Tristique senectus et netus et. Massa tincidunt dui ut ornare lectus sit amet. Placerat orci nulla pellentesque
    dignissim enim. Turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie. Nunc sed id semper risus in. Tristique magna sit amet
    purus gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus. Aenean vel elit scelerisque mauris pellentesque pulvinar
    pellentesque habitant morbi. Sem viverra aliquet eget sit. Egestas pretium aenean pharetra magna ac. Sed euismod nisi porta lorem mollis aliquam
    ut. Sem integer vitae justo eget. Dictumst quisque sagittis purus sit. Amet volutpat consequat mauris nunc congue nisi vitae suscipit. Id donec
    ultrices tincidunt arcu. Neque vitae tempus quam pellentesque nec nam aliquam. Auctor elit sed vulputate mi sit amet. Gravida dictum fusce ut
    placerat orci nulla pellentesque dignissim enim. Aliquam ultrices sagittis orci a scelerisque purus. Id diam vel quam elementum pulvinar etiam.
  </p>`;
