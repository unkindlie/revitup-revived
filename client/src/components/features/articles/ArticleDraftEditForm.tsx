import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useRef } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/common/spinner/Spinner';
import { FormField } from '@/components/common/form/FormField';
import { Typography } from '@/components/common/typography/Typography';

import { FileDropzone } from '@/components/common/file/Dropzone';
import { FileList } from '@/components/common/file/FileList';

// import { useUploadFile } from '@/hooks/files/useUploadFile';

import { createArticleSchema } from '^/schemas/articles/create-article.schema';
import type { ArticleEdit } from '^/types/articles';
import { useEditArticle } from '../../../hooks/features/articles/useUpdateArticle';
import { TranslationNamespaceProvider } from '../../../contexts/TranslationNamespaceContext';

type FormValues = {
  title: string;
  previewText?: string | undefined;
};

export const ArticleDraftEditForm = ({
  articleId,
  defaultValues,
}: {
  articleId: number;
  defaultValues: FormValues & { mainImgUrl?: string };
}) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(createArticleSchema.pick(['title', 'previewText'])),
    mode: 'onChange',
    defaultValues,
  });

  const { mutateAsync: updateDraft, isPending } = useEditArticle(articleId);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileProgresses, setFileProgresses] = useState<Record<string, number>>(
    {},
  );
  const [imageUrl, setImageUrl] = useState(defaultValues.mainImgUrl ?? '');

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files?.length) return;

    const file = files[0];

    setUploadedFiles([file]);
    setFileProgresses({ [file.name]: 10 });

    try {
      setFileProgresses({ [file.name]: 40 });

      // const url = await uploadFile(file);

      setFileProgresses({ [file.name]: 100 });
      // setImageUrl(url);

      toast.success('Image uploaded');
    } catch (e: any) {
      toast.error(e?.message ?? 'Upload failed');
    }
  };

  const removeFile = (filename: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.name !== filename));
    setFileProgresses((prev) => {
      const copy = { ...prev };
      delete copy[filename];
      return copy;
    });
    setImageUrl('');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const payload: ArticleEdit = {
        ...data,
        mainImgUrl: imageUrl,
      };

      await updateDraft(payload);

      toast.success('Draft updated');
    } catch (e: any) {
      toast.error(e?.message ?? 'Failed to update draft');
    }
  };

  return (
    <TranslationNamespaceProvider namespace={'common'}>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <Typography variant="3xl" weight="semibold">
          Edit draft article
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FormField
            id="title"
            label="Title"
            errorMessage={errors.title?.message}
          >
            <Input id="title" {...register('title')} />
          </FormField>

          <FormField id="previewText" label="Preview text">
            <Input id="previewText" {...register('previewText')} />
          </FormField>

          <div className="flex flex-col gap-3">
            <Typography variant="sm" weight="medium">
              Main image
            </Typography>

            <FileDropzone
              fileInputRef={fileInputRef}
              handleBoxClick={handleBoxClick}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleFileSelect={handleFileSelect}
            />

            <FileList
              uploadedFiles={uploadedFiles}
              fileProgresses={fileProgresses}
              removeFile={removeFile}
            />

            {imageUrl && (
              <img
                src={imageUrl}
                className="h-56 w-full rounded-md object-cover"
              />
            )}
          </div>

          <Button type="submit" disabled={!isValid || isPending}>
            {isPending ? <Spinner size="sm" /> : 'Save draft'}
          </Button>
        </form>
      </div>
    </TranslationNamespaceProvider>
  );
};
