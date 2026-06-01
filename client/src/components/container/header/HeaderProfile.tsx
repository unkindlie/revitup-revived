import { Link } from 'react-router';

import RevitupLogo from '@/assets/REVITUP_squared_logo.svg?react';
import { useGetUserById } from '@/hooks/features/users/useGetUserById';
import { useResponse } from '@/hooks/useResponse';
import { Pages, path } from '@/lib/routing/client';
import { useUserStore } from '@/stores/user.store';

export const HeaderProfile = () => {
  const isLogged = useUserStore((s) => s.isLogged);
  const user = useUserStore((s) => s.user);

  const { data: userFetchedRes } = useGetUserById(user?.id || 0);
  const { data: userFetched } = useResponse(userFetchedRes);

  if (!isLogged) return null;

  const src = userFetched?.profileImg || null;

  if (!src) {
    return (
      <a href={path(Pages.Profile)} target="_blank" rel="noopener noreferrer">
        <RevitupLogo className="h-9 w-9 cursor-pointer fill-white object-cover" />
      </a>
    );
  }

  return (
    <Link to={path(Pages.Profile)}>
      <img
        src={src}
        alt="profile"
        className="h-9 w-9 cursor-pointer rounded-sm object-cover"
      />
    </Link>
  );
};

export default HeaderProfile;
