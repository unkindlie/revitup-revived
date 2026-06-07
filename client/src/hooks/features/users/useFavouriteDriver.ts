import { useQuery } from '@tanstack/react-query';
import { getFavouriteDriverByUser } from '../../../api/scopes/drivers';

export const useFavouriteDriver = (userId?: number) =>
  useQuery({
    queryKey: ['driver-favourite', userId],
    queryFn: () => getFavouriteDriverByUser(userId || 0),
    enabled: !!userId,
  });
