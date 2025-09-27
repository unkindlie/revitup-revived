import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/user.store';
import AuthService from '../api/services/auth.service';

export const StartPage = () => {
  const cb = () => {
    AuthService.verify();
  };

  const user = useUserStore((state) => state.user);

  return (
    <div className="flex flex-col">
      <Button className="size-fit cursor-pointer" onClick={cb}>
        Click
      </Button>
      <span>{JSON.stringify(user, null, 2)}</span>
    </div>
  );
};
