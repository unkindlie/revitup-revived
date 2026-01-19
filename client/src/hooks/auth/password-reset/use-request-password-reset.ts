import { useMutation } from '@tanstack/react-query';
import { requestPasswordReset } from '@/api/scopes/auth';

export const usePasswordResetRequest = () =>
  useMutation({
    mutationKey: ['pw-reset-request'],
    mutationFn: ({ email }: { email: string }) => requestPasswordReset(email),
  });
