import { cn } from '@/lib/utils';

export const SeparatorLine = ({ className }: { className?: string }) => {
  return <div className={cn('h-px bg-black/25', className)} />;
};
