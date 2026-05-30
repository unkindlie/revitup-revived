import { useMutation } from '@tanstack/react-query';
import { changePassword } from '@/api/scopes/auth';

export const usePasswordResetChange = () =>
  useMutation({
    mutationKey: ['pw-reset-change'],
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      changePassword(id, password),
  });

export default usePasswordResetChange;
