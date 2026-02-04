import { Typography } from '@/components/common/typography/Typography';
import { useGetUserById } from '../hooks/features/users/useGetUserById';
import { useResponse } from '../hooks/useResponse';
import {
  ProfileImageGallery,
} from '../components/common/images/ProfileImage';

type ProfilePageProps = {
  id: number;
};

export const ProfilePage = ({ id }: ProfilePageProps) => {
  const { data: userRes } = useGetUserById(id);
  const { data: user } = useResponse(userRes);

  if (!user) return <Typography>cuh</Typography>;

  return (
    <div className="flex size-fit items-center gap-x-4">
      <ProfileImageGallery
        src={user.profileImg ?? ''}
        user={{ id: user.id, username: user.username }}
      />
      <div className="flex flex-col gap-y-0.5">
        <Typography variant="3xl" weight="semibold">
          {user.username}
        </Typography>
      </div>
    </div>
  );
};
