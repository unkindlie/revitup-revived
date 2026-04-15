import { CenteredSpinner } from '@/components/common/spinner/CenteredSpinner';
import { NoThreads } from '@/components/features/threads/NoThreads';
import { ThreadItem } from '@/components/features/threads/ThreadItem';

import type { TThreadShort } from '^/types/threads';

export const ThreadsContent = ({
  threads,
  isLoading,
}: {
  threads: TThreadShort[] | null;
  isLoading: boolean;
}) => {
  if (!threads || isLoading) return <CenteredSpinner />;

  if (threads && !threads.length) return <NoThreads />;

  return (
    <div className="flex flex-col gap-y-3">
      {threads.map((it) => (
        <ThreadItem key={it.id} {...it} />
      ))}
    </div>
  );
};
