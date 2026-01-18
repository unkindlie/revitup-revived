import type { ArticleShort } from '^/types/articles';
import { Typography } from '@/components/common/typography/Typography';
import { cn } from '@/lib/utils';
import { Link } from 'react-router';
import { path } from '@/lib/routing/client';

type Sizes = 'sm' | 'md' | 'lg';

type ArticleProps = {
  article: ArticleShort;
  size?: Sizes;
};

export const Article = ({ article, size = 'sm' }: ArticleProps) => {
  return (
    <Link
      to={path('ArticleDetailed', { id: article.id })}
      className="flex flex-col gap-y-2"
    >
      <img
        className={cn('rounded-md')}
        alt={article.title}
        src={article.imageUrl}
        title={article.title}
      />
      <Typography variant="3xl" weight="semibold">
        {article.title}
      </Typography>
      {size !== 'sm' && (
        <Typography variant="lg" className="text-black/85">
          {article.previewText ?? 'More to follow...'}
        </Typography>
      )}
    </Link>
  );
};
