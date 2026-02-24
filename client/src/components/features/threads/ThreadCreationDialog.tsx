import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { TranslationNamespaceProvider } from '@/contexts/TranslationNamespaceContext';
import { FloatingActionButton } from '@/components/common/button/FloatingActionButton';
import { Typography } from '@/components/common/typography/Typography';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/common/form/FormField';
import { Spinner } from '@/components/common/spinner/Spinner';
import { useCreateThread } from '@/hooks/features/threads/useCreateThread';
import { useCloseDialog } from '@/hooks/ui/useCloseDialog';

import { threadCreateSchema } from '^/schemas/threads/create.schema';
import type { TThreadCreate } from '^/types/threads';

export const ThreadCreationDialog = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors: formErrors },
  } = useForm({
    resolver: yupResolver(threadCreateSchema),
    mode: 'onChange',
  });
  const { mutateAsync, isPending } = useCreateThread();
  const { error, success } = toast;

  const { closeHidden, closeRef } = useCloseDialog();

  const onSubmit: SubmitHandler<TThreadCreate> = async (
    data: TThreadCreate,
  ) => {
    try {
      await mutateAsync(data);

      closeRef.current?.click();
      success('Thread created successfully');
    } catch (e) {
      error('Error creating the thread', { description: e as string });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FloatingActionButton
          className="absolute top-11/12 right-0 bottom-0 w-fit lg:top-0 lg:bottom-full"
          icon="add"
        >
          <Typography className="hidden lg:block" weight="medium">
            Add a thread
          </Typography>
        </FloatingActionButton>
      </DialogTrigger>
      <DialogContent>
        <TranslationNamespaceProvider namespace={'threads'}>
          <DialogHeader>
            <DialogTitle>Add a thread</DialogTitle>
            <DialogDescription>
              Here you can create your article
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              id="title"
              label="Title"
              errorMessage={formErrors.title?.message}
            >
              <Input
                id="title"
                placeholder="Thread title"
                {...register('title')}
              />
            </FormField>

            <FormField
              id="description"
              label="Description"
              errorMessage={formErrors.description?.message}
            >
              <textarea
                id="description"
                placeholder="Thread description"
                className="w-full rounded-lg border p-2"
                {...register('description')}
              />
            </FormField>

            <div className="flex gap-2">
              <Button type="submit" disabled={!isValid} className="flex-1">
                {isPending ? <Spinner size="sm" /> : 'Create'}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </form>
          {closeHidden}
        </TranslationNamespaceProvider>
      </DialogContent>
    </Dialog>
  );
};
