import { Select as SelectPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { Typography } from '@/components/common/typography/Typography';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select';
import { useDisciplines } from '@/hooks/features/disciplines/useDisciplines';
import { useResponse } from '@/hooks/useResponse';

type SelectProps = ComponentProps<typeof SelectPrimitive.Root>;

export const DisciplineSelect = ({
  onValueChange,
  defaultValue,
  ...props
}: SelectProps) => {
  const { data: disciplinesRes, isLoading } = useDisciplines();

  const { data: disciplines } = useResponse(disciplinesRes);

  if (isLoading || !disciplines) return null;

  if (!disciplines.length)
    return <Typography variant="sm">No disciplines available</Typography>;

  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      {...props}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Choose discipline" />
      </SelectTrigger>
      <SelectContent className="w-full" position="popper">
        <SelectGroup>
          {disciplines.map((d) => (
            <SelectItem key={d.id} value={d.id.toString()}>
              <>
                {d.mainImgUrl && (
                  <img src={d.mainImgUrl} className="mr-2 h-5 w-5 rounded-sm" />
                )}
                <Typography variant="md" weight="medium">
                  {d.title}
                </Typography>
              </>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
