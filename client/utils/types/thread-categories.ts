import type { IconName } from 'lucide-react/dynamic';

import type { TThreadShort } from './threads';

export type TThreadCategoryShort = {
  id: number;
  name: string;
  color: string;
  icon: IconName;
  shortCode: string;
};

export type TThreadCategory = TThreadCategoryShort & {
  description: string;
};

export type TThreadsWithCategory = {
  category: TThreadCategory;
  threads: TThreadShort[];
}