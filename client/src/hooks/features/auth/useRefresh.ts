import { useUserStore } from '@/stores/user.store';
import { useMutation } from '@tanstack/react-query';
import { ACCESS_TOKEN } from '^/constants/auth.constants';
import { useShallow } from 'zustand/react/shallow';
import { getDataFromResponse } from '^/helpers/response/getResponse';
import { refresh } from '@/api/scopes/auth';

export const useRefresh = () => {
  const { setUser, setLoadingFlag, setIsLogged } = useUserStore(
    useShallow((state) => ({
      setUser: state.setUser,
      setLoadingFlag: state.setLoadingInfo,
      setIsLogged: state.setIsLogged,
    })),
  );

  return useMutation({
    mutationKey: ['refresh'],
    mutationFn: () => refresh(),
    onMutate: () => setLoadingFlag({ isLoading: true }),
    onSuccess: (res) => {
      const data = getDataFromResponse(res);

      if (data) {
        localStorage.setItem(ACCESS_TOKEN, data.tokens.accessToken);
        setUser(data.user);
        setIsLogged(true);
      }
    },
    // onError: () => localStorage.removeItem(ACCESS_TOKEN),
    onSettled: () =>
      setLoadingFlag({ isFinishedLoading: true, isLoading: false }),
  });
};
