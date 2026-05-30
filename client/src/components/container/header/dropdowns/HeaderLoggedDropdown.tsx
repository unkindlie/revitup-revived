import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import {
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useLogout } from '@/hooks/features/auth/useLogout';
import { Pages, path } from '@/lib/routing/client';
import { TranslationNamespaces } from '@/lib/translation';

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
