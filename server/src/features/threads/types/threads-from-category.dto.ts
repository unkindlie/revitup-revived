import { ThreadCategory } from 'features/thread-categories/thread-category.entity';

export class ThreadsFromCategoryDto {
  category: ThreadCategory;
  threads: Array<{
    id: number;
    title: string;
    createdAt: Date;
    author: {
      id: number;
      username: string;
    };
  }>;
}
