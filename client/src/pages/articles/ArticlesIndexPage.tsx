import { Link, useSearchParams } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { ArticleCreateForm } from '@/components/features/articles/ArticleCreateForm';
import { RequireRoles } from '@/hoc/RequireRoles';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useGetArticles } from '../../hooks/features/articles/useGetArticles';
import { useResponse } from '../../hooks/useResponse';
import { usePagination } from '../../hooks/ui/usePagination';
import { Article } from '../../components/features/articles/Article';
import { PaginationControls } from '../../components/common/pagination/PaginationControls';
import { Input } from '../../components/ui/input';
import { useTranslation } from '../../hooks/useTranslation';

export const ArticlesIndexPage = () => {
  useDocumentTitle('Articles', { appNamed: true });

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);
  const search = searchParams.get('search') ?? undefined;

  const { t } = useTranslation(['articles']);

  const { data: articlesRes, isFetched } = useGetArticles(page, 10, search);
  const { data: articles } = useResponse(articlesRes);

  const { currentPage, totalPages, hasPreviousPage, hasNextPage, goToPage } =
    usePagination({
      initialPage: page,
      pageSize: articles?.query.take,
      totalPages: articles?.query.totalPages,
    });

  const handlePageChange = (p: number) => {
    goToPage(p);
    setSearchParams({ page: String(p) });
  };

  const updateQuery = (patch: Record<string, string | number | undefined>) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(patch).forEach(([key, value]) => {
      if (!value) next.delete(key);
      else next.set(key, String(value));
    });

    next.set('page', '1');
    setSearchParams(next);
  };

  if (!isFetched || !articles) return null;

  return (
    <div className="flex w-full flex-col gap-y-4">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex w-full items-center justify-between">
          <div className="space-y-1">
            <Typography variant="3xl" weight="semibold">
              {t('index.title')}
            </Typography>
            <Typography>{t('index.description')}</Typography>
          </div>
          <Input
            className="w-1/2"
            placeholder={t('index.search')}
            defaultValue={search ?? ''}
            onChange={(e) =>
              updateQuery({ search: e.target.value || undefined })
            }
          />
        </div>

        <RequireRoles roles={['admin', 'editor']}>
          <div className="space-y-1 space-x-1 text-right">
            <Link to="/articles/draft">
              <Typography>{t('index.draft.title')}</Typography>
            </Link>
            <ArticleCreateForm />
          </div>
        </RequireRoles>
      </div>

      <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3">
        {articles.items.map((article) => (
          <Article key={article.id} article={article} variant="card" />
        ))}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
