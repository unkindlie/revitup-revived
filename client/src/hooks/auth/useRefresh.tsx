import { useUserStore } from '@/stores/user.store';
import { useGetData } from '@/hooks/data-handling';
import { useMutation } from '@tanstack/react-query';
import AuthService from '@/api/services/auth.service';
import { ACCESS_TOKEN } from '^/constants/auth.constants';
import { useShallow } from 'zustand/react/shallow';

export const useRefresh = () => {
  const getData = useGetData;

  const { setUser, setLoadingFlag } = useUserStore(
    useShallow((state) => ({
      setUser: state.setUser,
      setLoadingFlag: state.setLoadingFlag,
    })),
  );

  return useMutation({
    mutationKey: ['login'],
    mutationFn: () => AuthService.refresh(),
    onMutate: () => setLoadingFlag({ isLoading: true }),
    onSuccess: (res) => {
      const data = getData(res);

      if (data) {
        localStorage.setItem(ACCESS_TOKEN, data.tokens.accessToken);
        setUser(data.user);
      }
    },
    onSettled: () =>
      setLoadingFlag({ isFinishedLoading: true, isLoading: false }),
  });
};
