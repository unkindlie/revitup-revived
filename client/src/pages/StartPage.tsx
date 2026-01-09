import { useUserStore } from '@/stores/user.store';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Typography } from '@/components/common/typography/Typography';

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
      {!user && isLoading && <Typography>Loading</Typography>}
      {user && <Typography>{JSON.stringify(user, null, 2)}</Typography>}
      <Typography>hello</Typography>
    </div>
  );
};
