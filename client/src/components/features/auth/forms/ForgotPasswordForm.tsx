import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { FormField } from '@/components/common/form/FormField';
import { Spinner } from '@/components/common/spinner/Spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TranslationNamespaceProvider } from '@/contexts/TranslationNamespaceContext';
import { usePasswordResetRequest } from '@/hooks/features/auth/password-reset/use-request-password-reset';
import { useCloseDialog } from '@/hooks/ui/useCloseDialog';
import { TranslationNamespaces } from '@/lib/translation';

import { getErrorFromAxiosError } from '^/helpers/response/getErrorFromAxiosError';
import { getFieldErrors } from '^/helpers/response/getFieldErrors';
import { getErrorFromResponse } from '^/helpers/response/getResponse';
import { authPwResetRequestSchema } from '^/schemas/auth/auth-pw-reset-request.schema';
import { getResponse, useResponse } from '../../../../hooks/useResponse';

type FormBody = {
  email: string;
};

export const ForgotPasswordForm = () => {
  const { t } = useTranslation(TranslationNamespaces.Auth);
  const { closeHidden, closeRef } = useCloseDialog();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors: formErrors },
  } = useForm<FormBody>({
    resolver: yupResolver(authPwResetRequestSchema),
    mode: 'onChange',
  });
  const { mutateAsync, isPending } = usePasswordResetRequest();

  const [error, setError] = useState<string>();

  const onSubmit: SubmitHandler<FormBody> = async ({ email }) => {
    setError(undefined);

    try {
      const resp = await mutateAsync({ email });
      const { data } = getResponse<{ id: string }>(resp);

      if (data) {
        toast.success(t('dialogs.forgotPw.success.name'), {
          description: (
            <span>
              {t('dialogs.forgotPw.success.description', { email })}{' '}
              <a
                href={`/auth/password-reset/${data.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {t('dialogs.forgotPw.action')}
              </a>
            </span>
          ),
        });
      }

      closeRef.current?.click();
    } catch (axiosError) {
      const err = getErrorFromAxiosError(axiosError);
      const errData = getErrorFromResponse(err);

      // Show API error in a toast as well
      if (errData?.message) {
        toast.error(errData.message);
      }

      const fields = getFieldErrors<keyof FormBody>(errData);

      if (fields.email === 'user_not_exist') {
        setError(t(`dialogs.login.errorFields.email.${fields.email}`));
      } else {
        setError(t(`dialogs.forgotPw.errorFields.email.${fields.email}`));
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
            errorMessage={error || formErrors.email?.message}
          >
            <Input
              id="email"
              placeholder={t('fields.email', {
                ns: TranslationNamespaces.Common,
              })}
              {...register('email')}
            />
          </FormField>
        </TranslationNamespaceProvider>
        <Button
          className="mt-2 h-10 cursor-pointer font-semibold"
          type="submit"
          disabled={!isValid || isPending}
        >
          {isPending ? <Spinner size="sm" /> : t('dialogs.forgotPw.action')}
        </Button>
      </form>
      {closeHidden}
    </>
  );
};
