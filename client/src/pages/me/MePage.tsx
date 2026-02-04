import { Typography } from '../../components/common/typography/Typography';
import { useUserStore } from '../../stores/user.store';
import { ProfilePage } from '../ProfilePage';

export const MePage = () => {
  const user = useUserStore((state) => state.user);

  if (!user) return <Typography>cuh1</Typography>;

  return <ProfilePage id={user.id} />;
};
