import { BadgeQuestionMark } from 'lucide-react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';

import { Typography } from '@/components/common/typography/Typography';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useTranslation } from '@/hooks/useTranslation';

type ErrorTranslation = {
  title: string;
  description: string;
};

const ERROR_ICONS: Record<number, IconName> = {
  0: 'shield-question-mark',
  404: 'circle-x',
} as const;

export const ErrorDisplay = ({ error }: { error: Error | null }) => {
  const { code, message } = {
    code: (error as unknown as { status: number }).status,
    message: error?.message,
  };

  const { t } = useTranslation(['common']);
  const errorInRange = Boolean(code && [400, 401, 404, 409].includes(code));

  const errorIconCode = ERROR_ICONS[code ?? 0];

  const { title, description } = t(
    `errors.${errorInRange ? code : 'unknown'}`,
    {
      returnObjects: true,
    },
  ) as ErrorTranslation;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-2">
      <DynamicIcon
        className="size-36 transition-all md:size-52"
        name={errorIconCode}
      />
      <div className="flex flex-col items-center gap-y-1">
        <Typography variant="4xl" weight="semibold">
          {title}
        </Typography>
        <Typography variant="xl">{description}</Typography>
        {message && (
          <Popover>
            <PopoverTrigger className="bg-backgroud mt-1 cursor-pointer rounded-md border-2 p-1.5 not-dark:shadow-lg">
              <BadgeQuestionMark />
            </PopoverTrigger>
            <PopoverContent>
              <Typography>{message}</Typography>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};
