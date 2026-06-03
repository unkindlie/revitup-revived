import { Link } from 'react-router';

import RevitupLogo from '@/assets/REVITUP_squared_logo.svg?react';
import { useGetUserLatestPfp } from '@/hooks/features/users/useGetUserLatestPfp';
import { useResponse } from '@/hooks/useResponse';
import { Pages, path } from '@/lib/routing/client';
import { useUserStore } from '@/stores/user.store';

export const HeaderProfile = () => {
  const isLogged = useUserStore((s) => s.isLogged);
  const user = useUserStore((s) => s.user);

  const { data: pfpSrcRes } = useGetUserLatestPfp(user?.id || 0);
  const { data: pfpSrc } = useResponse(pfpSrcRes);

  if (!isLogged) return null;

  if (!pfpSrc) {
    return (
      <a href={path(Pages.Profile)} target="_blank" rel="noopener noreferrer">
        <RevitupLogo className="h-9 w-9 cursor-pointer fill-white object-cover" />
      </a>
    );
  }

  return (
    <Link to={path(Pages.Profile)}>
      <img
        src={pfpSrc}
        alt="profile"
        className="h-9 w-9 cursor-pointer rounded-sm object-cover"
      />
    </Link>
  );
};

export default HeaderProfile;
