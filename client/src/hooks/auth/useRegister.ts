import { useMutation } from '@tanstack/react-query';
import type { TAuthRegister } from '^/types/auth';
import AuthService from '@/api/services/auth.service';

export const useRegister = () =>
  useMutation({
    mutationKey: ['register'],
    mutationFn: ({ ...rest }: TAuthRegister) => AuthService.login(rest),
  });
