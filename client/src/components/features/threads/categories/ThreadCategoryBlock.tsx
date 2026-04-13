import { DynamicIcon } from 'lucide-react/dynamic';
import { Link } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';

import type { TThreadCategory } from '^/types/thread-categories';

export const ThreadCategoryBlock = ({
  name,
  color,
  icon,
  shortCode,
}: TThreadCategory) => {
  return (
    <Link
      className="flex w-full flex-col items-center gap-x-2 rounded-sm p-3 md:flex-row"
      style={{
        backgroundColor: color,
      }}
      to={`/threads/by-category/${shortCode}`}
    >
      <DynamicIcon name={icon} color="white" size={20} />
      <Typography className="text-white" variant="xl" weight="medium">
        {name}
      </Typography>
    </Link>
  );
};
