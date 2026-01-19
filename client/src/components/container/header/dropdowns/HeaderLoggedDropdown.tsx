import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import { useLogout } from '@/hooks/features/auth/useLogout';
import { TranslationNamespaces } from '@/lib/translation';

export const HeaderLoggedDropdown = () => {
  const { t } = useTranslation(TranslationNamespaces.Common);
  const { mutate: logOut, isPending } = useLogout();

  return (
    <>
      <DropdownMenuItem
        disabled={isPending}
        onClick={() => logOut()}
        variant="destructive"
      >
        {t('header.dropdown.logged.logout')}
      </DropdownMenuItem>
    </>
  );
};
