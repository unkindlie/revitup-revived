import { cn } from '@/lib/utils';
import type { ComponentPropsWithRef, JSX } from 'react';

const Variants = {
  sm: 'text-sm',
  base: 'text-base',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-6xl',
  '6xl': 'text-8xl',
};

const Fonts = {
  inter: '',
  planetKosmos: 'font-planet-kosmos',
};

const Weights = {
  bold: 'font-bold',
  black: 'font-black',
  medium: 'font-medium',
  normal: 'font-normal',
  semibold: 'font-semibold',
};

type Variant = keyof typeof Variants;
type Font = keyof typeof Fonts;
type Weight = keyof typeof Weights;

const elements: Record<Variant, string> = {
  sm: 'span',
  base: 'span',
  md: 'span',
  lg: 'span',
  xl: 'h6',
  '2xl': 'h5',
  '3xl': 'h4',
  '4xl': 'h3',
  '5xl': 'h2',
  '6xl': 'h1',
};

type SelectedElements = Pick<
  JSX.IntrinsicElements,
  'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>;

export const Typography = ({
  className,
  variant = 'base',
  font = 'inter',
  weight = 'normal',
  italic = false,
  destructive = false,
  paragraph = false,
  children,
  ...props
}: {
  className?: string;
  variant?: Variant;
  font?: Font;
  weight?: Weight;
  italic?: boolean;
  destructive?: boolean;
  paragraph?: boolean;
} & ComponentPropsWithRef<'div'>) => {
  const variantProp = Variants[variant];
  const fontProp = Fonts[font];
  const weightProp = Weights[weight];

  const Component = (
    paragraph ? 'p' : elements[variant]
  ) as keyof SelectedElements;

  return (
    <Component
      className={cn(className, variantProp, fontProp, weightProp, {
        italic,
        'text-destructive': destructive,
      })}
      children={children}
      {...props}
    />
  );
};
