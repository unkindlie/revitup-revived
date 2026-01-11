import { useEffect, useState, type PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import { Typography } from '@/components/common/typography/Typography';
import { useTranslation } from 'react-i18next';
import { useTranslationNamespaceContext } from '@/hooks/contexts/useTranslationNamespaceContext';

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
  const { t } = useTranslation();
  const namespace = useTranslationNamespaceContext();

  useEffect(() => {
    if (errorMessage !== undefined) setLastMsg(errorMessage);
  }, [errorMessage, lastMsg]);

  return (
    <div className="flex flex-col gap-1">
      {children}
      <Typography
        variant="sm"
        className={cn(
          'block origin-top overflow-hidden font-medium transition-all duration-300 ease-in-out',
          errorMessage
            ? 'max-h-24 translate-y-0 opacity-100'
            : 'pointer-events-none max-h-0 -translate-y-1 opacity-0',
          errorClassname,
        )}
      >
        {t(errorMessage!, { ns: namespace }) ?? lastMsg}
      </Typography>
    </div>
  );
};
