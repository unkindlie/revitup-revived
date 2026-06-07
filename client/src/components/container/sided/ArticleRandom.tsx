import { useNavigate } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { Spinner } from '@/components/common/spinner/Spinner';
import { useRandomArticle } from '../../../hooks/features/articles/useRandomArticle';
import { useResponse } from '../../../hooks/useResponse';
import { Pages, path } from '@/lib/routing/client';

import type { ArticleRandom as TArticleRandom } from '^/types/articles';

export const ArticleRandom = () => {
  const navigate = useNavigate();

  const { isLoading, data: articleRes } = useRandomArticle();
  const { data } = useResponse<TArticleRandom>(articleRes);

  const handleClick = () => {
    if (!data?.id) return;
    navigate(path(Pages.ArticleDetailed, { id: data.id }));
  };

  if (isLoading || !data) {
    return (
      <div className="bg-muted flex h-40 w-52 items-center justify-center rounded-md border">
        <Spinner size="sm" />
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="group relative h-40 cursor-pointer overflow-hidden rounded-md border"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{
          backgroundImage: `url(${data.mainImgUrl})`,
        }}
      />

      <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />

      <div className="relative flex h-full w-full items-end p-3">
        <Typography
          variant="sm"
          weight="semibold"
          className="line-clamp-2 text-white"
        >
          {data.title}
        </Typography>
      </div>
    </div>
  );
};
