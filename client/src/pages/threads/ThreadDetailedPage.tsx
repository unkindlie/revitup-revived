import { useParams } from 'react-router';
import TimeAgo from 'javascript-time-ago';

import { SeparatorLine } from '@/components/common/separator/SeparatorLine';
import { Spinner } from '@/components/common/spinner/Spinner';
import { Typography } from '@/components/common/typography/Typography';
import { ThreadNotFound } from '@/components/features/threads/ThreadNotFound';
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

  const { title, description, createdAt, author } = thread;

  return (
    <div className="flex flex-col gap-y-2 md:w-[720px]">
      <div>
        <Typography variant="lg">Category</Typography>
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
      <Typography variant="lg">{description}</Typography>
    </div>
  );
};
