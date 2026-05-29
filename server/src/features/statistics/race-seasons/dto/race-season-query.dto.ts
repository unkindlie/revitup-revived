export type RaceSeasonQueryDto = {
  seasonYear?: number;
  discipline?: {
    shortCode: string;
  };
};
