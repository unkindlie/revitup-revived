import { useParams } from 'react-router';
import { useGetArticleById } from '@/hooks/features/articles/useGetArticleById';
import { useResponse } from '@/hooks/useResponse';
import { Article } from '@/components/features/articles/Article';
import { Typography } from '@/components/common/typography/Typography';
import { useDeleteArticle } from '@/hooks/features/articles/useDeleteArticle';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/common/spinner/Spinner';
import { ArticleUpdateForm } from '@/components/features/articles/ArticleUpdateForm';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const ArticleDetailedPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: articleRes, isFetched } = useGetArticleById(id!);
  const { mutate: deleteArticle, isPending: deletionPending } =
    useDeleteArticle(id!);

  const { data: article } = useResponse(articleRes);

  useDocumentTitle(`${article ? article.title : 'Article loading...'}`, {
    appNamed: true,
  });

  if (!isFetched || !article || !id) return null;

  return (
    <div className="flex flex-col">
      <div className="w-1/2">
        <Article article={article} size="lg" />
      </div>
      <Typography className="mt-2 w-1/2" variant="md">
        {article.text}
      </Typography>
      <div className="flex flex-row space-x-2">
        <ArticleUpdateForm articleId={id} />
        <Button className="w-28" onClick={() => deleteArticle()}>
          {deletionPending ? <Spinner size="sm" /> : 'Delete article'}
        </Button>
      </div>
    </div>
  );
};
