import { TRaceEntry } from './race-entry';

export type TRaceClassification = {
  id: number;
  timeMs: number;
  finishPosition: number;
  isFastestLap: boolean;
  earlyEndResult: string | null;
  raceEntry: TRaceEntry;
};
