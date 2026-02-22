import { Spinner } from '@/components/common/spinner/Spinner';
import { NoThreads } from '@/components/features/threads/NoThreads';
import { ThreadItem } from '@/components/features/threads/ThreadItem';
import { useThreads } from '@/hooks/features/threads/useThreads';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useResponse } from '@/hooks/useResponse';

export const ThreadsIndexPage = () => {
  const { data: threadsRes, isLoading } = useThreads();
  const { data: threads } = useResponse(threadsRes);

  useDocumentTitle('Threads', {
    appNamed: true,
  });

  if (isLoading) return <Spinner />;

  if (!threads?.length) return <NoThreads />;

  return (
    <div className="flex flex-col gap-y-3">
      {threads.map((it) => (
        <ThreadItem key={it.id} {...it} />
      ))}
    </div>
  );
};
