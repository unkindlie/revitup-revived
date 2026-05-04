import { Article } from '@/components/features/articles/Article';
import { useGetArticles } from '@/hooks/features/articles/useGetArticles';
import { NoArticlesAvailable } from '@/components/features/main/NoArticlesAvailable';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useResponse } from '@/hooks/useResponse';

export const StartPage = () => {
  const { isFetched, data: articlesResponse } = useGetArticles();
  const { data: articles } = useResponse(articlesResponse);

  useDocumentTitle('Your place of Motorsport', {
    appNamed: true,
  });

  if (!isFetched || !articles) return null;

  if (!articles.length) return <NoArticlesAvailable />;

  const newestArticle = articles[0];

  return (
    <div className="flex flex-col gap-y-2 md:flex-row md:justify-between">
      <div className="md:max-w-1/2">
        <Article article={newestArticle} size="lg" />
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 md:w-2/5">
        {articles.slice(1).map((it) => (
          <Article key={it.id} article={it} size="md" />
        ))}
      </div>
    </div>
  );
};
