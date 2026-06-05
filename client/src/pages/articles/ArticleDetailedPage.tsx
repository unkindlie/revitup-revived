import { useRef } from 'react';
import { useParams } from 'react-router';

import { SeparatorLine } from '@/components/common/separator/SeparatorLine';
import { Spinner } from '@/components/common/spinner/Spinner';
import { Typography } from '@/components/common/typography/Typography';
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

  const { data: articleRes, isFetched } = useGetArticleById(Number(id) || 0);
  const { data: article } = useResponse(articleRes);

  const { mutate: deleteArticle, isPending: deletionPending } =
    useDeleteArticle(Number(id) || 0);

  useDocumentTitle(`${article ? article.title : 'Article loading...'}`, {
    appNamed: true,
  });

  if (!isFetched || !article || !id) return null;

  return (
    <CommentReplyProvider>
      <div className="flex flex-col">
        <div className="flex flex-col gap-y-2 transition-all sm:w-[550px] md:w-[575px] lg:w-[600px]">
          <Typography variant="3xl" weight="semibold">
            {article.title}
          </Typography>
          {article.discipline && (
            <div className="flex items-center gap-x-2">
              {article.discipline.mainImgUrl && (
                <img
                  src={article.discipline.mainImgUrl}
                  className="h-8 w-8 rounded-sm"
                />
              )}
              <Typography variant="sm">{article.discipline.title}</Typography>
            </div>
          )}
          <Typography variant="lg">{article.previewText}</Typography>
          <img
            ref={commentsRef}
            className="rounded-sm"
            alt={article.title}
            src={article.mainImgUrl}
            title={article.title}
          />
        </div>
        <SeparatorLine className="mx-4 mt-2 sm:mr-28 sm:ml-0 lg:hidden" />
        <div className="mt-4">
          {!article.paragraphs?.length ? (
            <div className="space-x-2 rounded-md border border-dashed p-6 text-center">
              <Typography variant="lg" weight="medium">
                No content yet
              </Typography>

              <Typography variant="base" className="text-muted-foreground mt-1">
                This article does not contain any paragraphs yet.
              </Typography>
            </div>
          ) : (
            <div className="flex flex-col gap-y-8">
              {article.paragraphs.map((paragraph) => (
                <article
                  key={paragraph.id}
                  className="flex flex-col gap-y-3 md:max-w-[575px] lg:w-[700px]"
                >
                  {paragraph.title && (
                    <Typography variant="2xl" weight="semibold">
                      {paragraph.title}
                    </Typography>
                  )}

                  <Typography
                    paragraph
                    variant="md"
                    className="leading-7 whitespace-pre-wrap"
                  >
                    {paragraph.content}
                  </Typography>
                </article>
              ))}
            </div>
          )}
        </div>
        <div className="mt-4 md:max-w-[575px] lg:w-[700px]">
          <CommentsBlock source="article" id={Number(id)} />
        </div>
        <div className="mt-2 flex space-x-2">
          <Button className="w-28" onClick={() => deleteArticle()}>
            {deletionPending ? <Spinner size="sm" /> : 'Delete article'}
          </Button>
        </div>
      </div>
    </CommentReplyProvider>
  );
};
