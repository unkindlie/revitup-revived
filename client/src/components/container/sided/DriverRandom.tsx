import { User } from 'lucide-react';
import { Link } from 'react-router';

import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/common/typography/Typography';
import { Pages, path } from '@/lib/routing/client';
import { useRandomDriver } from '@/hooks/features/drivers/useRandomDriver';
import { useResponse } from '@/hooks/useResponse';
import { useTranslation } from '../../../hooks/useTranslation';

export const DriverRandom = () => {
  const { data: response, isLoading } = useRandomDriver();

  const { data: driver } = useResponse(response);

  const { t } = useTranslation(['common']);

  if (isLoading) {
    return (
      <div className="bg-background w-64 overflow-hidden rounded-lg border">
        <Skeleton className="h-72 w-full" />
        <div className="space-y-2 p-4">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    );
  }

  if (!driver) return null;

  return (
    <Link
      to={path(Pages.DriverDetailed, {
        id: driver.id,
      })}
      className="group bg-background block overflow-hidden rounded-lg border transition-all hover:shadow-lg"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={driver.profileImgUrl}
          alt={`${driver.firstName} ${driver.lastName}`}
          className="size-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
          <Typography variant="xl" weight="semibold" className="text-white">
            {driver.firstName} {driver.lastName}
          </Typography>

          {driver.number && (
            <Typography className="text-white/80">#{driver.number}</Typography>
          )}
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex flex-wrap gap-2">
          {/* {driver.disciplines?.map((discipline) => (
            <div
              key={discipline.id}
              className="flex items-center gap-2 rounded-full border px-2 py-1"
            >
              {discipline.mainImgUrl && (
                <img
                  src={discipline.mainImgUrl}
                  className="size-5 rounded-sm"
                />
              )}

              <Typography variant="sm" weight="medium">
                {discipline.title}
              </Typography>
            </div>
          ))} */}
        </div>

        <div className="text-muted-foreground flex items-center gap-2">
          <User size={16} />
          <Typography variant="sm">
            {t('components.randomDriver.action')}
          </Typography>
        </div>
      </div>
    </Link>
  );
};
