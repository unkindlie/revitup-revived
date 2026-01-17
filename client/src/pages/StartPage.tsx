import { useGetArticles } from '@/hooks/articles/useGetArticles';
import { useResponse } from '@/hooks/data-handling/useResponse';
import { Article } from '@/components/features/articles/Article';

export const StartPage = () => {
  const { isFetched, data: articlesResponse } = useGetArticles();
  const { data: articles } = useResponse(articlesResponse);

  if (!isFetched || !articles) return null;

  const newestArticle = articles[0];

  return (
    <div className="flex justify-between">
      <div className='max-w-1/2'>
        <Article article={newestArticle} size="lg" />
      </div>
      <div className="grid w-2/5 grid-cols-2 gap-x-3">
        {articles.slice(1).map((it) => (
          <Article key={it.id} article={it} size='md' />
        ))}
      </div>
    </div>
  );
};
