import { useSearchParams } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { PaginationControls } from '@/components/common/pagination/PaginationControls';
import { DisciplineSelect } from '@/components/features/disciplines/DisciplineSelect';
import { RaceSeasonItem } from '@/components/features/stats/race-seasons/RaceSeasonItem';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRaceSeasons } from '@/hooks/features/stats/race-seasons/useRaceSeasons';
import { useResponse } from '@/hooks/useResponse';
import { useTranslation } from '@/hooks/useTranslation';
import { usePagination } from '@/hooks/ui/usePagination';

export const StatsSeasonsPage = () => {
  const { t } = useTranslation(['stats']);

  const [searchParams, setSearchParams] = useSearchParams();

  const discipline = searchParams.get('discipline') ?? undefined;
  const year = searchParams.get('year') ?? undefined;
  const page = Number(searchParams.get('page') ?? 1);

  const { data: seasonsRes } = useRaceSeasons({
    discipline,
    year,
    page,
  });

  const { data: seasons } = useResponse(seasonsRes);

  const { currentPage, totalPages, hasPreviousPage, hasNextPage, goToPage } =
    usePagination({
      initialPage: page,
      pageSize: seasons?.query.take,
      totalPages: seasons?.query.totalPages,
    });

  const updateSearchParams = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    goToPage(newPage);

    updateSearchParams({
      page: String(newPage),
    });
  };

  const handleDisciplineChange = (value: string) => {
    updateSearchParams({
      discipline: value,
      page: '1',
    });
  };

  const handleYearChange = (value: string) => {
    updateSearchParams({
      year: value === 'all' ? undefined : value,
      page: '1',
    });
  };

  const resetFilters = () => {
    setSearchParams({
      page: '1',
    });
  };

  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 10 }, (_, i) => `${currentYear - i}`);

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <Typography variant="3xl" weight="semibold">
          {t('raceSeasons.title')}
        </Typography>

        <Typography variant="lg">{t('raceSeasons.description')}</Typography>
      </div>

      <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="w-full md:w-64">
            <DisciplineSelect
              key={discipline ?? 'empty'}
              value={discipline}
              onValueChange={handleDisciplineChange}
            />
          </div>

          <Select value={year ?? 'all'} onValueChange={handleYearChange}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder={t('base.years.all')} />
            </SelectTrigger>

            <SelectContent position="popper">
              <SelectGroup>
                <SelectItem value="all">{t('base.years.all')}</SelectItem>

                {years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <button
          className="text-muted-foreground text-sm hover:underline"
          onClick={resetFilters}
        >
          {t('base.reset')}
        </button>
      </div>

      {seasons && (
        <>
          <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3">
            {seasons.items.map((season) => (
              <RaceSeasonItem key={season.id} {...season} />
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
      )}
    </div>
  );
};
