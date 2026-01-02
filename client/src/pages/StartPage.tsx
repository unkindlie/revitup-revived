import { useUserStore } from '@/stores/user.store';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const StartPage = () => {
  const { user, loadingFlag } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      loadingFlag: state.loadingFlag,
    })),
  );

  const cb = () => {
    toast.error('idkbruv', {
      description: 'wow',
    });
  };

  const { isLoading } = loadingFlag;

  return (
    <div className="flex flex-col">
      <Button className="size-fit" onClick={cb}>
        Click
      </Button>
      {!user && isLoading && <span>Loading</span>}
      {user && <span>{JSON.stringify(user, null, 2)}</span>}
    </div>
  );
};
