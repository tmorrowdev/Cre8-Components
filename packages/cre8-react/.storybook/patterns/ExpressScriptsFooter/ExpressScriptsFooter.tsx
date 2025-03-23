import '!style-loader!css-loader!sass-loader!./ExpressScriptsFooter.scss';
import classnames from 'classnames';
import * as React from 'react';
import { cre8Footer } from '../../../src';

export interface ExpressScriptsFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * CSS class names that can be appended to the component.
   */
  styleModifier?: string;
}

/**
 * Primary UI component for user interaction
 */
export const ExpressScriptsFooter = ({ styleModifier, ...other }: ExpressScriptsFooterProps) => {
  const componentClassName = classnames('c-express-scripts-footer', styleModifier, {});

  return (
    <cre8Footer className={componentClassName}>
      <div className="c-express-scripts-footer__middle">
        <ul className="c-footer-nav" behavior="horizontal" inverted="{true}">
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              Terms of Use
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              Privacy
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              Notice of Privacy Practices
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              Drug Recalls
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              Disposal of Medications
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              About Express Scripts
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              Careers
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              Help
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              Non-discrimination Notice
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              العربية
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              繁體中文
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              Français
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              Deutsch
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              Creole Ayisyen
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              Italiano
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              日本語
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              한국어
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              فارسی
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              Język polski
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              Português
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              Русский
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              Español
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              Tagalog
            </a>
          </li>
          <li className="c-footer-nav__item">
            <a className="c-footer-nav__link" href="#">
              Tiếng Việt
            </a>
          </li>
        </ul>
        <p className="c-global-footer__small-text c-global-footer__small-text--first">
          Prices and savings are based on current drug prices and your prescription program.
        </p>
        <p className="c-global-footer__small-text c-global-footer__small-text--last">
          For more information about State Boards of Pharmacy visit State Board of PharmacyExternal Link.
        </p>
        <p className="c-global-footer__copyright">© 2023 Express Scripts. All Rights Reserved.</p>
      </div>
    </cre8Footer>
  );
};
