import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInfo } from '@/api/scopes/users';

export const useUpdateUser = (userId: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ['user-update', userId],
    mutationFn: (payload: Partial<{ id: number; username?: string }>) =>
      updateUserInfo(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['user-detailed', userId] });
      qc.invalidateQueries({ queryKey: ['user-latest-pfp', userId] });
    },
  });
};

export default useUpdateUser;
