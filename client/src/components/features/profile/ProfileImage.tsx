import type { ComponentProps } from 'react';

import RevitupLogo from '@/assets/REVITUP_squared_logo.svg?react';

export const ProfileImage = ({
  src,
  className,
  ...props
}: ComponentProps<'img'>) => {
  if (!src) {
    return (
      <div className={className}>
        <RevitupLogo className="fill-main size-full dark:fill-white" />
      </div>
    );
  }

  return (
    <div className={className}>
      <img className="size-full rounded-sm" src={src} {...props} />
    </div>
  );
};
