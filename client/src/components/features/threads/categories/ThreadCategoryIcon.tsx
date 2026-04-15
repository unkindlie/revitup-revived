import { DynamicIcon } from 'lucide-react/dynamic';

import type { TThreadCategory } from '^/types/thread-categories';

type Props = Pick<TThreadCategory, 'color' | 'icon'>;

export const ThreadCategoryIcon = ({ color, icon }: Props) => (
  <div
    className="flex size-16 items-center justify-center rounded-md transition-all md:size-18"
    style={{ backgroundColor: color }}
  >
    <DynamicIcon className="size-10 md:size-12" color="white" name={icon} />
  </div>
);
