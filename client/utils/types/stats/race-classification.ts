import type { TRaceEntry } from './race-entry';

export type TRaceClassification = {
  id: number;
  timeMs: number;
  finishPosition: number;
  isFastestLap: boolean;
  earlyEndResult: string | null;
  raceEntry: TRaceEntry;

  driver: {
    id: number;
    firstName: string;
    lastName: string;
    driverNumber: number | null;
    profileImgUrl: string | null;
  } | null;
};
