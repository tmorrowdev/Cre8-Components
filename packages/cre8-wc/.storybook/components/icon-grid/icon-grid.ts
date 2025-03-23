import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './icon-grid.scss';
import '../../../components/icon/icon';

@customElement('icon-grid')
export class IconGrid extends LitElement {
  static get styles() {
    return unsafeCSS(styles);
  }

  ALL_ICONS = require
    .context('../../../icons', false, /\.svg$/)
    .keys()
    .map((path) => ({ name: path.match(/([\w\s-]*)\.svg$/)[1] }));

  renderIconList() {
    return this.ALL_ICONS.map((item) => {
      return html`<li class="icon-grid__item">
        <cre8-icon-legacy name="${item.name}"></cre8-icon-legacy>
        <span class="icon-grid__text">${item.name}</span>
      </li>`;
    });
  }

  render() {
    return html`
      cre8-icon-legacy has been <strong>deprecated</strong> in Web Components v0.5.0
      <p><a href="https://www.figma.com/file/j1a0rBkoH65XiGKfq7ppWa/Iconography?type=design&node-id=2037-5773&mode=design&t=6ZzC6KH3Gkxf3fj5-4">
      List of new figma icons</a></p>
      <p>The cre8 Icon Library below will be deprecated. It will be replace by 
      <a href="https://static-dev.esi-memberweb-dev.aws.evernorthcloud.com/cre8-icons/">Design System Icons</a>, 
      which is an official icon set that is approved for use by Design.</p>
      <ul class="icon-grid">
        ${this.renderIconList()}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'icon-grid': IconGrid;
  }
}
