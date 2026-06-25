import { Link } from 'react-router';

import RevitupLogo from '@/assets/REVITUP_squared_logo.svg?react';
import { useGetUserLatestPfp } from '@/hooks/features/users/useGetUserLatestPfp';
import { useResponse } from '@/hooks/useResponse';
import { Pages, path } from '@/lib/routing/client';
import { useUserStore } from '@/stores/user.store';
import { useState } from 'react';
import { Spinner } from '../../common/spinner/Spinner';

export const HeaderProfile = () => {
  const isLogged = useUserStore((s) => s.isLogged);
  const user = useUserStore((s) => s.user);
  const [isLoaded, setIsLoaded] = useState(false);

  const { data: pfpSrcRes, isFetched } = useGetUserLatestPfp(user?.id || 0);
  const { data: pfpSrc } = useResponse(pfpSrcRes);

  if (!isLogged) return null;

  if (isFetched && !pfpSrc) {
    return (
      <a href={path(Pages.Profile)} target="_blank" rel="noopener noreferrer">
        <RevitupLogo className="size-9 cursor-pointer fill-white object-cover" />
      </a>
    );
  }

  return (
    <Link to={path(Pages.Profile)} className="relative block size-9">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner size="sm" />
        </div>
      )}

      <img
        src={pfpSrc || undefined}
        alt="profile"
        onLoad={() => setIsLoaded(true)}
        className={`size-9 min-h-9 min-w-9 rounded-sm object-cover ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </Link>
  );
};

export default HeaderProfile;
