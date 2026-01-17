import { Expose } from 'class-transformer';

export class ArticleShortDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  previewText: string | null;

  @Expose()
  imageUrl: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date | null;
}
