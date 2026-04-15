import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import type { ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type IconUnion = 'add' | 'notify';

const Icons: Record<IconUnion, IconName> = {
  add: 'plus',
  notify: 'bell',
} as const;

export const FloatingActionButton = ({
  className,
  children,
  icon,
  ...props
}: ComponentProps<'button'> & {
  icon?: IconUnion;
}) => {
  const iconName = Icons[icon!];

  return (
    <Button
      className={cn(
        'bg-light-active min-h-12 min-w-12 cursor-pointer shadow-2xl',
        className,
      )}
      {...props}
    >
      {icon && <DynamicIcon name={iconName} />}
      {children}
    </Button>
  );
};
