import { useMutation } from '@tanstack/react-query';
import type { TAuthRegister } from '^/types/auth';
import { register } from '@/api/scopes/auth';

export const useRegister = () =>
  useMutation({
    mutationKey: ['register'],
    mutationFn: ({ ...rest }: TAuthRegister) => register(rest),
  });
