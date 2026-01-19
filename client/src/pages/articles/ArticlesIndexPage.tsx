import { ArticleCreateForm } from '@/components/features/articles/ArticleCreateForm';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const ArticlesIndexPage = () => {
  useDocumentTitle('Articles', {
    appNamed: true,
  });

  return <ArticleCreateForm />;
};
