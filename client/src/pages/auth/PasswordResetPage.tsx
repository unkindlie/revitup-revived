import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'sonner';
import * as yup from 'yup';

import { FormField } from '@/components/common/form/FormField';
import { PasswordInput } from '@/components/common/inputs/PasswordInput';
import { Spinner } from '@/components/common/spinner/Spinner';
import { Button } from '@/components/ui/button';
import { TranslationNamespaceProvider } from '@/contexts/TranslationNamespaceContext';
import { usePasswordResetChange } from '@/hooks/features/auth/password-reset/use-change-password';
import { TranslationNamespaces } from '@/lib/translation';

const schema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password is too short')
    .max(64, 'Password is too long'),
  id: yup.string().optional(),
});

type FormBody = yup.InferType<typeof schema>;

// TODO: add the ID availability check
export const PasswordResetPage = () => {
  const { t } = useTranslation(TranslationNamespaces.Auth);
  const { id: paramId } = useParams() as { id?: string };
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const { mutateAsync, isPending } = usePasswordResetChange();

  const onSubmit: SubmitHandler<FormBody> = async ({ password }) => {
    const finalId = paramId ?? '';
    if (!finalId) {
      toast.error('Reset ID is required');
      return;
    }

    try {
      await mutateAsync({ id: finalId, password });

      toast.success('Password changed successfully');
      navigate('/');
    } catch (e: any) {
      const apiErr =
        e?.response?.error?.message ?? e?.message ?? 'Unknown error';
      toast.error(apiErr);
    }
  };

  return (
    <TranslationNamespaceProvider namespace={'auth'}>
      <div className="mx-auto w-2/3 max-w-md py-8 md:w-3/5">
        <h2 className="mb-4 text-2xl font-semibold">
          {t('dialogs.forgotPw.title')}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <FormField
            id="password"
            label={t('fields.password', { ns: TranslationNamespaces.Common })}
            errorMessage={errors.password?.message}
          >
            <PasswordInput
              id="password"
              placeholder={t('fields.password', {
                ns: TranslationNamespaces.Common,
              })}
              {...register('password')}
            />
          </FormField>

          <Button
            type="submit"
            disabled={!isValid || isPending}
            className="mt-2 h-10 font-semibold"
          >
            {isPending ? <Spinner size="sm" /> : t('dialogs.forgotPw.action')}
          </Button>
        </form>
      </div>
    </TranslationNamespaceProvider>
  );
};

export default PasswordResetPage;
