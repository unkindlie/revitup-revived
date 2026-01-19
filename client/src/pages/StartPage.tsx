import { useGetArticles } from '@/hooks/features/articles/useGetArticles';
import { useResponse } from '@/hooks/useResponse';
import { Article } from '@/components/features/articles/Article';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Spinner } from '../components/common/spinner/Spinner';
import { Button } from '../components/ui/button';

export const StartPage = () => {
  const { isFetched, data: articlesResponse } = useGetArticles();
  const { data: articles } = useResponse(articlesResponse);

  useDocumentTitle('Your place of Motorsport', {
    appNamed: true,
  });

  if (!isFetched || !articles) return null;

  const newestArticle = articles[0];

  return (
    <div className="flex justify-between">
      <div className="max-w-1/2">
        <Article article={newestArticle} size="lg" />
        <Spinner size="sm" />
        <Button className='h-20'>
          <Spinner size="md" />
        </Button>
      </div>
      <div className="grid w-2/5 grid-cols-2 gap-x-3 gap-y-2">
        {articles.slice(1).map((it) => (
          <Article key={it.id} article={it} size="md" />
        ))}
      </div>
    </div>
  );
};
