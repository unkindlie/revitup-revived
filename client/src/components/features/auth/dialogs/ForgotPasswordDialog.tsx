import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';
import { ForgotPasswordForm } from '@/components/features/auth/forms/ForgotPasswordForm';
import { TranslationNamespaces } from '@/lib/translation';

export const ForgotPasswordDialog = () => {
  const { t } = useTranslation(TranslationNamespaces.Auth);

  return (
    <DialogContent aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>{t('dialogs.forgotPw.title')}</DialogTitle>
        <DialogDescription>
          {t('dialogs.forgotPw.description')}
        </DialogDescription>
      </DialogHeader>
      <ForgotPasswordForm />
    </DialogContent>
  );
};
