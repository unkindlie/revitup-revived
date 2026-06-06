import type {
  TPaginatedResponse,
  TResponse,
} from '^/types/response/response.type';
import type {
  ArticleCreate,
  ArticleDetailed,
  ArticleShort,
  ArticleEdit,
  ArticleRandom,
} from '^/types/articles';
import { api } from '@/api';
import { backendPath } from '@/lib/routing/backend';
import type { Paragraph } from '../../../utils/types/paragraphs';

export async function getArticles(params?: {
  page?: number;
  take?: number;
}): Promise<TPaginatedResponse<ArticleShort>> {
  const articles = await api.get<TPaginatedResponse<ArticleShort>>(
    backendPath('ArticleBase', {}, params),
  );

  return await articles.json();
}

export async function getArticleById(
  id: number,
): Promise<TResponse<ArticleDetailed>> {
  const article = await api.get<TResponse<ArticleShort[]>>(
    backendPath('ArticleDetailed', {
      id,
    }),
  );

  return await article.json();
}

export async function getRandomArticle() {
  const article = await api.get<TResponse<ArticleRandom>>(
    backendPath('ArticleRandom'),
  );

  return await article.json();
}

export async function getMyDrafts() {
  const response =
    await api.get<TResponse<ArticleShort[]>>('articles/drafts/me');

  return response.json();
}

export async function getDraftArticleById(id: number) {
  const res = await api.get<TResponse<ArticleDetailed>>(
    `articles/drafts/${id}`,
  );

  return res.json();
}

export async function createArticle(article: ArticleCreate): Promise<void> {
  await api.post(backendPath('ArticleBase'), {
    json: article,
  });
}

export async function updateArticle(
  id: number,
  partialArticle: ArticleEdit,
  mainImage?: File,
  paragraphs?: Paragraph[],
): Promise<void> {
  const formData = new FormData();

  formData.append('title', partialArticle.title ?? '');
  formData.append('previewText', partialArticle.previewText ?? '');

  if (
    partialArticle.disciplineId !== undefined &&
    partialArticle.disciplineId !== null
  ) {
    formData.append('disciplineId', String(partialArticle.disciplineId));
  }

  if (mainImage) {
    formData.append('image', mainImage);
  }

  if (paragraphs) {
    formData.append('paragraphs', JSON.stringify(paragraphs));
  }

  await api.patch(`articles/update/${id}`, {
    body: formData,
  });
}

export async function publishArticle(id: number): Promise<void> {
  await api.patch(`articles/publish/${id}`);
}

export async function softDeleteArticle(id: number): Promise<void> {
  await api.delete(
    backendPath('ArticleSoftDelete', {
      id,
    }),
  );
}
