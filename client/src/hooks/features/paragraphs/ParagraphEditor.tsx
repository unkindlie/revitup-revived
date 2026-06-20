import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/common/typography/Typography';

import type { Paragraph } from '^/types/paragraphs';
import { useTranslation } from '../../useTranslation';

type Props = {
  paragraph: Paragraph;
  index: number;
  onChange: (index: number, value: Paragraph) => void;
  onRemove: (index: number) => void;
};

export const ParagraphEditor = ({
  paragraph,
  index,
  onChange,
  onRemove,
}: Props) => {
  const { t } = useTranslation(['articles']);

  return (
    <div className="flex flex-col gap-2.5 rounded-md border p-3">
      <div className="flex items-center justify-between">
        <Typography variant="lg" weight="semibold">
          {t('draftEdit.actions.paragraphs.single')} {index + 1}
        </Typography>

        <Button
          type="button"
          variant="destructive"
          onClick={() => onRemove(index)}
        >
          {t('draftEdit.actions.paragraphs.remove')}
        </Button>
      </div>

      <Input
        placeholder={t('draftEdit.actions.paragraphs.title')}
        value={paragraph.title}
        onChange={(e) =>
          onChange(index, { ...paragraph, title: e.target.value })
        }
      />

      <Textarea
        placeholder={t('draftEdit.actions.paragraphs.content')}
        value={paragraph.content}
        onChange={(e) =>
          onChange(index, { ...paragraph, content: e.target.value })
        }
        className="min-h-[120px]"
      />
    </div>
  );
};
