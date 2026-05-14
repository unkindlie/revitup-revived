import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createEvent } from '@/api/scopes/events';
import { useTranslation } from '@/hooks/useTranslation';

import type { TEventCreate } from '^/types/events';

export const useCreateEvent = () => {
  const { success, error } = toast;
  const { t } = useTranslation(['events']);

  return useMutation({
    mutationKey: ['event-create'],
    mutationFn: (input: TEventCreate) => createEvent(input),
    onSuccess: () =>
      success(t('index.create.form.success.title'), {
        description: t('index.create.form.success.description'),
      }),
    onError: () => error('Error'),
  });
};
