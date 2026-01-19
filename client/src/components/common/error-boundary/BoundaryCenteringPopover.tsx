import { MessageSquareWarning } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Typography } from '@/components/common/typography/Typography';

export const BoundaryCenteringPopover = () => {
  return (
    <Popover>
      <PopoverTrigger className="absolute top-5 right-5 cursor-pointer rounded-lg bg-white p-2.5 shadow-lg md:right-8">
        <MessageSquareWarning className="text-light-active" size={28} />
      </PopoverTrigger>
      <PopoverContent>
        <Typography variant="sm">
          Yeah, I know that looking at the content, it feels not properly
          centered. Go cry about it somewhere
        </Typography>
        <br className="mb-2" />
        <Typography variant="sm">
          Or fix it by opening the issue{' '}
          <a
            className="text-light-active underline"
            target="_blank"
            href="https://github.com/unkindlie/revitup-revived/issues"
          >
            here
          </a>
        </Typography>
      </PopoverContent>
    </Popover>
  );
};
