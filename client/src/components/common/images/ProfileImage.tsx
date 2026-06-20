import RevitupLogo from '@/assets/REVITUP_squared_logo.svg?react';
import { Typography } from '@/components/common/typography/Typography';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useUserProfileImages } from '@/hooks/features/users/useGetUserProfileImagesById';
import { useResponse } from '@/hooks/useResponse';
import { cn } from '@/lib/utils';
import type { BaseImage } from '^/types/images';
import { useUserStore } from '@/stores/user.store';
import useDeleteUserPfp from '@/hooks/features/users/useDeleteUserPfp';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/common/spinner/Spinner';
import { toast } from 'sonner';
import { useTranslation } from '../../../hooks/useTranslation';

type ProfileImageProps = {
  src: string;
  disabled?: boolean;
};

type ProfileImageGalleryProps = ProfileImageProps & {
  user: {
    id: number;
    username: string;
  };
};

export const ProfileImage = ({
  src,
  imageCount = 0,
  disabled = false,
}: {
  src: string;
  imageCount?: number;
  disabled?: boolean;
}) => {
  const textCls = 'text-white select-none';
  const { t } = useTranslation(['users']);

  if (!src || imageCount === 0) {
    return (
      <div className="size-24">
        <RevitupLogo className="fill-main size-full dark:fill-white" />
      </div>
    );
  }

  return (
    <div className="size-24">
      <div className="absolute size-24 rounded-sm bg-black/50 opacity-0 transition-all hover:opacity-100">
        <div
          className={`flex h-full ${disabled ? '' : 'cursor-pointer'} flex-col items-center justify-center`}
        >
          <Typography className={cn(textCls, 'uppercase')} weight="semibold">
            {imageCount} {t('profile.body.images.items', { count: imageCount })}
          </Typography>
        </div>
      </div>
      <img className="size-full rounded-sm" src={src} />
    </div>
  );
};

export const ProfileImageGallery = ({
  src,
  user: { id, username },
}: ProfileImageGalleryProps) => {
  const { data: imageRes, isLoading } = useUserProfileImages(id);
  const { data: images = [] } = useResponse<BaseImage[]>(imageRes);
  const currentUser = useUserStore((s) => s.user);
  const isOwner = !!currentUser && currentUser.id === id;
  const { t } = useTranslation(['users']);

  const { mutate: deletePfp, isPending: deleting } = useDeleteUserPfp(id);

  return (
    <Dialog>
      <DialogTrigger disabled={images?.length === 0}>
        <ProfileImage src={src} imageCount={images?.length} />
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            {t('profile.body.images.title', { username })}
          </DialogTitle>
        </DialogHeader>
        {isLoading || !images ? (
          <Typography>Loading</Typography>
        ) : (
          <Carousel>
            <CarouselContent>
              {images.map((it: BaseImage, idx: number) => (
                <CarouselItem key={it.id}>
                  <div>
                    <img
                      src={it.url}
                      alt={`${username}'s profile`}
                      className="w-full rounded-sm"
                    />

                    <div className="text-muted-foreground mt-2 flex items-center justify-between text-sm">
                      <span>{`${idx + 1} / ${images.length}`}</span>
                      <span>{new Date(it.createdAt).toLocaleString()}</span>
                      {isOwner && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (!confirm('Delete this profile image?')) return;

                            deletePfp(it.id, {
                              onSuccess: () =>
                                toast.success('Зображення видалено'),
                              onError: () =>
                                toast.error('Неможливо видалити зображення'),
                            });
                          }}
                        >
                          {deleting ? (
                            <Spinner size="sm" />
                          ) : (
                            t('profile.body.images.action')
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-2 z-10 -translate-y-1/2" />
            <CarouselNext className="absolute top-1/2 right-2 z-10 -translate-y-1/2" />
          </Carousel>
        )}
      </DialogContent>
    </Dialog>
  );
};
