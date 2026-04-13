export type TThreadShort = {
  id: number;
  title: string;
  createdAt: Date;
  author: {
    id: number;
    username: string;
  };
  category: {
    id: number;
    name: string;
    color: string;
    shortCode: string;
  } | null;
};

export type TThreadDetailed = TThreadShort & {
  description: string;
};

export type TThreadCreate = Pick<TThreadDetailed, 'title' | 'description'>;
