import { useQuery } from '@tanstack/react-query';
import { getRandomDriver } from '../../../api/scopes/drivers';

export const useRandomDriver = () =>
  useQuery({
    queryKey: ['driver-random'],
    queryFn: getRandomDriver,
  });
