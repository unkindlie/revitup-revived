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

  if (!src) {
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
          <Typography className={textCls} variant="lg" weight="semibold">
            {imageCount}
          </Typography>
          <Typography className={cn(textCls, 'uppercase')} weight="semibold">
            images
          </Typography>
        </div>
      </div>
      <img className="size-full rounded-sm" src={src} />
    </div>
  );
};

// TODO: create black-backgrounded fullscreen gallery after MVP (read "diploma")
export const ProfileImageGallery = ({
  src,
  user: { id, username },
}: ProfileImageGalleryProps) => {
  const { data: imageRes, isLoading } = useUserProfileImages(id);
  const { data: images = [] } = useResponse<BaseImage[]>(imageRes);

  return (
    <Dialog>
      <DialogTrigger>
        <ProfileImage src={src} imageCount={images?.length} />
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{username}' Profile Images</DialogTitle>
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

                    <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                      <span>{`${idx + 1} / ${images.length}`}</span>
                      <span>{new Date(it.createdAt).toLocaleString()}</span>
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
