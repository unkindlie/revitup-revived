import { useUserStore } from '@/stores/user.store';
import { useShallow } from 'zustand/react/shallow';

export const StartPage = () => {
  const { user, loadingFlag } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      loadingFlag: state.loadingFlag,
    })),
  );

  const { isLoading } = loadingFlag;

  return (
    <div className="flex flex-col">
      {!user && isLoading && <span>Loading</span>}
      {user && <span>{JSON.stringify(user, null, 2)}</span>}
    </div>
  );
};
