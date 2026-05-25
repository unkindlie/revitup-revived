import { Article } from '@/components/features/articles/Article';
import { useGetArticles } from '@/hooks/features/articles/useGetArticles';
import { NoArticlesAvailable } from '@/components/features/main/NoArticlesAvailable';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useResponse } from '@/hooks/useResponse';
import { useIsMobile } from '../hooks/ui/useIsMobile';
import { cn } from '../lib/utils';

export const StartPage = () => {
  const { isFetched, data: articlesResponse } = useGetArticles();
  const { data: articles } = useResponse(articlesResponse);

  const isMobile = useIsMobile();

  useDocumentTitle('Your place of Motorsport', {
    appNamed: true,
  });

  if (!isFetched || !articles) return null;

  if (!articles.length) return <NoArticlesAvailable />;

  const newestArticle = articles[0];

  return (
    <div className="flex flex-col md:flex-row md:justify-between">
      <div className="md:max-w-4/9">
        <Article article={newestArticle} size="lg" />
      </div>
      <div
        className={cn(
          isMobile
            ? 'mt-6 flex w-full flex-col gap-y-4'
            : 'grid grid-cols-2 gap-y-2 md:w-2/5 md:gap-x-5 lg:gap-x-8',
        )}
      >
        {articles.slice(1).map((it) => (
          <Article key={it.id} article={it} size={isMobile ? 'sm' : 'md'} />
        ))}
      </div>
    </div>
  );
};
