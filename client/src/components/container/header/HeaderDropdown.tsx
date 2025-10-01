import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LoginDialog } from '@/components/features/auth/dialogs/LoginDialog';
import { useTranslation } from 'react-i18next';
import { useDropdownDialogContext } from '@/providers/DropdownDialogProvider';

export const HeaderDropdown = () => {
  const { t } = useTranslation();
  const { dialogType, setDialogType } = useDropdownDialogContext();

  const HandleDialogDisplay = () => {
    switch (dialogType) {
      case 'login':
        return <LoginDialog />;
      case 'register':
        return (
          <DialogContent aria-describedby={undefined}>
            <DialogTitle>Dickah</DialogTitle>
          </DialogContent>
        );
      default:
        return null
    }
  };

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
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => setDialogType('login')}>
              {t('header.dropdown.login')}
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => setDialogType('register')}>
              {t('header.dropdown.register')}
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      {HandleDialogDisplay()}
    </Dialog>
  );
};
