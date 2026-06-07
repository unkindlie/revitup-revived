import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setFavouriteDriver } from '@/api/scopes/users';

export const useSetFavouriteDriver = (driverId?: number, userId?: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => setFavouriteDriver(driverId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['driver', driverId] });
      qc.invalidateQueries({ queryKey: ['driver-favourite', userId] });
    },
  });
};
