import { Settings } from 'lucide-react';

import { ChangePasswordDialog } from './dialogs/ChangePasswordDialog';
import { ChangeProfilePictureDialog } from './dialogs/ChangeProfilePictureDialog';
import { EditProfileDialog } from './dialogs/EditProfileDialog';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TranslationNamespaceProvider } from '@/contexts/TranslationNamespaceContext';
import { useUserStore } from '@/stores/user.store';
import type { UserDetailed } from '../../../../utils/types/users';

type ProfileContextMenuProps = Pick<
  UserDetailed,
  'id' | 'username' | 'description'
>;

export const ProfileContextMenu = ({ id }: ProfileContextMenuProps) => {
  const user = useUserStore((s) => s.user);

  return (
    <TranslationNamespaceProvider namespace={'common'}>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-main rounded-md p-2.5 text-white">
          <Settings />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <ChangePasswordDialog />

          <ChangeProfilePictureDialog userId={id} />

          <EditProfileDialog
            userId={id}
            defaultUsername={user?.username ?? ''}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </TranslationNamespaceProvider>
  );
};
