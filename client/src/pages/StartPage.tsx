import { Article } from '@/components/features/articles/Article';
import { useGetArticles } from '@/hooks/features/articles/useGetArticles';
import { NoArticlesAvailable } from '@/components/features/main/NoArticlesAvailable';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useResponse } from '@/hooks/useResponse';
import { useIsMobile } from '../hooks/ui/useIsMobile';
import { cn } from '../lib/utils';
import { useTranslation } from '../hooks/useTranslation';

export const StartPage = () => {
  const { isFetched, data: articlesResponse } = useGetArticles(1, 11);
  const { data: articles } = useResponse(articlesResponse);

  const { t } = useTranslation(['index']);

  const isMobile = useIsMobile();

  useDocumentTitle(t('start.pageTitle'), {
    appNamed: true,
  });

  if (!isFetched || !articles) return null;

  if (!articles.items.length) return <NoArticlesAvailable />;

  const newestArticle = articles.items[0];
  const featuredArticles = articles.items.slice(1, 5);
  const remainingArticles = articles.items.slice(5);

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="md:max-w-4/9">
          <Article article={newestArticle} size="lg" />
        </div>

        <div
          className={cn(
            isMobile
              ? 'mt-6 flex flex-col gap-y-4'
              : 'grid grid-cols-2 gap-4 md:w-2/5',
          )}
        >
          {featuredArticles.map((article) => (
            <Article
              key={article.id}
              article={article}
              size={isMobile ? 'sm' : 'md'}
            />
          ))}
        </div>
      </div>

      {remainingArticles.length > 0 && (
        <div
          className={cn(
            isMobile ? 'flex flex-col gap-y-4' : 'grid grid-cols-3 gap-6',
          )}
        >
          {remainingArticles.map((article) => (
            <Article
              key={article.id}
              article={article}
              size={isMobile ? 'sm' : 'md'}
            />
          ))}
        </div>
      )}
    </div>
  );
};
