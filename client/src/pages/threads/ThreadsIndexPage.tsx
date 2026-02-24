import { Spinner } from '@/components/common/spinner/Spinner';
import { Typography } from '@/components/common/typography/Typography';
import { NoThreads } from '@/components/features/threads/NoThreads';
import { ThreadCreationDialog } from '@/components/features/threads/ThreadCreationDialog';
import { ThreadItem } from '@/components/features/threads/ThreadItem';
import { useThreads } from '@/hooks/features/threads/useThreads';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useResponse } from '@/hooks/useResponse';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationNamespaces } from '@/lib/translation';

export const ThreadsIndexPage = () => {
  const { data: threadsRes, isLoading } = useThreads();
  const { data: threads } = useResponse(threadsRes);
  const { t } = useTranslation([TranslationNamespaces.Threads]);

  useDocumentTitle('Threads', {
    appNamed: true,
  });

  if (isLoading) return <Spinner />;

  if (!threads?.length) return <NoThreads />;

  return (
    <div className="relative flex w-full flex-col gap-y-3">
      <Typography className="lg:hidden" variant="3xl" weight="semibold">
        {t('index.title')}
      </Typography>
      {threads.map((it) => (
        <ThreadItem key={it.id} {...it} />
      ))}
      <ThreadCreationDialog />
    </div>
  );
};
