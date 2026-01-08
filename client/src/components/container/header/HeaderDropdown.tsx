import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@/components/ui/dialog';
import { LoginDialog } from '@/components/features/auth/dialogs/LoginDialog';
import { useDropdownDialogContext } from '@/providers/DropdownDialogProvider';
import { useCheckLogged } from '@/hooks/auth/useCheckLogged';
import { HeaderLoggedDropdown } from '@/components/container/header/dropdowns/HeaderLoggedDropdown';
import { HeaderDefaultDropdown } from '@/components/container/header/dropdowns/HeaderDefaultDropdown';
import { ForgotPasswordDialog } from '../../features/auth/dialogs/ForgotPassword';

export const HeaderDropdown = () => {
  const { dialogType } = useDropdownDialogContext();
  const isLogged = useCheckLogged();

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <FontAwesomeIcon
            className="text-primary-foreground"
            icon={faGripLines}
            size={'xl'}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4">
          {isLogged ? <HeaderLoggedDropdown /> : <HeaderDefaultDropdown />}
        </DropdownMenuContent>
      </DropdownMenu>
      {dialogType === 'login' && <LoginDialog />}
      {dialogType === 'forgotPw' && <ForgotPasswordDialog />}
    </Dialog>
  );
};
