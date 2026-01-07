import { cn } from '@/lib/utils';
import type { PropsWithChildren } from 'react';

const Variants = {
  sm: 'text-sm',
  base: 'text-base',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
};

const Fonts = {
  inter: 'font-inter',
  planetKosmos: 'font-planet-kosmos',
};

type Variant = keyof typeof Variants;
type Font = keyof typeof Fonts;

export const Typography = ({
  className,
  variant = 'base',
  font = 'inter',
  italic = false,
  destructive = false,
  children,
}: {
  className?: string;
  variant?: Variant;
  font?: Font;
  italic?: boolean;
  destructive?: boolean;
} & PropsWithChildren) => {
  const variantProp = Variants[variant];
  const fontProp = Fonts[font];

  return (
    <span
      className={cn(className, variantProp, fontProp, {
        italic: italic,
        'text-destructive': destructive,
      })}
      children={children}
    />
  );
};
