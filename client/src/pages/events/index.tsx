import { useSearchParams } from 'react-router';

import { CenteredSpinner } from '@/components/common/spinner/CenteredSpinner';
import { Typography } from '@/components/common/typography/Typography';
import { PaginationControls } from '@/components/common/pagination/PaginationControls';
import { EventCard } from '@/components/features/events/EventCard';
import { useResponse } from '@/hooks/useResponse';
import { useTranslation } from '@/hooks/useTranslation';
import { useEvents } from '@/hooks/features/events/useEvents';
import { usePagination } from '@/hooks/ui/usePagination';
import { TranslationNamespaces } from '@/lib/translation';

export const EventsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: eventsRes, isFetched } = useEvents(
    Number(searchParams.get('page') ?? 1),
  );

  const { t } = useTranslation([TranslationNamespaces.Events]);
  const { data: events } = useResponse(eventsRes);

  const { currentPage, totalPages, hasPreviousPage, hasNextPage, goToPage } =
    usePagination({
      initialPage: Number(searchParams.get('page')) || 1,
      pageSize: events?.query.take,
      totalPages: events?.query.totalPages,
    });

  const handlePageChange = (page: number) => {
    goToPage(page);
    setSearchParams({ page: String(page) });
  };

  return (
    <div className="flex w-full flex-col gap-y-2.5">
      <Typography variant="3xl" weight="semibold">
        {t('index.title')}
      </Typography>
      {isFetched && events ? (
        <>
          <div className="flex w-full flex-col gap-y-4 md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-3">
            {events.items?.map((ev) => (
              <EventCard key={ev.id} {...ev} />
            ))}
          </div>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            hasPreviousPage={hasPreviousPage}
            hasNextPage={hasNextPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <CenteredSpinner />
      )}
    </div>
  );
};
