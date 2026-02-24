import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createThread } from '@/api/scopes/threads';
import type { TThreadCreate } from '^/types/threads';

export const useCreateThread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['thread-create'],
    mutationFn: (thread: TThreadCreate) => createThread(thread),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['threads-index'] }),
  });
};
