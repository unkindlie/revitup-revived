import { useSearchParams } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { CenteredSpinner } from '@/components/common/spinner/CenteredSpinner';
import { PaginationControls } from '@/components/common/pagination/PaginationControls';
import { Input } from '@/components/ui/input';

import { DisciplineSelect } from '@/components/features/disciplines/DisciplineSelect';
import { DriverCard } from '../../components/features/drivers/DriverCard';

import { useDrivers } from '@/hooks/features/drivers/useDrivers';
import { useResponse } from '@/hooks/useResponse';
import { usePagination } from '@/hooks/ui/usePagination';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useTranslation } from '../../hooks/useTranslation';

export const DriversIndexPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const discipline = Number(searchParams.get('discipline')) || undefined;
  const search = searchParams.get('search') ?? undefined;

  const {
    data: driversRes,
    isFetched,
    isLoading,
  } = useDrivers({
    page,
    take: 12,
    discipline,
    search,
  });
  const { t } = useTranslation(['drivers']);

  const { data: drivers } = useResponse(driversRes);

  useDocumentTitle(t('index.title'), { appNamed: true });

  const { currentPage, totalPages, hasNextPage, hasPreviousPage, goToPage } =
    usePagination({
      initialPage: page,
      pageSize: drivers?.query?.take,
      totalPages: drivers?.query?.totalPages,
    });

  const updateQuery = (patch: Record<string, string | number | undefined>) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(patch).forEach(([key, value]) => {
      if (!value) next.delete(key);
      else next.set(key, String(value));
    });

    next.set('page', '1');
    setSearchParams(next);
  };

  const onPageChange = (p: number) => {
    goToPage(p);

    const next = new URLSearchParams(searchParams);
    next.set('page', String(p));
    setSearchParams(next);
  };

  if (!isFetched || !drivers) return <CenteredSpinner />;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Typography variant="3xl" weight="semibold">
          {t('index.title')}
        </Typography>

        <Typography className="text-muted-foreground">
          {t('index.description')}
        </Typography>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <Input
          placeholder={t('index.search')}
          defaultValue={search ?? ''}
          onChange={(e) => updateQuery({ search: e.target.value || undefined })}
        />

        <div className="w-full md:w-64">
          <DisciplineSelect
            defaultValue={discipline?.toString()}
            onValueChange={(value) =>
              updateQuery({ discipline: value || undefined })
            }
          />
        </div>
        <button
          className="text-muted-foreground text-sm hover:underline"
          onClick={() => setSearchParams(undefined)}
        >
          {t('index.reset')}
        </button>
      </div>

      <div className="relative">
        <div
          className={`grid grid-cols-1 gap-4 transition-opacity md:grid-cols-2 lg:grid-cols-3 ${
            isLoading ? 'opacity-60' : 'opacity-100'
          }`}
        >
          {drivers?.items?.map((driver) => (
            <DriverCard key={driver.id} driver={driver} />
          ))}
        </div>

        {isLoading && (
          <div className="bg-background/60 absolute inset-0 flex items-center justify-center backdrop-blur-sm">
            <CenteredSpinner />
          </div>
        )}
      </div>

      {drivers && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
