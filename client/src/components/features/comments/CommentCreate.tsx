import { X } from 'lucide-react';
import { useState } from 'react';

import { Spinner } from '@/components/common/spinner/Spinner';
import { Typography } from '@/components/common/typography/Typography';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCommentReply } from '@/contexts/CommentReplyContext';
import { useAddComment } from '@/hooks/features/comments/useAddComment';
import { useTranslation } from '@/hooks/useTranslation';
import { useUserStore } from '@/stores/user.store';

import type { TCommentSource } from '^/types/comments';

type CommentCreateProps = {
  source: TCommentSource;
  entityId: number;
  parentId?: number;
};

export const CommentCreate = ({ source, entityId }: CommentCreateProps) => {
  const [content, setContent] = useState('');
  const [reply, setReply] = useCommentReply();
  const { t } = useTranslation(['common']);
  const isLogged = useUserStore((state) => state.isLogged);

  const { mutateAsync, isPending } = useAddComment({
    entitySource: source,
    entityId,
    content,
    parentId: reply?.id,
  });

  const addComment = async () => {
    await mutateAsync();

    setContent('');
    setReply(null);
  };

  return (
    <div>
      {reply && (
        <div className="flex items-center gap-x-1">
          <Typography variant="sm" weight="medium">
            {t('components.comments.reply.indicator', { com: reply.content })}
          </Typography>
          <X
            className="cursor-pointer"
            onClick={() => setReply(null)}
            size={16}
          />
        </div>
      )}
      <Textarea
        className="mt-2"
        placeholder={t('components.comments.createPlaceholder')}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={!isLogged}
      />
      <div className="mt-2">
        {isLogged ? (
          <Button
            className="w-full md:float-right md:w-[20%]"
            disabled={!content || isPending}
            onClick={addComment}
          >
            {isPending ? <Spinner size="sm" /> : t('common.actions.create')}
          </Button>
        ) : (
          <Typography className="text-center md:text-left" weight="medium">
            {t('components.comments.noAuth')}
          </Typography>
        )}
      </div>
    </div>
  );
};
