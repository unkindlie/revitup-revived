import { useEffect, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';
import { useUserStore } from '@/stores/user.store';
import { useShallow } from 'zustand/react/shallow';
import { toast } from 'sonner';

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
