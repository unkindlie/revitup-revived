import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LoginForm } from '@/components/features/auth/forms/LoginForm';
import { useTranslation } from 'react-i18next';

export const ForgotPasswordDialog = () => {
  const { t } = useTranslation();

  return (
    <DialogContent aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>{t('dialogs.forgotPw.title')}</DialogTitle>
        <DialogDescription>
          {t('dialogs.forgotPw.description')}
        </DialogDescription>
      </DialogHeader>
      <LoginForm />
    </DialogContent>
  );
};
