import { Link, useParams } from 'react-router';
import TimeAgo from 'javascript-time-ago';

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

export const ThreadDetailedPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: threadRes, isLoading } = useThreadById(id!);
  const { t } = useTranslation([TranslationNamespaces.Threads]);

  const { data: thread } = useResponse(threadRes);

  const ago = new TimeAgo('en');

  useDocumentTitle(thread?.title || 'Thread loading...', {
    appNamed: true,
  });

  if (isLoading) return <Spinner />;

  if (!thread) return <ThreadNotFound />;

  const { title, description, createdAt, author, category } = thread;

  return (
    <CommentReplyProvider>
      <div className="flex flex-col gap-y-2 md:w-[720px]">
        <div>
          {category && (
            <div className="space-x-1">
              <Link to={`/threads`}>
                <Typography variant="lg">Threads</Typography>
              </Link>
              <Typography>/</Typography>
              <Link to={`/threads/by-category/${category.shortCode}`}>
                <Typography variant="lg">{category.name}</Typography>
              </Link>
            </div>
          )}
          <Typography variant="3xl" weight="semibold">
            {title}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography>
            {t('detailed.info.author', { author: author.username })}
          </Typography>
          <Typography title={new Date(createdAt).toLocaleString()}>
            {ago.format(new Date(createdAt))}
          </Typography>
        </div>
        <SeparatorLine className="mx-4" />
        <div className="flex flex-col gap-y-2">
          {description.split(`\n\n`).map((p, i) => (
            <Typography key={i} variant="md">
              {p}
            </Typography>
          ))}
        </div>
        <div className="mt-2 md:max-w-[575px] lg:w-[700px]">
          <CommentsBlock source="thread" id={1} />
        </div>
      </div>
    </CommentReplyProvider>
  );
};
