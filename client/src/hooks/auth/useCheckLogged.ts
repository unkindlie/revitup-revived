import { useUserStore } from '@/stores/user.store';

export const useCheckLogged = () => {
  const user = useUserStore((state) => state.user);

  return user !== null;
};
