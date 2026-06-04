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

const schema = yup.object({
  username: yup.string().required().min(8).max(100),
});

export function EditProfileDialog({
  userId,
  defaultUsername,
}: {
  userId: number;
  defaultUsername: string;
}) {
  const { closeHidden, closeRef } = useCloseDialog();
  const { mutateAsync, isPending } = useUpdateUser(userId);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { username: defaultUsername },
  });

  const onSubmit = async (data: { username: string }) => {
    try {
      await mutateAsync(data);
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
          Edit profile
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <Input {...register('username')} />

          <Button disabled={!isValid || isPending}>
            {isPending ? <Spinner size="sm" /> : 'Save'}
          </Button>
        </form>

        {closeHidden}
      </DialogContent>
    </Dialog>
  );
}
