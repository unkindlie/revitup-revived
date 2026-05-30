import { Settings } from 'lucide-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import * as yup from 'yup';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FormField } from '@/components/common/form/FormField';
import { PasswordInput } from '@/components/common/inputs/PasswordInput';
import { Spinner } from '@/components/common/spinner/Spinner';
import { Button } from '@/components/ui/button';
import { TranslationNamespaceProvider } from '@/contexts/TranslationNamespaceContext';
import { usePasswordResetChangeLogged } from '@/hooks/features/auth/password-reset/use-change-password-logged';
import { useCloseDialog } from '@/hooks/ui/useCloseDialog';
import { TranslationNamespaces } from '@/lib/translation';

const schema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password is too short')
    .max(64, 'Password is too long'),
});

type FormBody = yup.InferType<typeof schema>;

export const ProfileContextMenu = () => {
  const { t } = useTranslation(TranslationNamespaces.Auth);
  const { closeHidden, closeRef } = useCloseDialog();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const { mutateAsync, isPending } = usePasswordResetChangeLogged();

  const onSubmit: SubmitHandler<FormBody> = async ({ password }) => {
    try {
      await mutateAsync(password);

      toast.success('Password changed successfully');
      closeRef.current?.click();
    } catch (e: any) {
      const apiErr =
        e?.response?.error?.message ?? e?.message ?? 'Unknown error';
      toast.error(apiErr);
    }
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-main size-fit rounded-md p-2.5 text-white">
          <Settings />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="lg:mr-4">
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              {t('dialogs.changePw.title', 'Change the password')}
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>
                {t('dialogs.changePw.title', 'Change the password')}
              </DialogTitle>
            </DialogHeader>

            <TranslationNamespaceProvider namespace={'auth'}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col space-y-2"
              >
                <FormField
                  id="password"
                  label={t('fields.password', {
                    ns: TranslationNamespaces.Common,
                  })}
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
                  {isPending ? (
                    <Spinner size="sm" />
                  ) : (
                    t('dialogs.changePw.action', 'Change')
                  )}
                </Button>
              </form>
            </TranslationNamespaceProvider>
            {closeHidden}
          </DialogContent>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
};
