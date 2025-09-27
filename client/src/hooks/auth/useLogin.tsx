import { useMutation } from '@tanstack/react-query';
import type { TAuthBody } from '^/types/auth';
import AuthService from '@/api/services/auth.service';
import { useGetData } from '@/hooks/data-handling';
import { useUserStore } from '@/stores/user.store';
import { ACCESS_TOKEN } from '^/constants/auth.constants';

export const useLogin = () => {
  const getData = useGetData;
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationKey: ['login'],
    mutationFn: ({ ...rest }: TAuthBody) => AuthService.login(rest),
    onSuccess: (res) => {
      const data = getData(res);

      if (data) {
        localStorage.setItem(ACCESS_TOKEN, data.tokens.accessToken);
        setUser(data.user);
      }
    },
  });
};
