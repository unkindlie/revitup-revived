import { useEffect, useMemo, useRef } from 'react';

import { SeparatorLine } from '@/components/common/separator/SeparatorLine';
import { Spinner } from '@/components/common/spinner/Spinner';
import { Typography } from '@/components/common/typography/Typography';
import { ThreadCategoryBlock } from '@/components/features/threads/categories/ThreadCategoryBlock';
import { ThreadsContent } from '@/components/features/threads/index/ThreadsContent';
import { ThreadCreationDialog } from '@/components/features/threads/ThreadCreationDialog';
import { useInfiniteThreads } from '../../hooks/features/threads/useInfiniteThreads';
import { useThreadCategories } from '@/hooks/features/threads/categories/useThreadCategories';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useResponse } from '@/hooks/useResponse';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationNamespaces } from '@/lib/translation';

export const ThreadsIndexPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteThreads();

  const { data: threadCategoriesRes } = useThreadCategories();

  const { data: threadCategories } = useResponse(threadCategoriesRes);

  const { t } = useTranslation([TranslationNamespaces.Threads]);

  useDocumentTitle('Threads', {
    appNamed: true,
  });

  const threads = useMemo(
    () => data?.pages.flatMap((page) => page.response.data?.items) ?? [],
    [data],
  );

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = loadMoreRef.current;

    if (!current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '200px',
      },
    );

    observer.observe(current);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="relative flex w-full flex-col gap-y-3">
      <Typography className="lg:hidden" variant="3xl" weight="semibold">
        {t('index.title')}
      </Typography>

      {threadCategories && (
        <div className="flex max-w-screen flex-col gap-y-2 md:max-w-[600px]">
          <div className="[&:has(> *:only-child)]:grid-rows-1 [&:has(> *:nth-child(n+2))]:grid-rows-2 grid grid-flow-col gap-2 overflow-auto">
            {threadCategories.map((category) => (
              <ThreadCategoryBlock key={category.id} {...category} />
            ))}
          </div>

          <div className="mx-2 mt-1">
            <SeparatorLine />
          </div>
        </div>
      )}

      <ThreadsContent threads={threads} isLoading={isLoading} />

      {!isLoading && (
        <>
          <div ref={loadMoreRef} className="h-6" />

          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <Spinner />
            </div>
          )}
        </>
      )}

      <ThreadCreationDialog />
    </div>
  );
};
