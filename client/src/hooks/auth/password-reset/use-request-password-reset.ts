import { useMutation } from '@tanstack/react-query';
import AuthService from '@/api/services/auth.service';

export const usePasswordResetRequest = () =>
  useMutation({
    mutationKey: ['pw-reset-request'],
    mutationFn: ({ email }: { email: string }) =>
      AuthService.requestPasswordReset(email),
  });
