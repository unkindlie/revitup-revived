import { RequireAuth } from '../../hoc/RequireAuth';
import { useUserStore } from '../../stores/user.store';
import { ProfilePage } from '../ProfilePage';

export const MePage = () => {
  const user = useUserStore((state) => state.user);

  if (!user) return <RequireAuth>{null}</RequireAuth>;

  return <ProfilePage id={user.id} />;
};
