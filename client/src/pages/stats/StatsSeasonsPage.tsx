import { useState } from 'react';
import { Typography } from '@/components/common/typography/Typography';
import { RaceSeasonItem } from '@/components/features/stats/race-seasons/RaceSeasonItem';
import { DisciplineSelect } from '@/components/features/disciplines/DisciplineSelect';
import { useRaceSeasons } from '@/hooks/features/stats/race-seasons/useRaceSeasons';
import { useResponse } from '@/hooks/useResponse';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { usePagination } from '../../hooks/ui/usePagination';
import { useSearchParams } from 'react-router';
import { PaginationControls } from '../../components/common/pagination/PaginationControls';

export const StatsSeasonsPage = () => {
  const { t } = useTranslation(['stats']);

  const [discipline, setDiscipline] = useState<string | undefined>();
  const [year, setYear] = useState<string | undefined>();

  const [searchParams, setSearchParams] = useSearchParams();

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

  const handlePageChange = (p: number) => {
    goToPage(p);
    setSearchParams({
      page: String(p),
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => String(currentYear - i));

  return (
    <div className="flex w-full flex-col space-y-4">
      {/* Header */}
      <div className="flex flex-col space-y-1">
        <Typography variant="3xl" weight="semibold">
          {t('raceSeasons.title')}
        </Typography>
        <Typography variant="lg">{t('raceSeasons.description')}</Typography>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
        <div className="w-full md:w-64">
          <DisciplineSelect
            onValueChange={(value) => setDiscipline(value || undefined)}
            value={discipline}
          />
        </div>

        <Select
          value={year ?? ''}
          onValueChange={(value) => setYear(value || undefined)}
        >
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="All years" />
          </SelectTrigger>

          <SelectContent position="popper" className="w-full">
            <SelectGroup>
              <SelectItem value="all">All years</SelectItem>

              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <button
          className="text-muted-foreground text-sm hover:underline"
          onClick={() => {
            setDiscipline(undefined);
            setYear(undefined);
          }}
        >
          Reset
        </button>
      </div>

      {/* GRID */}
      {seasons && (
        <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3">
          {seasons.items.map((season) => (
            <RaceSeasonItem key={season.id} {...season} />
          ))}
        </div>
      )}

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
