import { Link } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { Spinner } from '@/components/common/spinner/Spinner';
import { Pages, path } from '@/lib/routing/client';

import { useLatestThreads } from '@/hooks/features/threads/useLatestThreads';
import { useResponse } from '@/hooks/useResponse';

export const LatestThreads = () => {
  const { data: threadsRes, isLoading } = useLatestThreads();
  const { data: threads } = useResponse(threadsRes);

  return (
    <div className="bg-card h-fit w-full rounded-lg border p-4">
      <Typography variant="xl" weight="semibold">
        Latest Threads
      </Typography>

      <div className="mt-4">
        {isLoading ? (
          <div className="flex justify-center py-6">
            <Spinner />
          </div>
        ) : !threads?.length ? (
          <Typography
            variant="sm"
            className="text-muted-foreground text-center"
          >
            No threads yet
          </Typography>
        ) : (
          <div className="flex flex-col gap-3">
            {threads.map((thread) => (
              <Link
                key={thread.id}
                to={path(Pages.ThreadDetailed, {
                  id: thread.id,
                })}
                className="hover:bg-muted/50 rounded-md p-2 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <div
                    className="mt-1 h-3 w-3 flex-shrink-0 rounded-full"
                    style={{
                      backgroundColor:
                        thread.category?.color ?? 'var(--muted-foreground)',
                    }}
                  />

                  <Typography
                    variant="sm"
                    weight="medium"
                    className="line-clamp-2"
                  >
                    {thread.title}
                  </Typography>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
