import TimeAgo from 'javascript-time-ago';
import { Link } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { Pages, path } from '@/lib/routing/client';
import type { TThreadShort } from '^/types/threads';

export const ThreadItem = ({ id, title, createdAt, author }: TThreadShort) => {
  const ago = new TimeAgo('en');
  const { id: userId, username } = author;

  return (
    <div className="flex flex-col gap-y-1.5 border-2 border-black/25 px-3 py-2 md:w-[600px]">
      <Link
        to={path(Pages.ThreadDetailed, {
          id,
        })}
      >
        <Typography variant="2xl" weight="semibold">
          {title}
        </Typography>
      </Link>
      <div className="flex justify-between">
        <Typography>Category</Typography>
        <div className="flex gap-x-1">
          <Link to={`/users/${userId}`}>
            <Typography>{username}</Typography>
          </Link>
          <Typography>|</Typography>
          <Typography title={new Date(createdAt).toLocaleString()}>
            {ago.format(new Date(createdAt))}
          </Typography>
        </div>
      </div>
    </div>
  );
};
