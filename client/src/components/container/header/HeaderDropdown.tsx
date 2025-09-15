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
import { useState } from 'react';
import { LoginDialog } from '@/components/features/auth/dialogs/LoginDialog';
import { useTranslation } from 'react-i18next';

type DialogType = 'login' | 'register';

export const HeaderDropdown = () => {
  const { t } = useTranslation();
  const [dialog, setDialog] = useState<DialogType>();

  const handleDialogDisplay = () => {
    switch (dialog) {
      case 'login':
        return <LoginDialog />;
      case 'register':
        return (
          <DialogContent aria-describedby={undefined}>
            <DialogTitle>Dickah</DialogTitle>
          </DialogContent>
        );
      default:
        return null;
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
          <DialogTrigger asChild onClick={() => setDialog('login')}>
            <DropdownMenuItem>{t('header.dropdown.login')}</DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild onClick={() => setDialog('register')}>
            <DropdownMenuItem>{t('header.dropdown.register')}</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      {handleDialogDisplay()}
    </Dialog>
  );
};
