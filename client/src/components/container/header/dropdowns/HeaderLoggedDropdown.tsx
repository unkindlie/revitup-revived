import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import { useLogout } from '@/hooks/auth/useLogout';

export const HeaderLoggedDropdown = () => {
  const { t } = useTranslation();
  const { mutateAsync: logOut, isPending } = useLogout();

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
