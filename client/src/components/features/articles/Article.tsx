import { Link } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { Pages, path } from '@/lib/routing/client';
import { cn } from '@/lib/utils';
import { timeAgo } from '@/time-ago';

import type { ArticleShort } from '^/types/articles';

type Sizes = 'sm' | 'md' | 'lg';

type ArticleProps = {
  article: ArticleShort;
  size?: Sizes;
};

const SIZES = {
  titleVariant: {
    sm: 'base',
    md: 'xl',
    lg: '2xl',
  },
} as const;

export const Article = ({ article, size = 'sm' }: ArticleProps) => {
  return (
    <Link
      to={path(Pages.ArticleDetailed, { id: article.id })}
      className={cn(
        'flex',
        size === 'sm' ? 'items-center gap-x-3 text-base' : 'flex-col gap-y-2',
      )}
    >
      <img
        className={cn('rounded-md transition-all', {
          'w-36 sm:w-44': size === 'sm',
        })}
        alt={article.title}
        src={article.mainImgUrl}
        title={article.title}
      />
      <div className="flex flex-col sm:gap-y-1">
        <div className="flex items-center space-x-2">
          <Typography variant="sm" weight="medium">
            {timeAgo.format(new Date(article.createdAt), 'mini')}
          </Typography>
          {article.discipline && (
            <div className="flex items-center gap-x-2 rounded-full px-2 py-0.5">
              {article.discipline.mainImgUrl && (
                <img
                  src={article.discipline.mainImgUrl}
                  className="h-6 w-6 rounded-sm"
                />
              )}
              <Typography variant="sm" weight="medium">
                {article.discipline.title}
              </Typography>
            </div>
          )}
        </div>

        <Typography
          className={cn({
            '2xs:text-[18px] xs:leading-6 sm:text-[20px]': size === 'sm',
            'sm:text-3xl': size === 'lg',
          })}
          variant={SIZES.titleVariant[size]}
          weight="semibold"
        >
          {article.title}
        </Typography>
        {size === 'lg' && (
          <Typography variant={'lg'}>
            {article.previewText ?? 'More to follow...'}
          </Typography>
        )}
      </div>
    </Link>
  );
};
