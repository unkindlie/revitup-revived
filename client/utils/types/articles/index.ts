export type ArticleShort = {
  id: string;
  title: string;
  previewText: string | null;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type ArticleDetailed = ArticleShort & {
  text: string | null;
};

export type ArticleCreate = {
  title: string;
  previewText?: string;
  text?: string;
  imageUrl: string;
};

export type ArticleEdit = Partial<ArticleCreate>;
