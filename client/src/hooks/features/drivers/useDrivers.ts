import { useQuery } from '@tanstack/react-query';
import { getDrivers } from '@/api/scopes/drivers';

export const useDrivers = (params?: {
  page?: number;
  take?: number;
  discipline?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['drivers', params],
    queryFn: () => getDrivers(params),
  });
};
