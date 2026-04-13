import { SeparatorLine } from '@/components/common/separator/SeparatorLine';
import { Typography } from '@/components/common/typography/Typography';
import { ThreadCategoryBlock } from '@/components/features/threads/categories/ThreadCategoryBlock.tsx';
import { ThreadsContent } from '@/components/features/threads/index/ThreadsContent';
import { ThreadCreationDialog } from '@/components/features/threads/ThreadCreationDialog';
import { useThreads } from '@/hooks/features/threads/useThreads';
import { useThreadCategories } from '@/hooks/features/threads/categories/useThreadCategories.ts';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useResponse } from '@/hooks/useResponse';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationNamespaces } from '@/lib/translation';

export const ThreadsIndexPage = () => {
  const { data: threadsRes, isLoading } = useThreads();
  const { data: threadCategoriesRes } = useThreadCategories();

  const { data: threads } = useResponse(threadsRes);
  const { data: threadCategories } = useResponse(threadCategoriesRes);

  const { t } = useTranslation([TranslationNamespaces.Threads]);

  useDocumentTitle('Threads', {
    appNamed: true,
  });

  return (
    <div className="relative flex w-full flex-col gap-y-3">
      <Typography className="lg:hidden" variant="3xl" weight="semibold">
        {t('index.title')}
      </Typography>
      {threadCategories && (
        <div className="flex max-w-screen flex-col gap-y-2 md:max-w-[600px]">
          <div className="[&:has(> *:only-child)]:grid-rows-1 [&:has(> *:nth-child(n+2))]:grid-rows-2 grid grid-flow-col gap-2 overflow-auto">
            {threadCategories.map((it) => (
              <ThreadCategoryBlock key={it.id} {...it} />
            ))}
          </div>
          <SeparatorLine />
        </div>
      )}
      <ThreadsContent threads={threads} isLoading={isLoading} />
      <ThreadCreationDialog />
    </div>
  );
};
