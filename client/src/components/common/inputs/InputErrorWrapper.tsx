import { useEffect, useState, type PropsWithChildren } from 'react';
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
  const [lastMsg, setLastMsg] = useState(errorMessage);

  useEffect(() => {
    if (errorMessage !== undefined) setLastMsg(errorMessage);
  }, [errorMessage, lastMsg]);

  return (
    <div className="flex flex-col gap-1">
      {children}
      <span
        className={cn(
          'text-destructive block origin-top overflow-hidden text-sm font-medium transition-all duration-300 ease-in-out',
          errorMessage
            ? 'max-h-24 translate-y-0 opacity-100'
            : 'pointer-events-none max-h-0 -translate-y-1 opacity-0',
          errorClassname,
        )}
      >
        {errorMessage ?? lastMsg}
      </span>
    </div>
  );
};
