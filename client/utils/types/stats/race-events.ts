import type { TCircuitReference, TCircuitShort } from '^/types/circuits';
import type { TRaceSeasonDetailed } from '^/types/stats/race-seasons';

export type TRaceEventShort = {
  id: number;
  name: string;
  laps: number;
  eventStage: 1;
  startDate: string;
  endDate: string;
  circuit: TCircuitShort;
};

export type TRaceEventDetailed = {
  id: number;
  name: string;
  description: string;
  laps: number;
  eventStage: string;
  startDate: string;
  endDate: string;
  circuit: TCircuitReference;
  season: Omit<TRaceSeasonDetailed, 'raceEvents'>;
};
