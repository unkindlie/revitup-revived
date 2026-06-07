import { useMemo, useState } from 'react';

import { Typography } from '@/components/common/typography/Typography';
import { cn } from '@/lib/utils';

import type { TRaceClassification } from '^/types/stats/race-classification';
import { Pages, path } from '../../../../lib/routing/client';
import { Link } from 'react-router';

type SortKey =
  | 'position'
  | 'entryNumber'
  | 'name'
  | 'car'
  | 'time'
  | 'fastestLap'
  | 'driver';

type SortDirection = 'asc' | 'desc';

const formatRaceTime = (timeMs: number) => {
  const minutes = Math.floor(timeMs / 60000);
  const seconds = ((timeMs % 60000) / 1000).toFixed(3);
  return `${minutes}:${seconds.padStart(6, '0')}`;
};

export const RaceClassificationTable = ({
  classifications,
}: {
  classifications: TRaceClassification[];
}) => {
  const [sortKey, setSortKey] = useState<SortKey>('position');
  const [direction, setDirection] = useState<SortDirection>('asc');

  const sorted = useMemo(() => {
    const data = [...classifications];

    const getValue = (c: TRaceClassification, key: SortKey) => {
      switch (key) {
        case 'position':
          return c.finishPosition;
        case 'entryNumber':
          return c.raceEntry.entryNumber;
        case 'name':
          return c.raceEntry.name;
        case 'car':
          return c.raceEntry.car;
        case 'time':
          return c.timeMs ?? 0;
        case 'fastestLap':
          return c.isFastestLap ? 1 : 0;
        case 'driver':
          return c.driver?.lastName ?? 'Unknown';
      }
    };

    return data.sort((a, b) => {
      const aVal = getValue(a, sortKey);
      const bVal = getValue(b, sortKey);

      if (typeof aVal === 'string') {
        return direction === 'asc'
          ? aVal.localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal);
      }

      return direction === 'asc'
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  }, [classifications, sortKey, direction]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setDirection('asc');
    }
  };

  const Header = ({
    label,
    sortKey: key,
  }: {
    label: string;
    sortKey: SortKey;
  }) => (
    <th
      className="cursor-pointer px-4 py-3 text-left select-none"
      onClick={() => toggleSort(key)}
    >
      {label} {sortKey === key && (direction === 'asc' ? '↑' : '↓')}
    </th>
  );

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <Header label="Pos" sortKey="position" />
            <Header label="#" sortKey="entryNumber" />
            <Header label="Entry" sortKey="name" />
            <Header label="Car" sortKey="car" />
            <Header label="Time" sortKey="time" />
            <Header label="FL" sortKey="fastestLap" />
            <Header label="Driver" sortKey="driver" />
          </tr>
        </thead>

        <tbody>
          {sorted.map((c) => (
            <tr
              key={c.id}
              className={cn(
                'border-t',
                c.finishPosition === 1 && 'bg-yellow-500/10',
                c.finishPosition === 2 && 'bg-slate-500/10',
                c.finishPosition === 3 && 'bg-orange-500/10',
              )}
            >
              <td className="px-4 py-2 font-semibold">{c.finishPosition}</td>

              <td className="px-4 py-2">{c.raceEntry.entryNumber}</td>

              <td className="px-4 py-2">{c.raceEntry.name}</td>

              <td className="px-4 py-2">{c.raceEntry.car}</td>

              <td className="px-4 py-2">
                {c.earlyEndResult ? (
                  <Typography destructive>{c.earlyEndResult}</Typography>
                ) : (
                  formatRaceTime(c.timeMs)
                )}
              </td>

              <td className="px-4 py-2 text-center">
                {c.isFastestLap ? '🟣' : '-'}
              </td>

              <td>
                {c.driver ? (
                  <Link
                    to={path(Pages.DriverDetailed, {
                      id: c.driver.id,
                    })}
                    className="font-medium hover:underline"
                  >
                    {c.driver.firstName} {c.driver.lastName}
                  </Link>
                ) : (
                  'Unknown'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
