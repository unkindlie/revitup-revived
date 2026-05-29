import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router';
import { useShallow } from 'zustand/react/shallow';

import { logout } from '@/api/scopes/auth';
import { useUserStore } from '@/stores/user.store';
import { Pages, path } from '@/lib/routing/client';

import { ACCESS_TOKEN } from '^/constants/auth.constants';

export const useLogout = () => {
  const { setUser, setIsLogged } = useUserStore(
    useShallow((state) => ({
      setUser: state.setUser,
      setIsLogged: state.setIsLogged,
    })),
  );
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => logout(),
    onSuccess: () => {
      if (location.pathname === path(Pages.Profile)) {
        navigate(path(Pages.Main));
      }

      setUser(null);
      setIsLogged(false);

      localStorage.removeItem(ACCESS_TOKEN);
    },
  });
};
