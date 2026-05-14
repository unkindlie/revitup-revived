import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';

import { FloatingActionButton } from '@/components/common/button/FloatingActionButton';
import { DatePicker } from '@/components/common/date/DatePicker';
import { FormField } from '@/components/common/form/FormField';
import { Spinner } from '@/components/common/spinner/Spinner';
import { Typography } from '@/components/common/typography/Typography';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TranslationNamespaceProvider } from '@/contexts/TranslationNamespaceContext';
import { useCreateEvent } from '@/hooks/features/events/useCreateEvent';
import { useCloseDialog } from '@/hooks/ui/useCloseDialog';
import { useTranslation } from '@/hooks/useTranslation';

import {
  createEventSchema,
  type CreateEventSchema,
} from '^/schemas/events/create-event.schema';

export const EventCreationDialog = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { isValid, errors: formErrors },
  } = useForm({
    resolver: yupResolver(createEventSchema),
    mode: 'onChange',
  });
  const { t } = useTranslation(['events', 'common']);
  const { mutateAsync, isPending } = useCreateEvent();
  const { closeHidden, closeRef } = useCloseDialog();

  const onSumbit: SubmitHandler<CreateEventSchema> = async (data) => {
    await mutateAsync({
      ...data,
      mainImage: data.mainImage as FileList,
    });

    closeRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FloatingActionButton
          className="absolute top-11/12 right-0 bottom-0 w-fit lg:top-0 lg:bottom-full"
          icon="add"
        >
          <Typography className="hidden text-white lg:block" weight="medium">
            {t('index.createForm.title')}
          </Typography>
        </FloatingActionButton>
      </DialogTrigger>
      <DialogContent>
        <TranslationNamespaceProvider namespace={'events'}>
          <DialogHeader>
            <DialogTitle>{t('index.createForm.title')}</DialogTitle>
            <DialogDescription>
              {t('index.createForm.description')}
            </DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(onSumbit)}
          >
            <FormField
              id="title"
              label={t('index.createForm.fields.title.label')}
              errorMessage={formErrors.title?.message}
            >
              <Input
                id="title"
                placeholder={t('index.createForm.fields.title.description')}
                {...register('title')}
              />
            </FormField>

            <FormField
              id="description"
              label={t('index.createForm.fields.description.label')}
            >
              <Textarea
                id="description"
                placeholder={t(
                  'index.createForm.fields.description.description',
                )}
                {...register('description')}
              />
            </FormField>

            <FormField
              id="location"
              label={t('index.createForm.fields.location.label')}
              errorMessage={formErrors.location?.message}
            >
              <Input
                id="location"
                placeholder={t('index.createForm.fields.location.description')}
                {...register('location')}
              />
            </FormField>

            <div className="flex w-full gap-x-2 *:w-1/2">
              <FormField
                id="startDate"
                label={t('index.createForm.fields.startDate.label')}
                errorMessage={formErrors.startDate?.message}
              >
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      id="startDate"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </FormField>
              <FormField
                id="endDate"
                label={t('index.createForm.fields.endDate.label')}
                errorMessage={formErrors.endDate?.message}
              >
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      id="endDate"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </FormField>
            </div>

            <FormField id="mainImage" label="Main image">
              <Input id="mainImage" type="file" {...register('mainImage')} />
            </FormField>

            <div className="flex gap-2">
              <Button
                className="flex-1 cursor-pointer"
                disabled={!isValid || isPending}
                type="submit"
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
        </TranslationNamespaceProvider>
        {closeHidden}
      </DialogContent>
    </Dialog>
  );
};
