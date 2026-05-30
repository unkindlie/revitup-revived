import type { TRaceEventShort } from '^/types/stats/race-events';

export type TRaceSeasonShort = {
  id: number;
  seasonYear: number;
  stages: number;
  discipline: {
    id: number;
    title: string;
    mainImgUrl: string;
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
    mainImgUrl: string;
  };
  raceEvents: TRaceEventShort[];
};
