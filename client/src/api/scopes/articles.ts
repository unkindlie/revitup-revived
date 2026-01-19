import type { TResponse } from '^/types/response/response.type';
import type {
  ArticleCreate,
  ArticleDetailed,
  ArticleShort,
  ArticleEdit,
} from '^/types/articles';
import { api } from '@/api';
import { backendPath } from '@/lib/routing/backend';

export async function getArticles(): Promise<TResponse<ArticleShort[]>> {
  const articles = await api.get<TResponse<ArticleShort[]>>('articles');

  return await articles.json();
}

export async function getArticleById(
  id: string,
): Promise<TResponse<ArticleDetailed>> {
  const article = await api.get<TResponse<ArticleShort[]>>(
    backendPath('ArticleDetailed', {
      id,
    }),
  );

  return await article.json();
}

export async function createArticle(article: ArticleCreate): Promise<void> {
  await api.post(backendPath('ArticleBase'), {
    json: article,
  });
}

export async function updateArticle(
  id: string,
  partialArticle: ArticleEdit,
): Promise<void> {
  await api.patch(
    backendPath('ArticleUpdate', {
      id,
    }),
    {
      json: partialArticle,
    },
  );
}

export async function softDeleteArticle(id: string): Promise<void> {
  await api.delete(
    backendPath('ArticleSoftDelete', {
      id,
    }),
  );
}
