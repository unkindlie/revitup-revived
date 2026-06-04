import { Link } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { ArticleCreateForm } from '@/components/features/articles/ArticleCreateForm';
import { RequireRoles } from '@/hoc/RequireRoles';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const ArticlesIndexPage = () => {
  useDocumentTitle('Articles', {
    appNamed: true,
  });

  return (
    <div className="flex w-full flex-row justify-between">
      <div className="space-y-1">
        <Typography variant="3xl" weight="semibold">
          Articles
        </Typography>
        <Typography>Check any article you like</Typography>
      </div>
      <RequireRoles roles={['admin', 'editor']}>
        <div className="space-x-3">
          <Link to={'/articles/draft'}>
            <Typography>My drafts</Typography>
          </Link>
          <ArticleCreateForm />
        </div>
      </RequireRoles>
    </div>
  );
};
