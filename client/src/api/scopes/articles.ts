import type { TResponse } from '^/types/response/response.type';
import type { ArticleShort } from '^/types/articles';
import { kyApi } from '../ky';

export async function getArticles(): Promise<TResponse<ArticleShort[]>> {
  const articles = await kyApi.get<TResponse<ArticleShort[]>>('articles');

  return await articles.json();
}
