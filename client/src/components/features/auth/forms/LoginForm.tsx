import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

export const LoginForm = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-3">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="Email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" placeholder="Password" type="password" />
      </div>
      <Button className="mt-1 h-10 cursor-pointer font-semibold">
        {t('dialogs.login.action')}
      </Button>
    </div>
  );
};
