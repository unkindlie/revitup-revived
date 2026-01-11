import type { TAuthRegister } from '^/types/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authRegistrationSchema } from '^/schemas/auth/auth-register.schema';
import { useRegister } from '@/hooks/auth/useRegister';
import { TranslationNamespaceProvider } from '@/contexts/TranslationNamespaceContext';
import { FormField } from '@/components/common/form/FormField';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { TranslationNamespaces } from '@/lib/translation';
import { PasswordInput } from '@/components/common/inputs/PasswordInput';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/common/spinner/Spinner';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { getErrorFromAxiosError } from '^/helpers/response/getErrorFromAxiosError';
import { getErrorFromResponse } from '^/helpers/response/getResponse';
import { getFieldErrors } from '^/helpers/response/getFieldErrors';

type RegistrationErrors = Partial<TAuthRegister>;

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['auth']);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors: formErrors },
  } = useForm<TAuthRegister>({
    resolver: yupResolver(authRegistrationSchema),
    mode: 'onChange',
  });
  const { mutateAsync: createAccount, isPending } = useRegister();
  const [errors, setErrors] = useState<RegistrationErrors>({});

  const onSubmit: SubmitHandler<TAuthRegister> = async (data) => {
    setErrors({});

    try {
      await createAccount(data);

      toast.success(t('registration.successToast.title'), {
        description: t('registration.successToast.description'),
      });
      navigate('/');
    } catch (axiosErr) {
      const err = getErrorFromAxiosError(axiosErr);

      const errData = getErrorFromResponse(err);
      const fields = getFieldErrors<keyof RegistrationErrors>(errData);

      setErrors({
        email: fields.email
          ? t(`registration.errorFields.email.${fields.email}`)
          : undefined,
      });
    }
  };

  return (
    <form
      className="flex w-full flex-col space-y-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TranslationNamespaceProvider namespace={'auth'}>
        <FormField
          id="username"
          label={t('fields.username', { ns: TranslationNamespaces.Common })}
          errorMessage={errors.username || formErrors.username?.message}
          labelClassname="text-white"
          errorClassname="text-white"
        >
          <Input
            id="email"
            className="placeholder:text-light-active/75 w-full border-0 bg-white focus-visible:ring-white/35"
            placeholder={t('fields.username', {
              ns: TranslationNamespaces.Common,
            })}
            {...register('username')}
          />
        </FormField>
        <FormField
          id="email"
          label={t('fields.email', { ns: TranslationNamespaces.Common })}
          errorMessage={errors.email || formErrors.email?.message}
          labelClassname="text-white"
          errorClassname="text-white"
        >
          <Input
            id="email"
            className="placeholder:text-light-active/75 w-full border-0 bg-white focus-visible:ring-white/35"
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
          labelClassname="text-white"
          errorClassname="text-white"
        >
          <PasswordInput
            id="password"
            className="placeholder:text-light-active/75 w-full border-0 bg-white focus-visible:ring-white/35"
            buttonClassname="text-light-active"
            placeholder={t('fields.password', {
              ns: TranslationNamespaces.Common,
            })}
            {...register('password')}
          />
        </FormField>
      </TranslationNamespaceProvider>
      <Button
        className="text-light-active hover:bg-light-active mt-2 w-full cursor-pointer rounded-sm bg-white font-semibold shadow-none hover:text-white"
        type="submit"
        disabled={!isValid || isPending}
      >
        {isPending ? <Spinner /> : t('registration.actions.join')}
      </Button>
    </form>
  );
};
