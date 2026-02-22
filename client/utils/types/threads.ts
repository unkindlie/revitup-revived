export type TThreadShort = {
  id: number;
  title: string;
  createdAt: Date;
  author: {
    id: number;
    username: string;
  };
};

export type TThreadDetailed = TThreadShort & {
  description: string;
};
