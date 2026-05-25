import { Link } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { Pages, path } from '@/lib/routing/client';
import { cn } from '@/lib/utils';
import { timeAgo } from '@/time-ago';

import type { TThreadShort } from '^/types/threads';

export const ThreadItem = ({
  id,
  title,
  createdAt,
  author,
  category,
}: TThreadShort) => {
  const { id: userId, username } = author;

  return (
    <div className="flex flex-col gap-y-1.5 rounded-md border-2 px-3 py-2 md:w-[600px]">
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
        <Link
          className={cn('flex gap-x-1', !category && 'pointer-events-none')}
          to={`/threads/by-category/${category?.shortCode}`}
        >
          <Typography>{category?.name ?? 'No category'}</Typography>
        </Link>
        <div className="flex gap-x-1">
          <Link
            to={path(Pages.UserProfile, {
              id: userId,
            })}
          >
            <Typography>{username}</Typography>
          </Link>
          <Typography>|</Typography>
          <Typography title={new Date(createdAt).toLocaleString()}>
            {timeAgo.format(new Date(createdAt))}
          </Typography>
        </div>
      </div>
    </div>
  );
};
