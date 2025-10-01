import { useEffect, type PropsWithChildren } from 'react';
import { useRefresh } from '@/hooks/auth/useRefresh';
import { ACCESS_TOKEN } from '^/constants/auth.constants';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { mutateAsync } = useRefresh();

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem(ACCESS_TOKEN)) await mutateAsync();
    };

    checkAuth();
  }, [mutateAsync]);

  return children;
};
