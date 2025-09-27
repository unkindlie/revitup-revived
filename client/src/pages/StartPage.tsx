import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/user.store';
import AuthService from '@/api/services/auth.service';
import { useShallow } from 'zustand/react/shallow';

export const StartPage = () => {
  const cb = () => {
    AuthService.verify();
  };

  const { user, loadingFlag } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      loadingFlag: state.loadingFlag,
    })),
  );

  const { isLoading } = loadingFlag;

  return (
    <div className="flex flex-col">
      <Button className="size-fit cursor-pointer" onClick={cb}>
        Click
      </Button>
      {!user && isLoading && <span>Loading</span>}
      {user && <span>{JSON.stringify(user, null, 2)}</span>}
    </div>
  );
};
