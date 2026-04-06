import type { IconName } from 'lucide-react/dynamic';

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

export type TThreadCreate = Pick<TThreadDetailed, 'title' | 'description'>;

export type TThreadCategory = {
  id: number;
  name: string;
  color: string;
  icon: IconName;
};
