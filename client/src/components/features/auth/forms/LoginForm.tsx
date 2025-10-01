import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { useLogin } from '@/hooks/auth/useLogin';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { TAuthBody } from '^/types/auth';
import { useDropdownDialogContext } from '@/providers/DropdownDialogProvider';
import { useState } from 'react';
import { joinStr } from '@/lib/utils';
import { InputErrorWrapper } from '@/components/common/inputs/InputErrorWrapper';
import { PasswordInput } from '@/components/common/inputs/PasswordInput';
import { getFieldErrors } from '^/helpers/response/getFieldErrors';
import { getErrorFromAxiosError } from '^/helpers/response/getErrorFromAxiosError';
import { getErrorFromResponse } from '^/helpers/response/getResponse';

type LogInErrors = Partial<{
  email: string;
  password: string;
}>;

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
      const err = getErrorFromAxiosError(axiosErr);

      const errData = getErrorFromResponse(err);
      const fields = getFieldErrors<keyof LogInErrors>(errData);

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
    <form className="flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <InputErrorWrapper errorMessage={errors.email}>
        <div className="space-y-2">
          <Label htmlFor="email">{t('fields.email')}</Label>
          <Input
            id="email"
            placeholder={t('fields.email')}
            {...register('email')}
          />
        </div>
      </InputErrorWrapper>
      <InputErrorWrapper errorMessage={errors.password}>
        <div className="space-y-2">
          <Label htmlFor="password">{t('fields.password')}</Label>
          <PasswordInput
            id="password"
            placeholder={t('fields.password')}
            {...register('password')}
          />
        </div>
      </InputErrorWrapper>
      <Button
        className="mt-2 h-10 cursor-pointer font-semibold"
        type="submit"
        disabled={isPending}
      >
        {isPending && <span>Loading</span>}
        {t('dialogs.login.action')}
      </Button>
    </form>
  );
};
