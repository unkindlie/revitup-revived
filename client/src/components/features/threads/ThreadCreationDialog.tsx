import { yupResolver } from '@hookform/resolvers/yup';
import { type ComponentProps } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { TranslationNamespaceProvider } from '@/contexts/TranslationNamespaceContext';
import { FloatingActionButton } from '@/components/common/button/FloatingActionButton';
import { Typography } from '@/components/common/typography/Typography';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { FormField } from '@/components/common/form/FormField';
import { Spinner } from '@/components/common/spinner/Spinner';
import { ThreadCategoriesSelect } from '@/components/features/threads/categories/ThreadCategorySelect';
import { useCreateThread } from '@/hooks/features/threads/useCreateThread';
import { useCloseDialog } from '@/hooks/ui/useCloseDialog';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationNamespaces } from '@/lib/translation';
import { useUserStore } from '@/stores/user.store';

import { threadCreateSchema } from '^/schemas/threads/create.schema';
import type { TThreadCreate } from '^/types/threads';

export const ThreadCreateButton = ({
  isLogged,
  ...props
}: ComponentProps<'button'> & {
  isLogged: boolean;
}) => {
  const { t } = useTranslation([TranslationNamespaces.Threads]);

  if (!isLogged)
    return (
      <Tooltip>
        <TooltipTrigger
          asChild
          className="absolute top-11/12 right-0 bottom-0 w-fit transition-all lg:top-0"
        >
          <span className="inline-flex w-fit">
            <FloatingActionButton icon="add" {...props} disabled>
              <Typography
                className="hidden text-white lg:block"
                weight="medium"
              >
                {t('index.createButton.title')}
              </Typography>
            </FloatingActionButton>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <Typography variant="sm">
            {t('index.createButton.disabledTooltip')}
          </Typography>
        </TooltipContent>
      </Tooltip>
    );

  return (
    <FloatingActionButton
      className="absolute top-11/12 right-0 bottom-0 w-fit lg:top-0 lg:bottom-full"
      icon="add"
      {...props}
    >
      <Typography className="hidden text-white lg:block" weight="medium">
        Add a thread
      </Typography>
    </FloatingActionButton>
  );
};

export const ThreadCreationDialog = ({
  defaultCategoryId,
}: {
  defaultCategoryId?: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors: formErrors },
    setValue,
  } = useForm({
    resolver: yupResolver(threadCreateSchema),
    mode: 'onChange',
  });
  const { mutateAsync, isPending } = useCreateThread();
  const { error, success } = toast;
  const { closeHidden, closeRef } = useCloseDialog();

  const isLogged = useUserStore((state) => state.isLogged);
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
        <ThreadCreateButton isLogged={isLogged} />
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
              <Textarea
                id="description"
                placeholder="Thread description"
                className="w-full rounded-lg border p-2"
                {...register('description')}
              />
            </FormField>

            <FormField
              id="categoryId"
              label="Category"
              errorMessage={formErrors.categoryId?.message}
            >
              <ThreadCategoriesSelect
                defaultValue={defaultCategoryId}
                onValueChange={(value) => setValue('categoryId', Number(value))}
                {...register('categoryId')}
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
