import { useRef } from 'react';
import { useParams } from 'react-router';

import { SeparatorLine } from '@/components/common/separator/SeparatorLine';
import { Spinner } from '@/components/common/spinner/Spinner';
import { Typography } from '@/components/common/typography/Typography';
import { ArticleUpdateForm } from '@/components/features/articles/ArticleUpdateForm';
import { CommentsBlock } from '@/components/features/comments/CommentsBlock';
import { Button } from '@/components/ui/button';
import { CommentReplyProvider } from '@/contexts/CommentReplyContext';
import { useDeleteArticle } from '@/hooks/features/articles/useDeleteArticle';
import { useGetArticleById } from '@/hooks/features/articles/useGetArticleById';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useResponse } from '@/hooks/useResponse';

export const ArticleDetailedPage = () => {
  const commentsRef = useRef(null);
  const { id } = useParams<{ id: string }>();

  const { data: articleRes, isFetched } = useGetArticleById(id!);
  const { data: article } = useResponse(articleRes);

  const { mutate: deleteArticle, isPending: deletionPending } =
    useDeleteArticle(id!);

  useDocumentTitle(`${article ? article.title : 'Article loading...'}`, {
    appNamed: true,
  });

  if (!isFetched || !article || !id) return null;

  return (
    <CommentReplyProvider>
      <div className="flex flex-col">
        <div className="flex flex-col gap-y-2 transition-all sm:w-[550px] md:w-[575px] lg:w-[600px]">
          <img
            ref={commentsRef}
            className="rounded-sm"
            alt={article.title}
            src={article.imageUrl}
            title={article.title}
          />
          <Typography variant="3xl" weight="semibold">
            {article.title}
          </Typography>
          <Typography variant="lg">{article.previewText}</Typography>
        </div>
        <SeparatorLine className="mx-4 mt-2 sm:mr-28 sm:ml-0 lg:hidden" />
        <div className="flex flex-col gap-y-2">
          <Typography className="mt-2" variant="md">
            {article.text}
          </Typography>
        </div>
        <div className="mt-4 md:max-w-[575px] lg:w-[700px]">
          <CommentsBlock source="article" id={Number(id)} />
        </div>
        <div className="mt-2 flex space-x-2">
          <ArticleUpdateForm articleId={id} />
          <Button className="w-28" onClick={() => deleteArticle()}>
            {deletionPending ? <Spinner size="sm" /> : 'Delete article'}
          </Button>
        </div>
      </div>
    </CommentReplyProvider>
  );
};
