import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router';

import { FormField } from '@/components/common/form/FormField';
import { PasswordInput } from '@/components/common/inputs/PasswordInput';
import { Spinner } from '@/components/common/spinner/Spinner';
import { Typography } from '@/components/common/typography/Typography';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ExternalAuthButton } from '@/components/features/auth/ui/ExternalAuthButton';
import { TranslationNamespaceProvider } from '@/contexts/TranslationNamespaceContext';
import { useLogin } from '@/hooks/features/auth/useLogin';
import { useCloseDialog } from '@/hooks/ui/useCloseDialog';
import { TranslationNamespaces } from '@/lib/translation';
import { useDropdownDialogContext } from '@/providers/DropdownDialogProvider';

import { getFieldErrors } from '^/helpers/response/getFieldErrors';
import { authLoginSchema } from '^/schemas/auth/auth-login.schema';
import type { TAuthBody } from '^/types/auth';
import type { TError } from '^/types/response/response.type';

type LogInErrors = Partial<{
  email: string;
  password: string;
}>;

export const LoginForm = () => {
  const { setDialogType } = useDropdownDialogContext();
  const { t } = useTranslation(TranslationNamespaces.Auth);
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
    } catch (catchError) {
      const payload = (catchError as unknown as { payload: object }).payload as TError;

      const fields = getFieldErrors<keyof LogInErrors>(payload);

      if (fields) {
        // TODO: add a check for often used passwords
        setErrors({
          email: fields?.email
            ? t(`dialogs.login.errorFields.email.${fields.email}`)
            : undefined,
          password: fields?.password
            ? t(`dialogs.login.errorFields.password.${fields.password}`)
            : undefined,
        });
      }
    }
  };

  return (
    <>
      <form
        className="flex flex-col space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TranslationNamespaceProvider namespace={'auth'}>
          <FormField
            id="email"
            label={t('fields.email', { ns: TranslationNamespaces.Common })}
            errorMessage={errors.email || formErrors.email?.message}
          >
            <Input
              id="email"
              placeholder={t('fields.email', {
                ns: TranslationNamespaces.Common,
              })}
              {...register('email')}
            />
          </FormField>
          <FormField
            id="password"
            label={t('fields.password', { ns: TranslationNamespaces.Common })}
            errorMessage={errors.password || formErrors.password?.message}
          >
            <PasswordInput
              id="password"
              placeholder={t('fields.password', {
                ns: TranslationNamespaces.Common,
              })}
              {...register('password')}
            />
          </FormField>
        </TranslationNamespaceProvider>
        <div className="flex flex-col gap-y-2">
          <Button
            className="h-10 cursor-pointer font-semibold"
            type="submit"
            disabled={!isValid || isPending}
          >
            {isPending ? <Spinner size="sm" /> : t('dialogs.login.action')}
          </Button>
          <ExternalAuthButton provider="google" />
        </div>
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
