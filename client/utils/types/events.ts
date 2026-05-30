export type TEventShort = {
  id: number;
  title: string;
  mainImgUrl: string | null;
  startDate: Date;
  endDate: Date;
};

export type TEventDetailed = TEventShort & {
  description: string | null;
  location: string | null;
};

export type TEventCreate = Pick<
  TEventDetailed,
  'title' | 'startDate' | 'endDate'
> & {
  description?: string;
  location?: string;
  mainImage?: FileList;
};
