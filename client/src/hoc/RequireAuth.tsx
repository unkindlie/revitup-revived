import { useEffect, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';

import { useUserStore } from '@/stores/user.store';

export const RequireAuth = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const {
    isLogged,
    loadingInfo: { isFinishedLoading, isLoading },
  } = useUserStore(
    useShallow((state) => ({
      isLogged: state.isLogged,
      loadingInfo: state.loadingInfo,
    })),
  );

  useEffect(() => {
    if (!isLoading && isFinishedLoading && !isLogged) {
      navigate('/');
      toast.error('You cannot be there', {
        description: 'You do not have an access to this page',
      });
    }
  }, [navigate, isFinishedLoading, isLoading, isLogged]);

  if (!isLoading && isFinishedLoading) return children;
};
