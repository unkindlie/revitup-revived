import { useParams } from 'react-router';
import { Spinner } from '@/components/common/spinner/Spinner';
import { Typography } from '@/components/common/typography/Typography';
import { useResponse } from '@/hooks/useResponse';
import { ArticleDraftEditForm } from '@/components/features/articles/ArticleDraftEditForm';
import { useGetDraftById } from '../../hooks/features/articles/useGetDraftById';

export const ArticleDraftPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: articleRes, isLoading } = useGetDraftById(Number(id));
  const { data: article } = useResponse(articleRes);

  if (isLoading) {
    return <Spinner />;
  }

  if (!article) {
    return (
      <Typography variant="lg" weight="medium">
        Draft not found
      </Typography>
    );
  }

  console.log(article);

  return (
    <div className="flex w-full">
      <ArticleDraftEditForm
        articleId={article.id}
        defaultValues={{
          title: article.title,
          previewText: article.previewText ?? '',
          mainImgUrl: article.mainImgUrl ?? '',
          disciplineId: article.discipline?.id,
          paragraphs: article.paragraphs,
        }}
      />
    </div>
  );
};
