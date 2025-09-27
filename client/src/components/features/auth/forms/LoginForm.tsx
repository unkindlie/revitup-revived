import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { useLogin } from '@/hooks/auth/useLogin';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { TAuthBody } from '^/types/auth';
import { useDropdownDialogContext } from '@/providers/DropdownDialogProvider';

export const LoginForm = () => {
  const { setDialogType } = useDropdownDialogContext();
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<TAuthBody>();
  const { mutateAsync, isPending } = useLogin();

  const onSubmit: SubmitHandler<TAuthBody> = async (data) => {
    await mutateAsync(data);

    setDialogType(undefined);
  };

  return (
    <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="Email" {...register('emailAddress')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          placeholder="Password"
          type="password"
          {...register('password')}
        />
      </div>
      <Button
        className="mt-1 h-10 cursor-pointer font-semibold"
        type="submit"
        disabled={isPending}
      >
        {t('dialogs.login.action')}
      </Button>
    </form>
  );
};
