import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import i18n from 'i18next';

import { HeaderLoggedDropdown } from '@/components/container/header/dropdowns/HeaderLoggedDropdown';
import { HeaderDefaultDropdown } from '@/components/container/header/dropdowns/HeaderDefaultDropdown';
import { LanguageDialog } from '@/components/container/header/dropdowns/LanguageDialog';
import { ForgotPasswordDialog } from '@/components/features/auth/dialogs/ForgotPasswordDialog';
import { LoginDialog } from '@/components/features/auth/dialogs/LoginDialog';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from '@/hooks/useTranslation';
import { LOCALES } from '@/lib/translation/locales';
import { useDropdownDialogContext } from '@/providers/DropdownDialogProvider';
import { useTheme } from '@/providers/ThemeProvider';
import { useUserStore } from '@/stores/user.store';

export const HeaderDropdown = () => {
  const { t } = useTranslation(['common']);
  const { dialogType } = useDropdownDialogContext();
  const { toggleTheme, theme } = useTheme();

  const isLogged = useUserStore((state) => state.isLogged);
  const { setDialogType } = useDropdownDialogContext();
  const currentLocale = i18n?.language ?? LOCALES[0].code;
  const currentLocaleEntry =
    LOCALES.find((l) => l.code === currentLocale) ?? LOCALES[0];

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <FontAwesomeIcon
            className="text-white"
            icon={faGripLines}
            size={'xl'}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4">
          {isLogged ? <HeaderLoggedDropdown /> : <HeaderDefaultDropdown />}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setDialogType('language');
            }}
          >
            <DialogTrigger className="flex w-full items-center justify-between">
              {currentLocaleEntry.label}
              <img
                src={currentLocaleEntry.flag}
                alt={currentLocaleEntry.code}
                className="mr-2 inline h-4 w-4"
              />
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {t('header.dropdown.common.darkMode')}
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              onClick={(e) => e.stopPropagation()}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {dialogType === 'login' && <LoginDialog />}
      {dialogType === 'forgotPw' && <ForgotPasswordDialog />}
      {dialogType === 'language' && <LanguageDialog />}
    </Dialog>
  );
};
