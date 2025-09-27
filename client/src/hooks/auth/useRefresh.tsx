import { useUserStore } from '@/stores/user.store';
import { useGetData } from '@/hooks/data-handling';
import { useMutation } from '@tanstack/react-query';
import AuthService from '../../api/services/auth.service';
import { ACCESS_TOKEN } from '^/constants/auth.constants';

export const useRefresh = () => {
  const getData = useGetData;
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationKey: ['login'],
    mutationFn: () => AuthService.refresh(),
    onSuccess: (res) => {
      const data = getData(res);

      if (data) {
        localStorage.setItem(ACCESS_TOKEN, data.tokens.accessToken);
        setUser(data.user);
      }
    },
  });
};
