import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { useLogin } from '@/hooks/auth/useLogin';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { TAuthBody } from '^/types/auth';
import { useDropdownDialogContext } from '@/providers/DropdownDialogProvider';
import { useState } from 'react';
import { PasswordInput } from '@/components/common/inputs/PasswordInput';
import { getFieldErrors } from '^/helpers/response/getFieldErrors';
import { getErrorFromAxiosError } from '^/helpers/response/getErrorFromAxiosError';
import { getErrorFromResponse } from '^/helpers/response/getResponse';
import { yupResolver } from '@hookform/resolvers/yup';
import { authLoginSchema } from '^/schemas/auth/auth-login.schema';
import { Link } from 'react-router';
import { useCloseDialog } from '@/hooks/ui/useCloseDialog';
import { DialogClose } from '@/components/ui/dialog';
import { Spinner } from '@/components/common/spinner/Spinner';
import { Typography } from '@/components/common/typography/Typography';
import { FormField } from '@/components/common/form/FormField';

type LogInErrors = Partial<{
  email: string;
  password: string;
}>;

export const LoginForm = () => {
  const { setDialogType } = useDropdownDialogContext();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors: formErrors },
  } = useForm<TAuthBody>({
    resolver: yupResolver(authLoginSchema),
    mode: 'onChange',
  });
  const { mutateAsync, isPending } = useLogin();
  const [errors, setErrors] = useState<LogInErrors>({});

  const { closeHidden, closeRef } = useCloseDialog();

  const onSubmit: SubmitHandler<TAuthBody> = async (data) => {
    setErrors({});

    try {
      await mutateAsync(data);

      closeRef.current?.click();

      setTimeout(() => setDialogType(undefined), 500);
    } catch (axiosErr) {
      const err = getErrorFromAxiosError(axiosErr);

      const errData = getErrorFromResponse(err);
      const fields = getFieldErrors<keyof LogInErrors>(errData);

      setErrors({
        email: fields?.email
          ? `dialogs.login.errorFields.email.${fields.email}`
          : undefined,
        password: errData.fields?.password
          ? `dialogs.login.errorFields.password.${errData.fields.password}`
          : undefined,
      });
    }
  };

  return (
    <>
      <form
        className="flex flex-col space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          id="email"
          label={t('fields.email')}
          errorMessage={errors.email || formErrors.email?.message}
        >
          <Input
            id="email"
            placeholder={t('fields.email')}
            {...register('email')}
          />
        </FormField>
        <FormField
          id="password"
          label={t('fields.password')}
          errorMessage={errors.password || formErrors.password?.message}
        >
          <PasswordInput
            id="password"
            placeholder={t('fields.password')}
            {...register('password')}
          />
        </FormField>
        <Button
          className="mt-2 h-10 cursor-pointer font-semibold"
          type="submit"
          disabled={!isValid || isPending}
        >
          {isPending ? <Spinner /> : t('dialogs.login.action')}
        </Button>
        <div className="mt-1 flex justify-between">
          <Typography
            variant="sm"
            weight="medium"
            className="cursor-pointer select-none hover:underline"
            onClick={() => setDialogType('forgotPw')}
          >
            {t('dialogs.login.lowerActions.pwForgot')}
          </Typography>

          <DialogClose asChild>
            <Link
              to={'/register'}
              className="text-sm font-medium hover:underline"
            >
              {t('dialogs.login.lowerActions.noAccount')}
            </Link>
          </DialogClose>
        </div>
      </form>
      {closeHidden}
    </>
  );
};
