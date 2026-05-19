import { useInView } from 'motion/react';
import { useRef } from 'react';

import { Typography } from '@/components/common/typography/Typography';
import { CommentCreate } from '@/components/features/comments/CommentCreate';
import { CommentItem } from '@/components/features/comments/CommentItem';
import { useComments } from '@/hooks/features/comments/useComments';
import { useResponse } from '@/hooks/useResponse';
import { useTranslation } from '@/hooks/useTranslation';

import type { TCommentSource } from '^/types/comments';

type CommentsBlockProps = {
  source: TCommentSource;
  id: number;
};

export const CommentsBlock = ({ source, id }: CommentsBlockProps) => {
  const { t } = useTranslation(['common']);
  const ref = useRef(null);

  const inView = useInView(ref);

  const { data: commentsRes } = useComments(source, id, inView);
  const { data: com } = useResponse(commentsRes);

  return (
    <div className="flex flex-col gap-y-2" ref={ref}>
      <div className="flex items-center gap-x-3">
        <Typography variant="2xl" weight="semibold">
          {t('components.comments.title')}
        </Typography>
        <div className="bg-foreground/20 flex size-8 items-center justify-center rounded-[3px]">
          <Typography weight="medium">{com?.totalCount || 0}</Typography>
        </div>
      </div>
      {com && com.comments.length > 0 && (
        <div className="mt-2 space-y-3">
          {com.comments.map((com) => (
            <CommentItem key={com.id} {...com} />
          ))}
        </div>
      )}
      <div className="mt-2">
        <CommentCreate source={source} entityId={id} />
      </div>
    </div>
  );
};
