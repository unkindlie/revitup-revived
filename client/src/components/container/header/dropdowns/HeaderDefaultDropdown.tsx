import { useTranslation } from 'react-i18next';
import { useDropdownDialogContext } from '@/providers/DropdownDialogProvider';
import { DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export const HeaderDefaultDropdown = () => {
  const { t } = useTranslation();
  const { setDialogType } = useDropdownDialogContext();

  return (
    <>
      <DialogTrigger asChild>
        <DropdownMenuItem onClick={() => setDialogType('login')}>
          {t('header.dropdown.default.login')}
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogTrigger asChild>
        <DropdownMenuItem onClick={() => setDialogType('register')}>
          {t('header.dropdown.default.register')}
        </DropdownMenuItem>
      </DialogTrigger>
    </>
  );
};
