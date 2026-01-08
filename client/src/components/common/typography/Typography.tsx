import { cn } from '@/lib/utils';
import type { JSX, PropsWithChildren } from 'react';

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

export const Typography = ({
  className,
  variant = 'base',
  font = 'inter',
  weight = 'normal',
  italic = false,
  destructive = false,
  paragraph = false,
  children,
}: {
  className?: string;
  variant?: Variant;
  font?: Font;
  weight?: Weight;
  italic?: boolean;
  destructive?: boolean;
  paragraph?: boolean;
} & PropsWithChildren) => {
  const variantProp = Variants[variant];
  const fontProp = Fonts[font];
  const weightProp = Weights[weight];

  const Component = (
    paragraph ? 'p' : elements[variant]
  ) as keyof JSX.IntrinsicElements;

  return (
    <Component
      className={cn(className, variantProp, fontProp, weightProp, {
        italic: italic,
        'text-light-active': destructive,
      })}
      children={children}
    />
  );
};
