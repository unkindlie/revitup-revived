import type { ArticleShort } from '^/types/articles';
import { Typography } from '@/components/common/typography/Typography';
import { cn } from '@/lib/utils';

type Sizes = 'sm' | 'md' | 'lg'

type ArticleProps = {
  article: ArticleShort;
  size?: Sizes;
};

export const Article = ({ article, size = 'sm' }: ArticleProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <img
        className={cn('rounded-md')}
        alt={article.title}
        src={article.imageUrl}
        title={article.title}
      />
      <Typography variant="2xl" weight="semibold">
        {article.title}
      </Typography>
      {size !== 'sm' && (
        <Typography variant="sm" className="text-black/85">
          {article.previewText ?? 'More to follow...'}
        </Typography>
      )}
    </div>
  );
};
