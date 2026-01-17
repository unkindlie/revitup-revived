import type { TResponse } from '^/types/response/response.type';
import type { ArticleDetailed, ArticleShort } from '^/types/articles';
import { kyApi } from '../ky';
import { backendPath } from '@/lib/routing/backend';

export async function getArticles(): Promise<TResponse<ArticleShort[]>> {
  const articles = await kyApi.get<TResponse<ArticleShort[]>>('articles');

  return await articles.json();
}

export async function getArticleById(
  id: string,
): Promise<TResponse<ArticleDetailed>> {
  const article = await kyApi.get<TResponse<ArticleShort[]>>(
    backendPath('ArticleDetailed', {
      id,
    }),
  );

  return await article.json();
}
