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

export const ArticlesIndexPage = () => {
  useDocumentTitle('Articles', { appNamed: true });

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);

  const { data: articlesRes, isFetched } = useGetArticles(page);
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

  if (!isFetched || !articles) return null;

  return (
    <div className="flex w-full flex-col gap-y-4">
      <div className="flex w-full flex-row justify-between">
        <div className="space-y-1">
          <Typography variant="3xl" weight="semibold">
            Articles
          </Typography>
          <Typography>Check any article you like</Typography>
        </div>

        <RequireRoles roles={['admin', 'editor']}>
          <div className="space-x-3">
            <Link to="/articles/draft">
              <Typography>My drafts</Typography>
            </Link>
            <ArticleCreateForm />
          </div>
        </RequireRoles>
      </div>

      <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3">
        {articles.items.map((article) => (
          <Article key={article.id} article={article} />
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
