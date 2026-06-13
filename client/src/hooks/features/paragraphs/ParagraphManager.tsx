import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ParagraphEditor } from './ParagraphEditor';

import type { Paragraph } from '^/types/paragraphs';
import { useTranslation } from '../../useTranslation';

type Props = {
  initial?: Paragraph[];
  onChange: (value: Paragraph[]) => void;
};

export const ParagraphManager = ({ initial = [], onChange }: Props) => {
  const [paragraphs, setParagraphs] = useState<Paragraph[]>(initial);
  const { t } = useTranslation(['articles']);

  const update = (next: Paragraph[]) => {
    setParagraphs(next);
    onChange(next);
  };

  const addParagraph = () => {
    update([
      ...paragraphs,
      {
        title: '',
        content: '',
        order: paragraphs.length,
      },
    ]);
  };

  const updateParagraph = (index: number, value: Paragraph) => {
    const copy = [...paragraphs];
    copy[index] = value;
    update(copy);
  };

  const removeParagraph = (index: number) => {
    const copy = paragraphs.filter((_, i) => i !== index);

    update(copy.map((p, i) => ({ ...p, order: i })));
  };

  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((p, i) => (
        <ParagraphEditor
          key={i}
          index={i}
          paragraph={p}
          onChange={updateParagraph}
          onRemove={removeParagraph}
        />
      ))}

      <Button type="button" onClick={addParagraph} variant={'outline'}>
        {t('draftEdit.actions.paragraphs.add')}
      </Button>
    </div>
  );
};
