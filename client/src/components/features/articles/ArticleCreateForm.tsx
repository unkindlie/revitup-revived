import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { createArticleSchema } from '^/schemas/articles/create-article.schema';
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
import { useCreateArticle } from '@/hooks/features/articles/useCreateArticle';
import type { ArticleCreate } from '^/types/articles';
import { FormField } from '@/components/common/form/FormField';
import { Spinner } from '@/components/common/spinner/Spinner';
import { DialogClose } from '@/components/ui/dialog';
import { TranslationNamespaceProvider } from '@/contexts/TranslationNamespaceContext';
import { useCloseDialog } from '@/hooks/ui/useCloseDialog';

export const ArticleCreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors: formErrors },
  } = useForm({
    resolver: yupResolver(createArticleSchema),
    mode: 'onChange',
  });

  const { mutateAsync, isPending } = useCreateArticle();
  const { closeHidden, closeRef } = useCloseDialog();

  const onSubmit: SubmitHandler<ArticleCreate> = async (data) => {
    try {
      await mutateAsync(data);

      closeRef.current?.click();
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Article</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Article creation</DialogTitle>
          <DialogDescription>Create a new article</DialogDescription>
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
                disabled={!isValid || isPending}
                className="flex-1"
              >
                {isPending ? <Spinner size='sm' /> : 'Create'}
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
