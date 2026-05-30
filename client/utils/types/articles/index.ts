export type ArticleShort = {
  id: number;
  title: string;
  previewText: string | null;
  imageUrl: string;
  createdAt: string;
};

export type ArticleDetailed = ArticleShort & {
  text: string | null;
  updatedAt: Date | null;
};

export type ArticleCreate = {
  title: string;
  previewText?: string;
  text?: string;
  imageUrl: string;
};

export type ArticleEdit = Partial<ArticleCreate>;
