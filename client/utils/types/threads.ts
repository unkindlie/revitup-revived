export type TThreadShort = {
  id: number;
  title: string;
  createdAt: Date;
  author: {
    id: number;
    username: string;
    profileImgUrl: string;
    roles: string[];
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

export type TThreadLatest = {
  id: number;
  title: string;
  category: {
    id: number;
    color: string;
  };
};

export type TThreadCreate = Pick<TThreadDetailed, 'title' | 'description'> & {
  categoryId: number;
};
