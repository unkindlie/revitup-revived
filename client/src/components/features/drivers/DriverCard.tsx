import { Link } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { Pages, path } from '@/lib/routing/client';
import { cn } from '@/lib/utils';

import type { TDriverShort } from '^/types/drivers';

type DriverCardProps = {
  driver: TDriverShort;
  className?: string;
};

export const DriverCard = ({
  driver: { id, firstName, lastName, profileImgUrl, disciplines },
  className,
}: DriverCardProps) => {
  return (
    <Link
      to={path(Pages.DriverDetailed, { id })}
      className={cn(
        'flex flex-col gap-2 rounded-md border p-3 transition hover:shadow-md',
        className,
      )}
    >
      <img
        src={profileImgUrl}
        alt={`${firstName} ${lastName}`}
        className="h-44 w-full rounded-md object-cover object-[60%_20%]"
      />

      <div className="flex flex-col gap-1">
        <Typography variant="lg" weight="semibold">
          {firstName} {lastName}
        </Typography>
      </div>

      {!!disciplines?.length && (
        <div className="flex flex-wrap gap-2">
          {disciplines.map((d) => (
            <div
              key={d.id}
              className="flex items-center gap-1 rounded-full border px-3 py-1 text-xs"
            >
              {d.mainImgUrl && (
                <img src={d.mainImgUrl} className="h-4 w-4 rounded-sm" />
              )}
              <span>{d.title}</span>
            </div>
          ))}
        </div>
      )}
    </Link>
  );
};
