import { useEffect, type PropsWithChildren } from 'react';
import { useRefresh } from '@/hooks/auth/useRefresh';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { mutateAsync } = useRefresh();

  useEffect(() => {
    mutateAsync();
  }, [mutateAsync]);

  return children;
};
