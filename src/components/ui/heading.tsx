import React, { JSXElementConstructor, CSSProperties } from 'react';
import cn from 'classnames';

interface Props {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode | any;
  html?: string;
}

type Variant =
  | 'mediumHeading'
  | 'heading'
  | 'base'
  | 'title'
  | 'titleMedium'
  | 'titleLarge'
  | 'pageHeading'
  | 'subHeading'
  | 'checkoutHeading';

const Heading: React.FC<Props> = ({
  style,
  className,
  variant = 'base',
  children,
  html,
}) => {
  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string;
  } = {
    base: 'h3',
    heading: 'h2',
    mediumHeading: 'h3',
    title: 'h2', // Collection card
    titleMedium: 'h3',
    titleLarge: 'h2',
    pageHeading: 'h1',
    subHeading: 'h2',
    checkoutHeading: 'h3',
  };

  const Component:
    | JSXElementConstructor<any>
    | React.ReactElement<any>
    | React.ComponentType<any>
    | string = componentsMap![variant!];

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {};

  return (
    <Component
      className={cn(
        'text-fill-base',
        {
          'text-sm font-semibold': variant === 'base',
          'text-base  font-semibold ':
            variant === 'title',
          'font-bold text-fill-base text-xl': variant === 'titleMedium',
          'text-[16px] xl:text-[20px] font-semibold xl:leading-8':
            variant === 'titleLarge',
          'text-[16px] lg:leading-7 font-bold':
            variant === 'mediumHeading',
          'text-lg lg:text-xl xl:text-[22px] xl:leading-8 font-bold font-manrope': variant === 'heading',
          'text-lg lg:text-xl xl:text-[26px] xl:leading-8 font-semibold text-brand-dark ': variant === 'checkoutHeading',
        },
        className
      )}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </Component>
  );
};

export default Heading;
