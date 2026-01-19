import { useEffect, type PropsWithChildren } from 'react';
import { useRefresh } from '@/hooks/features/auth/useRefresh';
import { ACCESS_TOKEN } from '^/constants/auth.constants';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { mutateAsync } = useRefresh();

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) mutateAsync();
  }, [mutateAsync]);

  return children;
};
