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
import { useEditArticle } from '../../../hooks/features/articles/useUpdateArticle';
import { DisciplineSelect } from '../disciplines/DisciplineSelect';
import { TranslationNamespaceProvider } from '../../../contexts/TranslationNamespaceContext';

import type { Paragraph } from '^/types/paragraphs';
import { ParagraphManager } from '../../../hooks/features/paragraphs/ParagraphManager';
import { usePublishArticle } from '../../../hooks/features/articles/usePublishArticle';
import { useNavigate } from 'react-router';
import { Pages, path } from '../../../lib/routing/client';
import { useTranslation } from '../../../hooks/useTranslation';

type FormValues = {
  title: string;
  previewText?: string;
  mainImgUrl?: string;
  paragraphs?: Paragraph[];
  disciplineId?: number;
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
  const navigate = useNavigate();

  const { mutateAsync: updateDraft, isPending } = useEditArticle(articleId);
  const { mutateAsync: publishArticle, isPending: isPublishing } =
    usePublishArticle(articleId);
  const { t } = useTranslation(['articles']);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [paragraphs, setParagraphs] = useState<Paragraph[]>(
    defaultValues.paragraphs ?? [],
  );
  const [selectedDiscipline, setSelectedDiscipline] = useState<
    number | undefined
  >(defaultValues.disciplineId || undefined);
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
      const payload = {
        ...data,
        disciplineId: selectedDiscipline
          ? Number(selectedDiscipline)
          : undefined,
      };

      await updateDraft({
        article: payload,
        file: mainImage ?? undefined,
        paragraphs,
      });

      toast.success(t('draftEdit.actions.save.success'));

      if (mainImage) removeFile();
    } catch (e: any) {
      toast.error(e?.message ?? 'Failed to update draft');
    }
  };

  return (
    <TranslationNamespaceProvider namespace={'common'}>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <Typography variant="3xl" weight="semibold">
          {t('draftEdit.title')}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FormField
            id="title"
            label={t('common.fields.title')}
            errorMessage={errors.title?.message}
          >
            <Input id="title" {...register('title')} />
          </FormField>

          <FormField id="previewText" label={t('common.fields.previewText')}>
            <Input id="previewText" {...register('previewText')} />
          </FormField>

          <div>
            <FormField id="discipline" label={t('common.fields.discipline')}>
              <DisciplineSelect
                defaultValue={String(selectedDiscipline)}
                onValueChange={(v) => setSelectedDiscipline(Number(v))}
              />
            </FormField>
          </div>

          <div className="flex flex-col gap-3">
            <Typography variant="sm" weight="medium">
              {t('common.fields.mainImg')}
            </Typography>

            <div className="flex w-full items-center space-x-3">
              {defaultValues.mainImgUrl && (
                <img
                  className="w-52 rounded-sm"
                  src={defaultValues.mainImgUrl}
                />
              )}

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

          {paragraphs.length > 0 && (
            <div className="flex flex-col gap-4">
              <Typography variant="xl" weight="semibold">
                {t('common.fields.paragraphs')}
              </Typography>

              {paragraphs
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((p) => (
                  <div
                    key={p.id ?? p.order}
                    className="flex flex-col rounded-md border p-3"
                  >
                    <Typography variant="lg" weight="semibold">
                      {p.title}
                    </Typography>

                    <Typography variant="md">{p.content}</Typography>
                  </div>
                ))}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Typography variant="lg" weight="semibold">
              {t('common.fields.paragraphs')}
            </Typography>

            <ParagraphManager initial={paragraphs} onChange={setParagraphs} />
          </div>

          <div className="grid w-full grid-cols-2 gap-4">
            <Button
              className="w-full"
              type="submit"
              disabled={!isValid || isPending}
            >
              {isPending ? (
                <Spinner size="sm" />
              ) : (
                t('draftEdit.actions.save.title')
              )}
            </Button>

            <Button
              className="w-full"
              type="button"
              variant="secondary"
              disabled={isPublishing}
              onClick={async () => {
                await publishArticle();
                navigate(path(Pages.ArticleDetailed, { id: articleId }), {
                  replace: true,
                });
              }}
            >
              {isPublishing ? (
                <Spinner size="sm" />
              ) : (
                t('draftEdit.actions.publish.title')
              )}
            </Button>
          </div>
        </form>
      </div>
    </TranslationNamespaceProvider>
  );
};
