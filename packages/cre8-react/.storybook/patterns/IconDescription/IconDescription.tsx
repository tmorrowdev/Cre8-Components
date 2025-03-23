import '!style-loader!css-loader!sass-loader!./IconDescription.scss';
import classnames from 'classnames';
import * as React from 'react';

export interface IconDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Horizontal alignment variants
   * - **right** renders the icon and text horizontally aligned right
   */

  align?: 'end';

  /**
   * Children slot for main container content
   */
  children?: React.ReactNode;

  /**
   * Header slot for icons
   */
  header?: React.ReactNode;
  /**
   * Append to the class name. Used for passing in utility classes
   */

  styleModifier?: string;

  /**
   * Size variants
   * - **sm** renders an icon and description smaller than the default
   */

  size?: 'sm';

  /**
   * Vertical alignment variants
   * - **center** renders the icon and text vertically centered
   */

  verticalAlign?: 'center';

  /**
   * Weight variant
   */

  weight?: 'light';
}

/**
 * Primary UI component for user interaction
 */
export const IconDescription = ({ children, className, header, size, verticalAlign, weight, align, ...other }: IconDescriptionProps) => {
  const componentClassName = classnames('c-icon-description', className, {
    'c-icon-description--sm': size === 'sm',
    'c-icon-description--valign-center': verticalAlign === 'center',
    'c-icon-description--align-end': align === 'end',
    'c-icon-description--light': weight === 'light'
  });

  return (
    <div className={componentClassName} {...other}>
      {header && <div className="c-icon-description__header">{header}</div>}
      <div className="c-icon-description__body">{children}</div>
    </div>
  );
};
