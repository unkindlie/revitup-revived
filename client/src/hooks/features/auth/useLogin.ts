import { useMutation } from '@tanstack/react-query';
import type { TAuthBody } from '^/types/auth';
import { login } from '@/api/scopes/auth';
import { useUserStore } from '@/stores/user.store';
import { ACCESS_TOKEN } from '^/constants/auth.constants';
import { getDataFromResponse } from '^/helpers/response/getResponse';
import { useShallow } from 'zustand/react/shallow';

export const useLogin = () => {
  const { setUser, setLoadingFlag, setIsLogged } = useUserStore(
    useShallow((state) => ({
      setUser: state.setUser,
      setLoadingFlag: state.setLoadingInfo,
      setIsLogged: state.setIsLogged,
    })),
  );

  return useMutation({
    mutationKey: ['login'],
    mutationFn: ({ ...rest }: TAuthBody) => login(rest),
    onSuccess: (res) => {
      const data = getDataFromResponse(res);

      if (data) {
        localStorage.setItem(ACCESS_TOKEN, data.tokens.accessToken);
        setUser(data.user);
        setIsLogged(true);
      }
    },
    onSettled: () =>
      setLoadingFlag({ isFinishedLoading: true, isLoading: false }),
  });
};
