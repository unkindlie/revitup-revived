import { cn } from '@/lib/utils';
import { Typography } from '@/components/common/typography/Typography';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../ui/carousel';
import { useUserProfileImages } from '../../../hooks/features/users/useGetUserProfileImagesById';
import { useResponse } from '../../../hooks/useResponse';

type ProfileImageProps = {
  src: string;
  imageCount?: number;
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
}: {
  src: string;
  imageCount?: number;
}) => {
  const textCls = 'text-white select-none';

  return (
    <div className="size-24">
      <div className="absolute size-24 rounded-sm bg-black/50 opacity-0 transition-all hover:opacity-100">
        <div className="flex h-full cursor-pointer flex-col items-center justify-center">
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
  imageCount,
  user: { id, username },
}: ProfileImageGalleryProps) => {
  const { data: imageRes, isLoading } = useUserProfileImages(id);
  const { data: images = [] } = useResponse(imageRes)

  return (
    <Dialog>
      <DialogTrigger>
        <ProfileImage src={src} imageCount={imageCount} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{username}' Profile Images</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {!isLoading && !images ? (
            <Typography>Loading</Typography>
          ) : (
            <Carousel>
              <CarouselContent>
                {images?.map((it) => (
                  <CarouselItem>
                    <img 
                      src={it.url} 
                      alt={`${username}'s profile`}
                      className="w-full rounded-sm"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
