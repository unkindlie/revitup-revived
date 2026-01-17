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
