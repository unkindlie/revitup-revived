import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
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
import { Spinner } from '@/components/common/spinner/Spinner';
import { FormField } from '@/components/common/form/FormField';
import { PasswordInput } from '@/components/common/inputs/PasswordInput';
import { usePasswordResetChangeLogged } from '@/hooks/features/auth/password-reset/use-change-password-logged';
import { useCloseDialog } from '@/hooks/ui/useCloseDialog';

const schema = yup.object({
  password: yup.string().required().min(6).max(64),
});

type FormBody = yup.InferType<typeof schema>;

export function ChangePasswordDialog() {
  const { closeHidden } = useCloseDialog();

  const { mutateAsync, isPending } = usePasswordResetChangeLogged();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormBody>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormBody> = async ({ password }) => {
    try {
      await mutateAsync(password);
      toast.success('Password changed successfully');
    } catch (e: any) {
      toast.error(e?.message ?? 'Error');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Change password
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            id="password"
            label="Password"
            errorMessage={errors.password?.message}
          >
            <PasswordInput {...register('password')} />
          </FormField>

          <Button disabled={!isValid || isPending}>
            {isPending ? <Spinner size="sm" /> : 'Change'}
          </Button>
        </form>

        {closeHidden}
      </DialogContent>
    </Dialog>
  );
}
