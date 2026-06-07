import { useParams } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { CenteredSpinner } from '@/components/common/spinner/CenteredSpinner';
import { ImageWithSkeleton } from '@/components/common/image/ImageWithSkeleton';
import { useDriverById } from '@/hooks/features/drivers/useDriverById';
import { useResponse } from '@/hooks/useResponse';
import { Button } from '../../components/ui/button';
import { Heart } from 'lucide-react';
import { useSetFavouriteDriver } from '../../hooks/features/users/useSetFavouriteDriver';
import { useUserStore } from '../../stores/user.store';
import { useFavouriteDriver } from '../../hooks/features/users/useFavouriteDriver';
import { useMemo } from 'react';

export const DriverDetailedPage = () => {
  const { id } = useParams<{ id: string }>();
  const user = useUserStore((state) => state.user);

  const { data: driverRes, isLoading } = useDriverById(Number(id));
  const { data: favouriteIdRes } = useFavouriteDriver(user?.id);

  const { data: driver } = useResponse(driverRes);
  const { data: favouriteId } = useResponse(favouriteIdRes);

  const isFavourite = useMemo(
    () => favouriteId && favouriteId === driver?.id,
    [favouriteId, driver?.id],
  );

  const { mutate, isPending } = useSetFavouriteDriver(
    !isFavourite ? driver?.id : undefined,
    user?.id,
  );

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center py-20">
        <CenteredSpinner />
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="flex w-full items-center justify-center py-20">
        <Typography variant="lg">Driver not found</Typography>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:flex-row">
      <div className="w-full lg:w-[320px]">
        <div className="relative h-[420px] overflow-hidden rounded-md border">
          <ImageWithSkeleton
            src={driver.profileImgUrl}
            alt={driver.firstName + ' ' + driver.lastName}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div>
          <div className="flex space-x-2">
            <Typography variant="3xl" weight="semibold">
              {driver.firstName + ' ' + driver.lastName}
            </Typography>
            <Button
              onClick={() => mutate()}
              disabled={isPending}
              className="flex items-center gap-2"
            >
              <Heart
                size={18}
                className={isFavourite ? 'fill-red-500 text-red-500' : ''}
              />
            </Button>
          </div>

          {driver.country && (
            <Typography className="text-muted-foreground">
              {driver.country}
            </Typography>
          )}
        </div>

        {!!driver.disciplines?.length && (
          <div className="flex flex-wrap gap-2">
            {driver.disciplines.map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-2 rounded-full border px-3 py-1"
              >
                {d.mainImgUrl && (
                  <img
                    src={d.mainImgUrl}
                    className="h-5 w-5 rounded-sm object-cover"
                  />
                )}
                <Typography variant="sm">{d.title}</Typography>
              </div>
            ))}
          </div>
        )}

        <div className="text-muted-foreground grid grid-cols-2 gap-3 text-sm">
          {driver.dateOfBirth && (
            <div>
              <span className="text-foreground font-medium">Born:</span>{' '}
              {new Date(driver.dateOfBirth).toDateString()}
            </div>
          )}

          {driver.number && (
            <div>
              <span className="text-foreground font-medium">Number:</span>{' '}
              {driver.number}
            </div>
          )}
        </div>

        <div className="mt-2 flex flex-col">
          <Typography variant="lg" weight="semibold">
            Biography
          </Typography>

          <Typography className="mt-2 leading-7 whitespace-pre-wrap">
            {driver.biography ?? 'No biography available.'}
          </Typography>
        </div>

        {/* gallery */}
        {!!driver.images?.length && (
          <div className="mt-4">
            <Typography variant="lg" weight="semibold">
              Gallery
            </Typography>

            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
              {driver.images.map((img) => (
                <div
                  key={img.id}
                  className="h-32 overflow-hidden rounded-md border"
                >
                  <img
                    src={img.imageUrl}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
