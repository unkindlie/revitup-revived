import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUserPfp } from '@/api/scopes/users';

export const useDeleteUserPfp = (userId: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ['user-delete-pfp', userId],
    mutationFn: (imageId: string) => deleteUserPfp(imageId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['user-profile-images', userId] });
      qc.invalidateQueries({ queryKey: ['user-latest-pfp', userId] });
      qc.invalidateQueries({ queryKey: ['user-detailed', userId] });
    },
  });
};

export default useDeleteUserPfp;
