import { useMutation } from '@tanstack/react-query';
import AuthService from '@/api/services/auth.service';
import { useUserStore } from '@/stores/user.store';
import { ACCESS_TOKEN } from '^/constants/auth.constants';
import { useShallow } from 'zustand/react/shallow';

export const useLogout = () => {
  const { setUser, setIsLogged } = useUserStore(
    useShallow((state) => ({
      setUser: state.setUser,
      setIsLogged: state.setIsLogged,
    })),
  );

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      setUser(null);
      setIsLogged(false);
      localStorage.removeItem(ACCESS_TOKEN);
    },
  });
};
