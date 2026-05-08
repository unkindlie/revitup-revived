export type TEventShort = {
  id: number;
  title: string;
  imgUrl: string | null;
  startDate: Date;
  endDate: Date;
};

export type TEventDetailed = TEventShort & {
  description: string | null;
  location: string | null;
};
