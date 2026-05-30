import type { TRaceEventShort } from '^/types/stats/race-events';

export type TRaceSeasonShort = {
  id: number;
  seasonYear: number;
  stages: number;
  discipline: {
    id: number;
    title: string;
    logoUrl: string;
  };
};

export type TRaceSeasonDetailed = {
  id: number;
  seasonYear: number;
  stages: number;
  discipline: {
    id: number;
    title: string;
    shortCode: string;
    logoUrl: string;
  };
  raceEvents: TRaceEventShort[];
};
