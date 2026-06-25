import { Calendar1, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { useTranslation } from '@/hooks/useTranslation';
import { Pages, path } from '@/lib/routing/client';

import type { ArticleShort } from '^/types/articles';

type Props = {
  article: ArticleShort;
  draft?: boolean;
};

export const ArticleCard = ({ article, draft = false }: Props) => {
  const navigate = useNavigate();

  const { id, title, previewText, mainImgUrl, createdAt } = article;
  const { discipline } = article;
  const { t } = useTranslation(['articles']);

  const destination = draft
    ? path(Pages.ArticleDraftEdit, { id })
    : path(Pages.ArticleDetailed, { id });

  return (
    <div
      className="flex cursor-pointer flex-col rounded-md border-2 transition-all hover:shadow-lg"
      onClick={() => navigate(destination)}
    >
      <div className="h-40 w-full">
        {mainImgUrl ? (
          <img
            src={mainImgUrl}
            alt={title}
            className="size-full rounded-t-md object-cover"
          />
        ) : (
          <div className="bg-muted flex size-full items-center justify-center rounded-t-md">
            <FileText size={40} className="opacity-50" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-y-2 p-4">
        <Link to={destination} onClick={(e) => e.stopPropagation()}>
          <Typography variant="xl" weight="semibold">
            {title}
          </Typography>
        </Link>

        {previewText && (
          <Typography variant="sm" className="line-clamp-3 opacity-80">
            {previewText}
          </Typography>
        )}

        {discipline && (
          <div className="flex items-center gap-x-2">
            {discipline.mainImgUrl && (
              <img src={discipline.mainImgUrl} className="h-6 w-6 rounded-sm" />
            )}
            <Typography variant="sm">{discipline.title}</Typography>
          </div>
        )}

        <div className="mt-auto flex items-center gap-x-1.5 opacity-75">
          <Calendar1 size={18} />
          <Typography variant="sm">
            {new Date(createdAt).toLocaleDateString()}
          </Typography>
        </div>

        {draft && (
          <div className="mt-1">
            <Typography variant="sm" weight="medium" className="text-amber-500">
              {t('draft.text')}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};
