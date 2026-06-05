import type { Paragraph } from '../paragraphs';
import type { DisciplineShort } from '^/types/disciplines';

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
  updatedAt: Date | null;
  paragraphs?: Paragraph[];
};

export type ArticleCreate = {
  title: string;
  previewText?: string;
  text?: string;
  mainImgUrl?: string;
  disciplineId?: number;
};

export type ArticleEdit = Partial<ArticleCreate>;
