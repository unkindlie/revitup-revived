import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { editArticleSchema } from '^/schemas/articles/edit-article.schema';
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEditArticle } from '@/hooks/articles/useUpdateArticle';
import { useGetArticleById } from '@/hooks/articles/useGetArticleById';
import type { ArticleEdit } from '^/types/articles';
import { FormField } from '@/components/common/form/FormField';
import { Spinner } from '@/components/common/spinner/Spinner';
import { DialogClose } from '@/components/ui/dialog';
import { TranslationNamespaceProvider } from '@/contexts/TranslationNamespaceContext';
import { useCloseDialog } from '@/hooks/ui/useCloseDialog';
import { useEffect, useRef } from 'react';
import { useResponse } from '@/hooks/data-handling/useResponse';

type ArticleUpdateFormProps = {
  articleId: string;
};

export const ArticleUpdateForm = ({ articleId }: ArticleUpdateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors: formErrors },
    reset,
  } = useForm({
    resolver: yupResolver(editArticleSchema),
    mode: 'onChange',
  });

  const { data: articleData, isLoading: isLoadingArticle } =
    useGetArticleById(articleId);
  const { mutateAsync, isPending } = useEditArticle(articleId);
  const { closeHidden, closeRef } = useCloseDialog();
  const originalArticleRef = useRef<ArticleEdit>({});

  const { data: article } = useResponse(articleData);

  useEffect(() => {
    if (article) {
      const initialValues = {
        title: article.title,
        previewText: article.previewText || '',
        text: article.text || '',
        imageUrl: article.imageUrl,
      };
      originalArticleRef.current = initialValues;
      reset(initialValues);
    }
  }, [article, reset]);

  const onSubmit: SubmitHandler<ArticleEdit> = async (data) => {
    try {
      const changedFields: ArticleEdit = {};
      let hasChanges = false;

      (Object.keys(data) as Array<keyof ArticleEdit>).forEach((key) => {
        if (data[key] !== originalArticleRef.current[key]) {
          changedFields[key] = data[key];
          hasChanges = true;
        }
      });

      if (!hasChanges) {
        return;
      }
      await mutateAsync(changedFields);

      closeRef.current?.click();
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  if (isLoadingArticle) {
    return <Spinner />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Article</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Article update</DialogTitle>
          <DialogDescription>Update the article</DialogDescription>
        </DialogHeader>
        <TranslationNamespaceProvider namespace={'auth'}>
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
                placeholder="Article title"
                {...register('title')}
              />
            </FormField>

            <FormField
              id="previewText"
              label="Preview Text"
              errorMessage={formErrors.previewText?.message}
            >
              <Input
                id="previewText"
                placeholder="Preview text (optional)"
                {...register('previewText')}
              />
            </FormField>

            <FormField
              id="text"
              label="Text"
              errorMessage={formErrors.text?.message}
            >
              <textarea
                id="text"
                placeholder="Article text (optional)"
                className="w-full rounded-lg border p-2"
                {...register('text')}
              />
            </FormField>

            <FormField
              id="imageUrl"
              label="Image URL"
              errorMessage={formErrors.imageUrl?.message}
            >
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                {...register('imageUrl')}
              />
            </FormField>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={!isValid || !isDirty || isPending}
                className="flex-1"
              >
                {isPending ? <Spinner /> : 'Update'}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
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
