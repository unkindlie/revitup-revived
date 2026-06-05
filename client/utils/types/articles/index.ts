import type { Paragraph } from '../paragraphs';

export type ArticleShort = {
  id: number;
  title: string;
  previewText: string | null;
  mainImgUrl: string;
  createdAt: string;
  status: string;
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
};

export type ArticleEdit = Partial<ArticleCreate>;
