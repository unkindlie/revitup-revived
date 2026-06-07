import { useMemo } from 'react';

import { ProfileImageGallery } from '@/components/common/images/ProfileImage';
import { Typography } from '@/components/common/typography/Typography';
import { ProfileContextMenu } from '@/components/features/profile/ProfileContextMenu';
import { useGetUserById } from '@/hooks/features/users/useGetUserById';
import { useResponse } from '@/hooks/useResponse';

type ProfilePageProps = {
  id: number;
};

export const ProfilePage = ({ id }: ProfilePageProps) => {
  const { data: userRes } = useGetUserById(id);

  const { data: user } = useResponse(userRes);

  const isCurrentUser = useMemo(() => user && id === user.id, [user, id]);

  if (!user) return <Typography>User not found</Typography>;

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex h-fit w-full items-center justify-between">
        <div className="flex size-fit items-center gap-x-4">
          <ProfileImageGallery
            src={user.profileImgUrl || ''}
            user={{ id: user.id, username: user.username }}
          />
          <div className="flex flex-col gap-y-0.5">
            <Typography variant="3xl" weight="semibold">
              {user.username}
            </Typography>
            <Typography>
              {user.roles.includes('admin')
                ? 'Admin'
                : user.roles.includes('editor')
                  ? 'Editor'
                  : 'Default peasant'}
            </Typography>
          </div>
        </div>
        {isCurrentUser && <ProfileContextMenu {...user} />}
      </div>
      <div>
        <Typography variant="2xl" weight="semibold">
          About the user
        </Typography>
        <Typography>
          {user.description ||
            'User has not provided his bio/description of his profile'}
        </Typography>
      </div>
    </div>
  );
};
