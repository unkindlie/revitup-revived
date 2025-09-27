import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { useLogin } from '@/hooks/auth/useLogin';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { TAuthBody } from '^/types/auth';
import { useDropdownDialogContext } from '@/providers/DropdownDialogProvider';
import { useGetError } from '@/hooks/data-handling';
import { AxiosError } from 'axios';
import type { TResponse } from '^/types/response/response.type';
import { useState } from 'react';
import { joinStr } from '@/lib/utils';
import { InputErrorWrapper } from '@/components/common/inputs/InputErrorWrapper';

type LogInErrors = Partial<{
  email: string;
  password: string;
}>;

type LoginKeys = keyof LogInErrors;

export const LoginForm = () => {
  const { setDialogType } = useDropdownDialogContext();
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<TAuthBody>();
  const { mutateAsync, isPending } = useLogin();
  const [errors, setErrors] = useState<LogInErrors>({});

  const onSubmit: SubmitHandler<TAuthBody> = async (data) => {
    setErrors({});
    try {
      await mutateAsync(data);

      setDialogType(undefined);
    } catch (axiosErr) {
      const getErr = useGetError;

      const err = (axiosErr as AxiosError).response?.data as TResponse;

      const errData = getErr(err);
      const fields = errData.fields as Record<LoginKeys, string>;

      if (fields?.email) {
        setErrors({
          email: t(
            joinStr('.', 'dialogs.login.errorFields.email', fields.email),
          ),
        });
      }

      if (errData.fields?.password) {
        setErrors({
          password: t(
            joinStr('.', 'dialogs.login.errorFields.password', fields.password),
          ),
        });
      }
    }
  };

  return (
    <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <InputErrorWrapper errorMessage={errors.email}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Email" {...register('email')} />
        </div>
      </InputErrorWrapper>
      <InputErrorWrapper errorMessage={errors.password}>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            {...register('password')}
          />
        </div>
      </InputErrorWrapper>
      <Button
        className="mt-1 h-10 cursor-pointer font-semibold"
        type="submit"
        disabled={isPending}
      >
        {isPending && <span>Loading</span>}
        {t('dialogs.login.action')}
      </Button>
    </form>
  );
};
