import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadUserPfp } from '@/api/scopes/users';

export const useUploadUserPfp = (id: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ['user-upload-pfp'],
    mutationFn: (file: File) => uploadUserPfp(file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['user-profile-images', id] });
      qc.invalidateQueries({ queryKey: ['user-latest-pfp', id] });
      qc.invalidateQueries({ queryKey: ['user-detailed', id] });
    },
  });
};

export default useUploadUserPfp;
