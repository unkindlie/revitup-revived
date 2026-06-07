import { useQuery } from '@tanstack/react-query';
import { getDriverById } from '@/api/scopes/drivers';

export const useDriverById = (id: number) => {
  return useQuery({
    queryKey: ['driver', id],
    queryFn: () => getDriverById(id),
    enabled: !!id,
  });
};
