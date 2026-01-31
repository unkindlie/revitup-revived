import { Typography } from '@/components/common/typography/Typography';
import { useGetUserById } from '../hooks/features/users/useGetUserById';
import { useResponse } from '../hooks/useResponse';

type ProfilePageProps = {
  id: number;
};

export const ProfilePage = ({ id }: ProfilePageProps) => {
  const { data: userRes } = useGetUserById(id);
  const { data: user } = useResponse(userRes);

  if (!user) return <Typography>cuh</Typography>;

  return (
    <div className="flex size-fit items-center gap-x-4">
      <img className='size-24 rounded-sm' src={user.profileImg ?? ''} />
      <div className="flex flex-col gap-y-0.5">
        <Typography variant="3xl" weight="semibold">
          {user.username}
        </Typography>
      </div>
    </div>
  );
};
