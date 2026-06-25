import { useEffect, useState } from 'react';

import { Typography } from '@/components/common/typography/Typography';
import { useTranslation } from '@/hooks/useTranslation';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type Props = React.ImgHTMLAttributes<HTMLImageElement>;

export const ImageWithSkeleton = ({ src, className, alt, ...props }: Props) => {
  const [loading, setLoading] = useState(Boolean(src));
  const [error, setError] = useState(false);

  const { t } = useTranslation(['common']);

  useEffect(() => {
    setLoading(Boolean(src));
    setError(false);
  }, [src]);

  if (!src || error) {
    return (
      <div
        className={cn(
          'bg-muted flex items-center justify-center rounded-md',
          className,
        )}
      >
        <Typography className="text-muted-foreground py-20" variant="lg">
          {t('components.image.noImage')}
        </Typography>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {loading && <Skeleton className="absolute inset-0 h-full w-full" />}

      <img
        src={src}
        alt={alt}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-300',
          loading ? 'opacity-0' : 'opacity-100',
        )}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        {...props}
      />
    </div>
  );
};
