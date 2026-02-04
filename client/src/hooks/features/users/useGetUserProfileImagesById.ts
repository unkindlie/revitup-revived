import { useQuery } from '@tanstack/react-query';
import { getUserProfileImagesById } from '@/api/scopes/users';

export const useUserProfileImages = (userId: number) => {
  return useQuery({
    queryKey: ['user-profile-images', userId],
    queryFn: () => getUserProfileImagesById(userId),
  });
};