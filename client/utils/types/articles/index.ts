import type { Paragraph } from '../paragraphs';

import type { DisciplineShort } from '../disciplines';

export type ArticleShort = {
  id: number;
  title: string;
  previewText: string | null;
  mainImgUrl: string;
  createdAt: string;
  status: string;
  discipline?: DisciplineShort;
};

export type ArticleDetailed = ArticleShort & {
  updatedAt: string | null;
  paragraphs?: Paragraph[];
  author?: {
    id: number;
    username: string;
    profileImgUrl?: string;
  };
};

export type ArticleCreate = {
  title: string;
  previewText?: string;
  text?: string;
  mainImgUrl?: string;
  disciplineId?: number;
};

export type ArticleRandom = Pick<ArticleShort, 'id' | 'title' | 'mainImgUrl'>;

export type ArticleEdit = Partial<ArticleCreate>;
