import { useTranslation } from 'react-i18next';
import { useCloseDialog } from '@/hooks/ui/useCloseDialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePasswordResetRequest } from '@/hooks/auth/password-reset/use-request-password-reset';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authPwResetRequestSchema } from '^/schemas/auth/auth-pw-reset-request.schema';
import { FormField } from '@/components/common/form/FormField';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/common/spinner/Spinner';
import { toast } from 'sonner';
import { getErrorFromAxiosError } from '^/helpers/response/getErrorFromAxiosError';
import { getErrorFromResponse } from '^/helpers/response/getResponse';
import { getFieldErrors } from '^/helpers/response/getFieldErrors';

export const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const { closeHidden, closeRef } = useCloseDialog();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors: formErrors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(authPwResetRequestSchema),
    mode: 'onChange',
  });
  const { mutateAsync, isPending } = usePasswordResetRequest();

  const [error, setError] = useState<string>();

  const onSubmit: SubmitHandler<{ email: string }> = async ({ email }) => {
    setError(undefined);

    try {
      await mutateAsync({ email });

      toast.success('Request created successfully', {
        description: `Check your e-mail (${email}) for the reset letter`,
      });

      closeRef.current?.click();
    } catch (axiosError) {
      const err = getErrorFromAxiosError(axiosError);
      const errData = getErrorFromResponse(err);

      const fields = getFieldErrors<'email'>(errData);

      if (fields.email === 'user_not_exist') {
        setError(`dialogs.login.errorFields.email.${fields.email}`);
      } else {
        setError(`dialogs.forgotPw.errorFields.email.${fields.email}`);
      }
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
          errorMessage={error || formErrors.email?.message}
        >
          <Input
            id="email"
            placeholder={t('fields.email')}
            {...register('email')}
          />
        </FormField>
        <Button
          className="mt-2 h-10 cursor-pointer font-semibold"
          type="submit"
          disabled={!isValid || isPending}
        >
          {isPending ? <Spinner /> : t('dialogs.forgotPw.action')}
        </Button>
      </form>
      {closeHidden}
    </>
  );
};
