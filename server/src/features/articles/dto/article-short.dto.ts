import { Expose } from 'class-transformer';

export class ArticleShortDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  previewText: string | null;

  @Expose()
  mainImgUrl: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date | null;
}
