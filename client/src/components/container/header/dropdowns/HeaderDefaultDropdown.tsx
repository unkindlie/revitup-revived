import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useDropdownDialogContext } from '@/providers/DropdownDialogProvider';
import { DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { TranslationNamespaces } from '@/lib/translation';

export const HeaderDefaultDropdown = () => {
  const { t } = useTranslation(TranslationNamespaces.Common);
  const { setDialogType } = useDropdownDialogContext();
  const navigate = useNavigate();

  return (
    <>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onClick={() => {
            setDialogType('login');
            setDialogType('login');
          }}
        >
          {t('header.dropdown.default.login')}
        </DropdownMenuItem>
      </DialogTrigger>
      <DropdownMenuItem onClick={() => navigate('/register')}>
        {t('header.dropdown.default.register')}
      </DropdownMenuItem>
    </>
  );
};
