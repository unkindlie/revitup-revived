import LongSrc from '@/assets/REVITUP_logo.svg?react';
import SquaredSrc from '@/assets/REVITUP_squared_logo.svg?react';
import { cn } from '@/lib/utils';

export const LongLogo = ({ className }: { className: string }) => {
  return <LongSrc className={cn('h-auto', className)} title="Logo" />;
};

export const SquaredLogo = ({ className }: { className: string }) => {
  return <SquaredSrc className={cn('h-auto', className)} title="Logo" />;
};

export const SquaredLogoBgMain = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'bg-main inline-flex items-center justify-center rounded-full',
        className,
      )}
    >
      <SquaredSrc className={cn('h-4 w-4', 'text-white')} title="Logo" />
    </div>
  );
};
