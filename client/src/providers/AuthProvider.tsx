import { useEffect, type PropsWithChildren } from 'react';
import { useRefresh } from '@/hooks/features/auth/useRefresh';
import { ACCESS_TOKEN } from '^/constants/auth.constants';
import { useUserStore } from '../stores/user.store';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { mutateAsync } = useRefresh();
  const setLoadingInfo = useUserStore((state) => state.setLoadingInfo);

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) mutateAsync();
    else setLoadingInfo({ isFinishedLoading: true });
  }, [mutateAsync, setLoadingInfo]);

  return children;
};
