import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';

import { HeaderLoggedDropdown } from '@/components/container/header/dropdowns/HeaderLoggedDropdown';
import { HeaderDefaultDropdown } from '@/components/container/header/dropdowns/HeaderDefaultDropdown';
import { ForgotPasswordDialog } from '@/components/features/auth/dialogs/ForgotPasswordDialog';
import { LoginDialog } from '@/components/features/auth/dialogs/LoginDialog';
import { Dialog } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useDropdownDialogContext } from '@/providers/DropdownDialogProvider';
import { useTheme } from '@/providers/ThemeProvider';
import { useUserStore } from '@/stores/user.store';

export const HeaderDropdown = () => {
  const { dialogType } = useDropdownDialogContext();
  const isLogged = useUserStore((state) => state.isLogged);
  const { toggleTheme, theme } = useTheme();

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
          <DropdownMenuItem>
            Dark mode
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
    </Dialog>
  );
};
