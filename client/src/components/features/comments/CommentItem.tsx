/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { ProfileImage } from '@/components/features/profile/ProfileImage';
import { useCommentReply } from '@/contexts/CommentReplyContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Pages, path } from '@/lib/routing/client';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/stores/user.store';
import { timeAgo } from '@/time-ago';

import type { TComment } from '^/types/comments';

export const CommentItem = ({
  id,
  content,
  author,
  children,
  createdAt,
}: TComment) => {
  const { username, id: authorId, profileImgUrl } = author;
  const [_, setValue] = useCommentReply();
  const isLogged = useUserStore((state) => state.isLogged);
  const { t } = useTranslation(['common']);

  const replySelect = () => {
    setValue({
      id,
      content: content.length > 25 ? content.slice(0, 24) + '...' : content,
    });
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-col rounded-md border">
        <div className="flex items-center justify-between border-b px-2 py-1.5">
          <Link
            className="flex items-center space-x-2.5"
            to={path(Pages.UserProfile, { id: authorId })}
          >
            <div className="flex items-center space-x-2.5">
              <Typography weight="medium">{username}</Typography>
            </div>
            <ProfileImage className="size-7" src={profileImgUrl} />
          </Link>
          <Typography variant="sm">
            {timeAgo.format(new Date(createdAt))}
          </Typography>
        </div>
        <Typography className="px-2 py-1">{content}</Typography>
        <div className="border-t px-2 py-1">
          <Typography
            className={cn(isLogged ? 'cursor-pointer' : 'cursor-not-allowed')}
            weight="medium"
            variant="sm"
            onClick={replySelect}
          >
            {t('components.comments.reply.title')}
          </Typography>
        </div>
      </div>
      {children.length !== 0 && (
        <div className="ml-5">
          {children.map((com) => (
            <CommentItem key={com.id} {...com} />
          ))}
        </div>
      )}
    </div>
  );
};
