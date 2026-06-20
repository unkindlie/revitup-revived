import { Link, useParams } from 'react-router';

import { SeparatorLine } from '@/components/common/separator/SeparatorLine';
import { Spinner } from '@/components/common/spinner/Spinner';
import { Typography } from '@/components/common/typography/Typography';
import { CommentsBlock } from '@/components/features/comments/CommentsBlock';
import { ThreadNotFound } from '@/components/features/threads/ThreadNotFound';
import { CommentReplyProvider } from '@/contexts/CommentReplyContext';
import { useThreadById } from '@/hooks/features/threads/useThreadById';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useResponse } from '@/hooks/useResponse';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationNamespaces } from '@/lib/translation';
import { timeAgo } from '@/time-ago';
import { ImageWithSkeleton } from '../../components/common/image/ImageWithSkeleton';

export const ThreadDetailedPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: threadRes, isLoading } = useThreadById(id!);
  const { t } = useTranslation([TranslationNamespaces.Threads]);
  const { data: thread } = useResponse(threadRes);

  useDocumentTitle(thread?.title || 'Thread loading...', {
    appNamed: true,
  });

  if (isLoading) return <Spinner />;
  if (!thread) return <ThreadNotFound />;

  const { title, description, createdAt, author, category } = thread;

  return (
    <CommentReplyProvider>
      <div className="flex w-full flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1 xl:max-w-[720px]">
          <div className="space-y-2">
            {category && (
              <div className="text-muted-foreground flex items-center gap-2">
                <Link to="/threads">
                  <Typography variant="sm" weight="medium">
                    {t('detailed.index')}
                  </Typography>
                </Link>

                <span>/</span>

                <Link to={`/threads/by-category/${category.shortCode}`}>
                  <Typography variant="sm" weight="medium">
                    {category.name}
                  </Typography>
                </Link>
              </div>
            )}

            <Typography variant="3xl" weight="semibold">
              {title}
            </Typography>

            <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-2">
              <Typography variant="sm">
                {t('detailed.info.author', {
                  author: author.username,
                })}
              </Typography>

              <Typography
                variant="sm"
                title={new Date(createdAt).toLocaleString()}
              >
                {timeAgo.format(new Date(createdAt))}
              </Typography>
            </div>
          </div>

          <SeparatorLine className="my-4" />

          <div className="flex flex-col gap-y-4">
            {description.split('\n\n').map((p, i) => (
              <Typography
                key={i}
                variant="md"
                className="text-foreground/90 leading-7"
              >
                {p}
              </Typography>
            ))}
          </div>

          <div className="mt-6">
            <CommentsBlock source="thread" id={Number(id)} />
          </div>
        </div>

        <aside className="w-full xl:sticky xl:top-20 xl:w-80">
          <div className="bg-card rounded-lg border p-4">
            <Typography variant="lg" weight="semibold">
              {t('detailed.info.title')}
            </Typography>

            <SeparatorLine className="my-3" />

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                {thread.author?.profileImgUrl ? (
                  <ImageWithSkeleton
                    src={thread.author.profileImgUrl}
                    alt={thread.author.username}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="bg-muted flex h-14 w-14 items-center justify-center rounded-full">
                    <Typography variant="lg" weight="semibold">
                      {thread.author?.username?.[0]?.toUpperCase() ?? '?'}
                    </Typography>
                  </div>
                )}

                <div className="flex flex-col">
                  <Typography weight="semibold">
                    {thread.author?.username ?? 'Unknown author'}
                  </Typography>

                  {thread.author?.username && (
                    <Typography variant="sm" className="text-muted-foreground">
                      {thread.author.roles.includes('admin')
                        ? t('components.roles.admin', { ns: 'common' })
                        : thread.author.roles.includes('editor')
                          ? t('components.roles.editor', { ns: 'common' })
                          : t('components.roles.user', { ns: 'common' })}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-x-2">
                <Typography variant="sm" className="text-muted-foreground">
                  {t('detailed.info.created')}
                </Typography>
                <Typography>
                  {new Date(createdAt).toLocaleDateString()}
                </Typography>
              </div>

              {category && (
                <div className="flex items-center gap-x-2">
                  <Typography variant="sm" className="text-muted-foreground">
                    {t('detailed.info.category')}
                  </Typography>
                  <Typography>{category.name}</Typography>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </CommentReplyProvider>
  );
};
