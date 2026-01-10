import type { TAuthRegister } from '^/types/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authRegistrationSchema } from '^/schemas/auth/auth-register.schema';
import { useRegister } from '@/hooks/auth/useRegister';
import { TranslationNamespaceProvider } from '../../../../contexts/TranslationNamespaceContext';
import { FormField } from '../../../common/form/FormField';
import { useState } from 'react';
import { Input } from '../../../ui/input';
import { TranslationNamespaces } from '../../../../lib/translation';
import { PasswordInput } from '../../../common/inputs/PasswordInput';

type RegistrationErrors = Partial<TAuthRegister>;

export const RegistrationForm = () => {
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
    } catch (error) {}
  };

  return (
    <form
      className="flex w-full flex-col space-y-2"
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
            className="placeholder:text-light-active w-full border-2 bg-white"
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
    </form>
  );
};
