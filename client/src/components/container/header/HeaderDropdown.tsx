import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { LoginForm } from '../../features/auth/forms/LoginForm';
import { useState } from 'react';

type DialogType = 'login' | 'register';

export const HeaderDropdown = () => {
  const [dialog, setDialog] = useState<DialogType>();

  const handleDialogDisplay = () => {
    switch (dialog) {
      case 'login':
        return <LoginForm />;
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
            <DropdownMenuItem>Login</DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild onClick={() => setDialog('register')}>
            <DropdownMenuItem>Register</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      {handleDialogDisplay()}
    </Dialog>
  );
};
