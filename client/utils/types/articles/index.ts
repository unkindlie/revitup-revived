export type ArticleShort = {
  id: string;
  title: string;
  previewText: string | null;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date | null;
};
