import { useMutation } from '@tanstack/react-query';
import type { TAuthBody } from '^/types/auth';
import AuthService from '@/api/services/auth.service';
import { useUserStore } from '@/stores/user.store';
import { ACCESS_TOKEN } from '^/constants/auth.constants';
import { getDataFromResponse } from '^/helpers/response/getResponse';
import { useShallow } from 'zustand/react/shallow';

export const useLogin = () => {
  const { setUser, setLoadingFlag } = useUserStore(
    useShallow((state) => ({
      setUser: state.setUser,
      setLoadingFlag: state.setLoadingFlag,
    })),
  );

  return useMutation({
    mutationKey: ['login'],
    mutationFn: ({ ...rest }: TAuthBody) => AuthService.login(rest),
    onSuccess: (res) => {
      const data = getDataFromResponse(res);

      if (data) {
        localStorage.setItem(ACCESS_TOKEN, data.tokens.accessToken);
        setUser(data.user);
      }
    },
    onSettled: () =>
      setLoadingFlag({ isFinishedLoading: true, isLoading: false }),
  });
};
