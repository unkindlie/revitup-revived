import { useParams } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { ThreadsContent } from '@/components/features/threads/index/ThreadsContent';
import { ThreadCreationDialog } from '@/components/features/threads/ThreadCreationDialog';
import { useThreadsByCategory } from '@/hooks/features/threads/useThreadsByCategory';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useResponse } from '@/hooks/useResponse';
import { ThreadCategoryIcon } from '../../components/features/threads/categories/ThreadCategoryIcon';

export const CategoryThreadsPage = () => {
  const { code } = useParams<{ code: string }>();
  const { data: threadsRes, isLoading } = useThreadsByCategory(code!);

  const { data } = useResponse(threadsRes);

  useDocumentTitle('Threads', {
    appNamed: true,
  });

  if (!data) return <span>cuh</span>;

  const { threads, category } = data;

  return (
    <div className="relative flex w-full flex-col gap-y-3.5">
      <div className="flex items-center space-x-3.5">
        <ThreadCategoryIcon {...category} />
        <div className="space-y-1">
          <Typography variant="3xl" weight="semibold">
            {category.name} threads
          </Typography>
          <Typography variant="lg">{category.description}</Typography>
        </div>
      </div>
      <ThreadsContent threads={threads} isLoading={isLoading} />
      <ThreadCreationDialog />
    </div>
  );
};
