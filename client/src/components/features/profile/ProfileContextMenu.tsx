import { yupResolver } from '@hookform/resolvers/yup';
import { Settings } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import * as yup from 'yup';

import { FormField } from '@/components/common/form/FormField';
import { PasswordInput } from '@/components/common/inputs/PasswordInput';
import { Spinner } from '@/components/common/spinner/Spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TranslationNamespaceProvider } from '@/contexts/TranslationNamespaceContext';
import { usePasswordResetChangeLogged } from '@/hooks/features/auth/password-reset/use-change-password-logged';
import { useUploadUserPfp } from '@/hooks/features/users/useUploadUserPfp';
import { useCloseDialog } from '@/hooks/ui/useCloseDialog';
import { TranslationNamespaces } from '@/lib/translation';
import {
  isImageFile,
  createPreviewUrl,
  ensureSquareFile,
} from '@/lib/image/upload';

const schema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password is too short')
    .max(64, 'Password is too long'),
});

type FormBody = yup.InferType<typeof schema>;

export const ProfileContextMenu = ({ id }: { id: number }) => {
  const { t } = useTranslation(TranslationNamespaces.Auth);
  const { closeHidden: closeHiddenPw, closeRef: closeRefPw } = useCloseDialog();
  const { closeHidden: closeHiddenPfp, closeRef: closeRefPfp } =
    useCloseDialog();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const { mutateAsync, isPending } = usePasswordResetChangeLogged();
  const { mutateAsync: uploadPfp, isPending: isUploadPending } =
    useUploadUserPfp(id);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormBody> = async ({ password }) => {
    try {
      await mutateAsync(password);

      toast.success('Password changed successfully');
    } catch (e: any) {
      const apiErr =
        e?.response?.error?.message ?? e?.message ?? 'Unknown error';
      toast.error(apiErr);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (!f) return;

    if (!isImageFile(f)) {
      toast.error('Only image files are allowed');
      return;
    }

    setSelectedFile(f);
    setPreviewUrl(createPreviewUrl(f));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('No file selected');
      return;
    }

    try {
      const fileToSend = await ensureSquareFile(selectedFile);

      await uploadPfp(fileToSend);

      toast.success('Profile image uploaded successfully');
      // close dialog for pfp
      closeRefPfp.current?.click();
    } catch (e: any) {
      const apiErr =
        e?.response?.error?.message ?? e?.message ?? 'Unknown error';
      toast.error(apiErr);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-main size-fit rounded-md p-2.5 text-white">
        <Settings />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="lg:mr-4">
        <Dialog>
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
            {closeHiddenPw}
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              {t('dialogs.changePfp.title', 'Change profile picture')}
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>
                {t('dialogs.changePfp.title', 'Change profile picture')}
              </DialogTitle>
            </DialogHeader>

            <TranslationNamespaceProvider namespace={'auth'}>
              <div className="flex flex-col space-y-2">
                <label className="flex flex-col">
                  <input
                    accept="image/*"
                    onChange={handleFileChange}
                    type="file"
                  />
                </label>

                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="h-48 w-48 rounded-md object-cover"
                  />
                )}

                <div className="flex gap-x-2">
                  <Button
                    type="button"
                    disabled={isUploadPending}
                    onClick={handleUpload}
                    className="mt-2 h-10 font-semibold"
                  >
                    {isUploadPending ? (
                      <Spinner size="sm" />
                    ) : (
                      t('dialogs.changePfp.action', 'Upload')
                    )}
                  </Button>
                </div>
              </div>
            </TranslationNamespaceProvider>
            {closeHiddenPfp}
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
