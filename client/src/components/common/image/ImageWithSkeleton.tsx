import { useState } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type ImageWithSkeletonProps = {
  src?: string | null;
  alt: string;
  className?: string;
  skeletonClassName?: string;
};

export const ImageWithSkeleton = ({
  src,
  alt,
  className,
  skeletonClassName,
}: ImageWithSkeletonProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      {!loaded && (
        <Skeleton
          className={cn(
            'absolute inset-0 rounded-md',
            skeletonClassName ?? className,
          )}
        />
      )}

      <img
        src={src ?? ''}
        alt={alt}
        className={cn(className, {
          'opacity-0': !loaded,
        })}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  );
};
