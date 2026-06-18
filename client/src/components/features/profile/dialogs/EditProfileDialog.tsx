import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/common/spinner/Spinner';

import { useUpdateUser } from '@/hooks/features/users/useUpdateUser';
import { useCloseDialog } from '@/hooks/ui/useCloseDialog';
import { Textarea } from '../../../ui/textarea';
import { useTranslation } from '../../../../hooks/useTranslation';

const schema = yup.object({
  username: yup.string().required().min(8).max(100),
  description: yup.string().optional().max(1000),
});

export function EditProfileDialog({
  userId,
  defaultUsername,
  defaultDescription,
}: {
  userId: number;
  defaultUsername: string;
  defaultDescription?: string;
}) {
  const { closeHidden, closeRef } = useCloseDialog();
  const { mutateAsync, isPending } = useUpdateUser(userId);
  const { t } = useTranslation(['users']);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: defaultUsername,
      description: defaultDescription,
    },
  });

  const onSubmit = async (data: { username: string; description?: string }) => {
    try {
      await mutateAsync({ ...data, id: userId });
      toast.success('Profile updated');
      closeRef.current?.click();
    } catch (e: any) {
      toast.error(e?.message ?? 'Error');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          {t('profile.actions.editProfile.title')}
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle> {t('profile.actions.editProfile.title')}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <Input placeholder="Назва користувача" {...register('username')} />

          <Textarea placeholder="Опис" {...register('description')} />

          <Button className="w-full" disabled={!isValid || isPending}>
            {isPending ? (
              <Spinner size="sm" />
            ) : (
              t('profile.actions.editProfile.action')
            )}
          </Button>
        </form>

        {closeHidden}
      </DialogContent>
    </Dialog>
  );
}
