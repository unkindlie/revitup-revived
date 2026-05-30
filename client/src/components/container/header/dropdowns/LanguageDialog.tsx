import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { useDropdownDialogContext } from '@/providers/DropdownDialogProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { LOCALES } from '@/lib/translation/locales';
import { Typography } from '@/components/common/typography/Typography';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

export const LanguageDialog = () => {
  const { dialogType } = useDropdownDialogContext();
  const { locale, setLocale } = useLanguage();
  const { t } = useTranslation(['common']);

  if (dialogType !== 'language') return null;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t('components.languageChange.title')}</DialogTitle>
        <DialogDescription>
          {t('components.languageChange.description')}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-2">
        {LOCALES.map((l) => (
          <button
            key={l.code}
            onClick={() => {
              setLocale(l.code);
            }}
            className={cn(
              `hover:bg-accent flex items-center gap-3 rounded-md px-3 py-2 text-left transition-all`,
              {
                'bg-accent': l.code === locale,
              },
            )}
          >
            <img src={l.flag} alt={l.code} className="h-4" />
            <Typography className="grow">{l.label}</Typography>
            {locale === l.code && (
              <Typography className="text-muted-foreground">✓</Typography>
            )}
          </button>
        ))}
      </div>
    </DialogContent>
  );
};

export default LanguageDialog;
