import { Select as SelectPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { Typography } from '@/components/common/typography/Typography';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useDisciplines } from '@/hooks/features/disciplines/useDisciplines';
import { useResponse } from '@/hooks/useResponse';
import { useTranslation } from '../../../hooks/useTranslation';

type SelectProps = ComponentProps<typeof SelectPrimitive.Root>;

export const DisciplineSelect = ({
  onValueChange,
  value,
  ...props
}: SelectProps) => {
  const { data: disciplinesRes, isLoading } = useDisciplines();
  const { t } = useTranslation(['common']);

  const { data: disciplines } = useResponse(disciplinesRes);

  if (isLoading || !disciplines) return null;

  if (!disciplines.length)
    return (
      <Typography variant="sm">
        {t('components.disciplineSelect.notAvailable')}
      </Typography>
    );

  return (
    <Select onValueChange={onValueChange} value={value} {...props}>
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder={t('components.disciplineSelect.placeholder')}
        />
      </SelectTrigger>
      <SelectContent className="w-full" position="popper">
        {disciplines.map((d) => (
          <SelectItem key={d.id} value={String(d.id)}>
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
      </SelectContent>
    </Select>
  );
};
