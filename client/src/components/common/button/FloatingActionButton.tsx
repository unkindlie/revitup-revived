import type {
  ComponentProps,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Bell, Plus, type LucideProps } from 'lucide-react';

type IconUnion = 'add' | 'notify';

const Icons: Record<
  IconUnion,
  ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
> = {
  add: Plus,
  notify: Bell,
} as const;

export const FloatingActionButton = ({
  className,
  children,
  icon,
  ...props
}: ComponentProps<'button'> & {
  icon?: keyof typeof Icons;
}) => {
  const IconElement = Icons[icon!];

  return (
    <Button
      className={cn(
        'bg-light-active min-h-12 min-w-12 cursor-pointer shadow-2xl',
        className,
      )}
      {...props}
    >
      {icon && <IconElement />}
      {children}
    </Button>
  );
};
