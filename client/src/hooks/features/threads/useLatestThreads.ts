import { useQuery } from '@tanstack/react-query';
import { getLatestThreads } from '../../../api/scopes/threads';

export const useLatestThreads = () =>
  useQuery({
    queryKey: ['latest-threads'],
    queryFn: getLatestThreads,
  });
