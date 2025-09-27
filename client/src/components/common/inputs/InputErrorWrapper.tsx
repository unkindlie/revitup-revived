import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type Props = PropsWithChildren & {
  errorMessage?: string;
  errorClassname?: string;
};

export const InputErrorWrapper = ({
  children,
  errorMessage,
  errorClassname,
}: Props) => {
  return (
    <div className='flex flex-col gap-1'>
      {children}
      <span className={cn('text-destructive text-sm', errorClassname)}>
        {errorMessage}
      </span>
    </div>
  );
};
