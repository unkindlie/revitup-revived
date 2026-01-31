import {
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import { useLogout } from '@/hooks/features/auth/useLogout';
import { TranslationNamespaces } from '@/lib/translation';
import { useNavigate } from 'react-router';
import { Pages, path } from '@/lib/routing/client';

export const HeaderLoggedDropdown = () => {
  const { t } = useTranslation(TranslationNamespaces.Common);
  const { mutate: logout, isPending } = useLogout();
  const navigate = useNavigate();

  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => navigate(path(Pages.Profile))}>
          {t('header.dropdown.logged.profile')}
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isPending}
          onClick={() => logout()}
          variant="destructive"
        >
          {t('header.dropdown.logged.logout')}
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
};
