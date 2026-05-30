import { useMutation } from '@tanstack/react-query';
import { changePasswordLogged } from '@/api/scopes/auth';

export const usePasswordResetChangeLogged = () =>
  useMutation({
    mutationKey: ['pw-reset-change-logged'],
    mutationFn: (password: string) => changePasswordLogged(password),
  });

export default usePasswordResetChangeLogged;
