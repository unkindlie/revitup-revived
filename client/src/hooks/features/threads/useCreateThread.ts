import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createThread } from '@/api/scopes/threads';
import type { TThreadCreate } from '^/types/threads';
import { useTranslation } from '../../useTranslation';
import { toast } from 'sonner';

export const useCreateThread = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(['threads']);

  return useMutation({
    mutationKey: ['thread-create'],
    mutationFn: (thread: TThreadCreate) => createThread(thread),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['threads-index'] });
      queryClient.invalidateQueries({ queryKey: ['latest-threads'] });
      toast.success(t('index.createForm.success'));
    },
  });
};
