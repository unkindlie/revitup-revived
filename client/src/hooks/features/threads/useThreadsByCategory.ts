import { useQuery } from '@tanstack/react-query';

import { getThreadsByCategory } from '@/api/scopes/threads';

export const useThreadsByCategory = (code: string) =>
  useQuery({
    queryKey: ['threads-by-category', code],
    queryFn: () => getThreadsByCategory(code),
  });
