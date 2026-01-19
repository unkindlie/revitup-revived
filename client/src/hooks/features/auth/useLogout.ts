import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/stores/user.store';
import { ACCESS_TOKEN } from '^/constants/auth.constants';
import { useShallow } from 'zustand/react/shallow';
import { logout } from '@/api/scopes/auth';

export const useLogout = () => {
  const { setUser, setIsLogged } = useUserStore(
    useShallow((state) => ({
      setUser: state.setUser,
      setIsLogged: state.setIsLogged,
    })),
  );

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => logout(),
    onSuccess: () => {
      setUser(null);
      setIsLogged(false);
      localStorage.removeItem(ACCESS_TOKEN);
    },
  });
};
