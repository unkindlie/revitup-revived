import { Link } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { Pages, path } from '@/lib/routing/client';

import type { TComment } from '^/types/comments';

export const CommentItem = ({ content, author, children }: TComment) => {
  const { username, id: authorId } = author;

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-col rounded-md border">
        <div className="border-b px-2 py-1">
          <Link to={path(Pages.UserProfile, { id: authorId })}>
            <Typography weight="medium">{username}</Typography>
          </Link>
        </div>
        <Typography className="px-2 py-1">{content}</Typography>
      </div>
      {children.length !== 0 && (
        <div className="ml-[5.5%]">
          {children.map((com) => (
            <CommentItem key={com.id} {...com} />
          ))}
        </div>
      )}
    </div>
  );
};
