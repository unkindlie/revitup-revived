import { useUserStore } from '@/stores/user.store';
import { useMutation } from '@tanstack/react-query';
import AuthService from '@/api/services/auth.service';
import { ACCESS_TOKEN } from '^/constants/auth.constants';
import { useShallow } from 'zustand/react/shallow';
import { getDataFromResponse } from '^/helpers/response/getResponse';

export const useRefresh = () => {
  const { setUser, setLoadingFlag } = useUserStore(
    useShallow((state) => ({
      setUser: state.setUser,
      setLoadingFlag: state.setLoadingFlag,
    })),
  );

  return useMutation({
    mutationKey: ['refresh'],
    mutationFn: () => AuthService.refresh(),
    onMutate: () => setLoadingFlag({ isLoading: true }),
    onSuccess: (res) => {
      const data = getDataFromResponse(res);

      if (data) {
        localStorage.setItem(ACCESS_TOKEN, data.tokens.accessToken);
        setUser(data.user);
      }
    },
    // onError: () => localStorage.removeItem(ACCESS_TOKEN),
    onSettled: () =>
      setLoadingFlag({ isFinishedLoading: true, isLoading: false }),
  });
};
