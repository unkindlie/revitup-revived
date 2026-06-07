import { useParams } from 'react-router';

import { SeparatorLine } from '@/components/common/separator/SeparatorLine';
import { Spinner } from '@/components/common/spinner/Spinner';
import { Typography } from '@/components/common/typography/Typography';
import { ImageWithSkeleton } from '@/components/common/image/ImageWithSkeleton';
import { CommentsBlock } from '@/components/features/comments/CommentsBlock';
import { Button } from '@/components/ui/button';
import { CommentReplyProvider } from '@/contexts/CommentReplyContext';
import { useDeleteArticle } from '@/hooks/features/articles/useDeleteArticle';
import { useGetArticleById } from '@/hooks/features/articles/useGetArticleById';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useResponse } from '@/hooks/useResponse';
import { timeAgo } from '@/time-ago';
import { RequireRoles } from '../../hoc/RequireRoles';

export const ArticleDetailedPage = () => {
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
      <div className="flex w-full flex-col gap-8 lg:justify-between xl:flex-row xl:items-start">
        <div className="w-full min-w-0 xl:max-w-[720px]">
          <div className="flex flex-col gap-y-1">
            <Typography variant="3xl" weight="semibold">
              {article.title}
            </Typography>

            <div className="text-muted-foreground flex flex-wrap items-center gap-3">
              <Typography variant="sm">
                {timeAgo.format(new Date(article.createdAt))}
              </Typography>

              {article.discipline && (
                <>
                  <span>•</span>

                  <div className="flex items-center gap-x-2">
                    {article.discipline.mainImgUrl && (
                      <img
                        src={article.discipline.mainImgUrl}
                        alt={article.discipline.title}
                        className="size-8 rounded-sm object-cover p-1"
                        style={{
                          backgroundColor: article.discipline.bgColor,
                        }}
                      />
                    )}

                    <Typography variant="sm" weight="medium">
                      {article.discipline.title}
                    </Typography>
                  </div>
                </>
              )}
            </div>

            {article.previewText && (
              <Typography
                variant="lg"
                className="text-muted-foreground leading-relaxed"
              >
                {article.previewText}
              </Typography>
            )}

            <ImageWithSkeleton
              src={article.mainImgUrl}
              alt={article.title}
              className="mt-1.5 h-[220px] w-full rounded-md object-cover sm:h-[320px] lg:h-[420px]"
            />
          </div>

          <SeparatorLine className="my-3" />

          <div>
            {!article.paragraphs?.length ? (
              <div className="space-x-2 rounded-md border border-dashed p-8 text-center">
                <Typography variant="lg" weight="medium">
                  No content yet
                </Typography>

                <Typography
                  variant="base"
                  className="text-muted-foreground mt-2"
                >
                  This article does not contain any paragraphs yet.
                </Typography>
              </div>
            ) : (
              <div className="flex flex-col gap-y-4">
                {article.paragraphs.map((paragraph) => (
                  <article key={paragraph.id} className="flex flex-col gap-y-3">
                    {paragraph.title && (
                      <Typography variant="2xl" weight="semibold">
                        {paragraph.title}
                      </Typography>
                    )}

                    <Typography
                      paragraph
                      variant="md"
                      className="text-foreground/90 leading-8 whitespace-pre-wrap"
                    >
                      {paragraph.content}
                    </Typography>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4">
            <CommentsBlock source="article" id={Number(id)} />
          </div>
        </div>

        <aside className="w-full xl:sticky xl:top-20 xl:w-80 xl:flex-shrink-0">
          <div className="bg-card rounded-lg border p-5">
            <Typography variant="xl" weight="semibold">
              About the author
            </Typography>

            <SeparatorLine className="my-4" />

            <div className="flex items-center gap-3">
              {article.author?.profileImgUrl ? (
                <ImageWithSkeleton
                  src={article.author.profileImgUrl}
                  alt={article.author.username}
                  className="h-14 w-14 rounded-full object-cover"
                />
              ) : (
                <div className="bg-muted flex h-14 w-14 items-center justify-center rounded-full">
                  <Typography variant="lg" weight="semibold">
                    {article.author?.username?.[0]?.toUpperCase() ?? '?'}
                  </Typography>
                </div>
              )}

              <div className="flex flex-col">
                <Typography weight="semibold">
                  {article.author?.username ?? 'Unknown author'}
                </Typography>

                {article.author?.username && (
                  <Typography variant="sm" className="text-muted-foreground">
                    {article.author.roles.includes('admin')
                      ? 'Admin'
                      : article.author.roles.includes('editor')
                        ? 'Editor'
                        : 'Default peasant'}
                  </Typography>
                )}
              </div>
            </div>

            <SeparatorLine className="my-4" />

            <div className="space-y-3">
              <div className="flex items-center gap-x-2">
                <Typography
                  variant="sm"
                  weight="medium"
                  className="text-muted-foreground"
                >
                  Published
                </Typography>

                <Typography>
                  {new Date(article.createdAt).toLocaleDateString()}
                </Typography>
              </div>

              {article.updatedAt && article.updatedAt !== article.createdAt && (
                <div className="flex items-center gap-x-2">
                  <Typography
                    variant="sm"
                    weight="medium"
                    className="text-muted-foreground"
                  >
                    Updated
                  </Typography>

                  <Typography>
                    {new Date(article.updatedAt).toLocaleDateString()}
                  </Typography>
                </div>
              )}

              {article.discipline && (
                <div>
                  <Typography
                    variant="sm"
                    weight="medium"
                    className="text-muted-foreground"
                  >
                    Discipline
                  </Typography>

                  <div className="mt-1 flex items-center gap-2">
                    {article.discipline.mainImgUrl && (
                      <img
                        src={article.discipline.mainImgUrl}
                        alt={article.discipline.title}
                        className="h-6 w-6 rounded-sm object-cover"
                      />
                    )}

                    <Typography>{article.discipline.title}</Typography>
                  </div>
                </div>
              )}

              {article.paragraphs && article.paragraphs.length > 0 && (
                <div className="flex items-center gap-x-2">
                  <Typography
                    variant="sm"
                    weight="medium"
                    className="text-muted-foreground"
                  >
                    Sections
                  </Typography>

                  <Typography>{article?.paragraphs?.length}</Typography>
                </div>
              )}
            </div>
          </div>
          <RequireRoles roles={['admin', 'editor']}>
            <div className="mt-4 flex gap-2">
              <Button className="w-32" onClick={() => deleteArticle()}>
                {deletionPending ? <Spinner size="sm" /> : 'Delete article'}
              </Button>
            </div>
          </RequireRoles>
        </aside>
      </div>
    </CommentReplyProvider>
  );
};
