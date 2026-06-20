import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Spinner } from '@/components/common/spinner/Spinner';
import { FormField } from '@/components/common/form/FormField';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateArticle } from '@/hooks/features/articles/useCreateArticle';

import { createArticleSchema } from '^/schemas/articles/create-article.schema';
import { TranslationNamespaceProvider } from '../../../contexts/TranslationNamespaceContext';
import { useTranslation } from '../../../hooks/useTranslation';

type FormValues = {
  title: string;
  previewText?: string;
  text?: string;
};

export const ArticleCreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(createArticleSchema),
    mode: 'onChange',
  });

  const { mutateAsync: createArticle, isPending } = useCreateArticle();
  const { t } = useTranslation(['articles']);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await createArticle({
        ...data,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <TranslationNamespaceProvider namespace={'common'}>
      <Dialog>
        <DialogTrigger asChild>
          <Button>{t('index.draft.create')}</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('index.draft.create')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              id="title"
              label={t('common.fields.title')}
              errorMessage={errors.title?.message}
            >
              <Input {...register('title')} />
            </FormField>

            <FormField id="previewText" label={t('common.fields.previewText')}>
              <Input {...register('previewText')} />
            </FormField>

            <Button type="submit" disabled={!isValid || isPending}>
              {isPending ? <Spinner size="sm" /> : t('index.draft.action')}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </TranslationNamespaceProvider>
  );
};
