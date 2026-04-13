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
import { useThreadCategories } from '@/hooks/features/threads/categories/useThreadCategories';
import { useResponse } from '@/hooks/useResponse';

type SelectProps = ComponentProps<typeof SelectPrimitive.Root>;

export const ThreadCategoriesSelect = ({
  onValueChange,
  defaultValue,
  ...props
}: SelectProps) => {
  const { data: categoriesRes, isLoading } = useThreadCategories();

  const { data: categories } = useResponse(categoriesRes);

  if (isLoading || !categories) return null;

  if (!categories.length)
    return <Typography>No thread categories avialable</Typography>;

  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      {...props}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Choose a thread category" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id.toString()}>
              <>
                <div
                  className="h-5 w-1 rounded"
                  style={{ backgroundColor: cat.color }}
                />
                <Typography variant="md" weight="medium">
                  {cat.name}
                </Typography>
              </>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
