import { cn } from '@/lib/utils';

export const SeparatorLine = ({ className }: { className?: string }) => {
  return <div className={cn('bg-foreground/25 h-px', className)} />;
};
