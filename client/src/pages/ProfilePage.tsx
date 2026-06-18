import { useMemo } from 'react';

import { ProfileImageGallery } from '@/components/common/images/ProfileImage';
import { Typography } from '@/components/common/typography/Typography';
import { ProfileContextMenu } from '@/components/features/profile/ProfileContextMenu';
import { useGetUserById } from '@/hooks/features/users/useGetUserById';
import { useResponse } from '@/hooks/useResponse';
import { useTranslation } from '../hooks/useTranslation';

type ProfilePageProps = {
  id: number;
};

export const ProfilePage = ({ id }: ProfilePageProps) => {
  const { data: userRes } = useGetUserById(id);
  const { t } = useTranslation(['users']);

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
                ? t('components.roles.admin', { ns: 'common' })
                : user.roles.includes('editor')
                  ? t('components.roles.editor', { ns: 'common' })
                  : t('components.roles.user', { ns: 'common' })}
            </Typography>
          </div>
        </div>
        {isCurrentUser && <ProfileContextMenu {...user} />}
      </div>
      <div>
        <Typography variant="2xl" weight="semibold">
          {t('profile.body.bio.title')}
        </Typography>
        <Typography>
          {user.description || t('profile.body.bio.placeholder')}
        </Typography>
      </div>
    </div>
  );
};
