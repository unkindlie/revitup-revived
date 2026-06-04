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

import { createArticleSchema } from '^/schemas/articles/create-article.schema';
import type { ArticleEdit } from '^/types/articles';
import { useEditArticle } from '../../../hooks/features/articles/useUpdateArticle';
import { TranslationNamespaceProvider } from '../../../contexts/TranslationNamespaceContext';

type FormValues = {
  title: string;
  previewText?: string;
  mainImgUrl?: string;
};

export const ArticleDraftEditForm = ({
  articleId,
  defaultValues,
}: {
  articleId: number;
  defaultValues: FormValues;
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
  const [mainImage, setMainImage] = useState<File | null>(null);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files?.length) return;

    const file = files[0];

    setUploadedFiles([file]);
    setMainImage(file);
  };

  const removeFile = () => {
    setUploadedFiles([]);
    setMainImage(null);
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
      };

      await updateDraft({
        article: payload,
        file: mainImage ?? undefined,
      });

      toast.success('Draft updated');

      removeFile();
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

            <div className="flex w-full items-center space-x-3">
              <img className="w-52 rounded-sm" src={defaultValues.mainImgUrl} />

              <FileDropzone
                fileInputRef={fileInputRef}
                handleBoxClick={handleBoxClick}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                handleFileSelect={handleFileSelect}
              />
            </div>

            <FileList
              uploadedFiles={uploadedFiles}
              fileProgresses={{}}
              removeFile={removeFile}
            />
          </div>

          <Button type="submit" disabled={!isValid || isPending}>
            {isPending ? <Spinner size="sm" /> : 'Save draft'}
          </Button>
        </form>
      </div>
    </TranslationNamespaceProvider>
  );
};
