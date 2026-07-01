import { Link, useSearchParams } from 'react-router';

import { PaginationControls } from '@/components/common/pagination/PaginationControls';
import { CenteredSpinner } from '@/components/common/spinner/CenteredSpinner';
import { Typography } from '@/components/common/typography/Typography';
import { Article } from '@/components/features/articles/Article';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RequireRoles } from '@/hoc/RequireRoles';
import { useGetArticles } from '@/hooks/features/articles/useGetArticles';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { usePagination } from '@/hooks/ui/usePagination';
import { useResponse } from '@/hooks/useResponse';
import { useTranslation } from '@/hooks/useTranslation';
import { Pages } from '@/lib/routing/client';

export const ArticlesIndexPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);
  const search = searchParams.get('search') ?? undefined;

  const { t } = useTranslation(['articles']);

  useDocumentTitle(t('index.title'), { appNamed: true });

  const { data: articlesRes, isFetched } = useGetArticles(page, 9, search);
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

  return (
    <div className="flex w-full flex-col gap-y-4">
      <div className="flex w-full flex-row items-center justify-between">
        <Typography variant="3xl" weight="semibold">
          {t('index.title')}
        </Typography>
      </div>

      <div className="flex w-full flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <Input
          className="md:w-1/2"
          placeholder={t('index.search')}
          defaultValue={search ?? ''}
          onChange={(e) => updateQuery({ search: e.target.value || undefined })}
        />

        <RequireRoles roles={['admin', 'editor']}>
          <Link to={Pages.ArticlesDraft}>
            <Button>
              <Typography variant="md">{t('index.draft.title')}</Typography>
            </Button>
          </Link>
        </RequireRoles>
      </div>

      {articles && articles.items.length ? (
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3">
          {articles.items.map((article) => (
            <Article key={article.id} article={article} variant="card" />
          ))}
        </div>
      ) : isFetched ? (
        <Typography
          className="text-muted-foreground pt-10 text-center"
          variant="lg"
        >
          {t('index.noArticles')}
        </Typography>
      ) : (
        <div className="flex h-52 w-full items-center justify-center">
          <CenteredSpinner />
        </div>
      )}

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
