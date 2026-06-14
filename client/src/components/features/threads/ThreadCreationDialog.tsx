import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, type ComponentProps } from 'react';
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
        {t('index.createButton.title')}
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
  const { error } = toast;
  const { closeHidden, closeRef } = useCloseDialog();
  const { t } = useTranslation(['threads']);

  const isLogged = useUserStore((state) => state.isLogged);

  const onSubmit: SubmitHandler<TThreadCreate> = async (
    data: TThreadCreate,
  ) => {
    try {
      await mutateAsync(data);

      closeRef.current?.click();
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
            <DialogTitle>{t('index.createForm.header.title')}</DialogTitle>
            <DialogDescription>
              {t('index.createForm.header.description')}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              id="title"
              label={t('index.createForm.fields.title.name')}
              errorMessage={formErrors.title?.message}
            >
              <Input
                id="title"
                placeholder={t('index.createForm.fields.title.placeholder')}
                {...register('title')}
              />
            </FormField>

            <FormField
              id="description"
              label={t('index.createForm.fields.description.name')}
              errorMessage={formErrors.description?.message}
            >
              <Textarea
                id="description"
                placeholder={t(
                  'index.createForm.fields.description.placeholder',
                )}
                className="w-full rounded-lg border p-2"
                {...register('description')}
              />
            </FormField>

            <FormField
              id="categoryId"
              label={t('index.createForm.fields.category')}
              errorMessage={formErrors.categoryId?.message}
            >
              <ThreadCategoriesSelect
                defaultValue={defaultCategoryId}
                onValueChange={(value) =>
                  setValue('categoryId', Number(value), {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  })
                }
                {...register('categoryId')}
              />
            </FormField>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={!isValid || isPending}
                className="flex-1"
              >
                {isPending ? (
                  <Spinner size="sm" />
                ) : (
                  t('common.actions.create', { ns: 'common' })
                )}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  {t('common.actions.cancel', { ns: 'common' })}
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
