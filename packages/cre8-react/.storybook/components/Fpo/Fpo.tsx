import React from 'react';
import classnames from 'classnames';
import '!style-loader!css-loader!sass-loader!./Fpo.scss';

export interface FpoProps {
  /**
   * CSS class names that can be appended to the component.
   */
  styleModifier?: string;
  /**
   * Child node(s) that can be nested inside component
   * */
  children?: React.ReactNode;
}

/**
 * Primary UI component for user interaction
 */
export const Fpo = ({ styleModifier, children }: FpoProps) => {
  const componentClassName = classnames('fpo', styleModifier, {});
  return <div className={componentClassName}>{children}</div>;
};
