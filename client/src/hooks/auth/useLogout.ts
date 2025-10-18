import { useMutation } from '@tanstack/react-query';
import AuthService from '@/api/services/auth.service';
import { useUserStore } from '@/stores/user.store';
import { ACCESS_TOKEN } from '^/constants/auth.constants';

export const useLogout = () => {
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      setUser(null);
      localStorage.removeItem(ACCESS_TOKEN);
    },
  });
};
