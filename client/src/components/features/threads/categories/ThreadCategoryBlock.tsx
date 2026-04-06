import { DynamicIcon } from 'lucide-react/dynamic';

import { Typography } from '@/components/common/typography/Typography';

import type { TThreadCategory } from '^/types/threads';

export const ThreadCategoryBlock = ({
  title,
  color,
  icon,
}: TThreadCategory) => {
  return (
    <div
      className="flex w-full flex-col items-center gap-x-2 rounded-sm p-3 md:flex-row"
      style={{
        backgroundColor: color,
      }}
    >
      <DynamicIcon name={icon} color="white" size={20} />
      <Typography className="text-white" variant="xl" weight="medium">
        {title}
      </Typography>
    </div>
  );
};
