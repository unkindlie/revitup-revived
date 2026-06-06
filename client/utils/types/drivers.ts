import type { DisciplineShort } from './disciplines';

export type TDriverShort = {
  id: number;
  firstName: string;
  lastName: string;
  profileImgUrl?: string;
  disciplines: DisciplineShort[];
};

export type TDriverDetailed = TDriverShort & {
  country?: string;
  dateOfBirth?: string;
  number: number;
  biography?: string;
  images: {
    id: number;
    imageUrl: string;
  }[];
};
