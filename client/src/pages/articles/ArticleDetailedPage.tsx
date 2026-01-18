import { useParams } from 'react-router';
import { useGetArticleById } from '@/hooks/articles/useGetArticleById';
import { useResponse } from '@/hooks/data-handling/useResponse';
import { Article } from '@/components/features/articles/Article';
import { Typography } from '@/components/common/typography/Typography';
import { useDeleteArticle } from '@/hooks/articles/useDeleteArticle';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/common/spinner/Spinner';

export const ArticleDetailedPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: articleRes, isFetched } = useGetArticleById(id!);
  const { mutate: deleteArticle, isPending: deletionPending } =
    useDeleteArticle(id!);

  const { data: article } = useResponse(articleRes);

  if (!isFetched || !article) return null;

  return (
    <div className="flex flex-col">
      <div className="w-1/2">
        <Article article={article} size="lg" />
      </div>
      <Typography className="mt-2 w-1/2" variant="md">
        {article.text}
      </Typography>
      <Button className='w-28' onClick={() => deleteArticle()}>
        {deletionPending ? <Spinner /> : 'Delete article'}
      </Button>
    </div>
  );
};
