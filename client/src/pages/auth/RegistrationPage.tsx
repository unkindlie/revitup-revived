import { useTranslation } from '@/hooks/useTranslation';
import { LongLogo } from '@/components/common/logos';
import { Typography } from '@/components/common/typography/Typography';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { RegistrationForm } from '@/components/features/auth/forms/RegistrationForm';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

// TODO: add arrows with images for nouns in "Become" part (on md+ layouts)
export const RegistrationPage = () => {
  const { t } = useTranslation(['auth']);
  const [inForm, setInForm] = useState(false);

  useDocumentTitle('Registration', {
    appNamed: true,
  });

  const section = !inForm ? 'become' : 'join';
  const buttonCls =
    'text-light-active hover:bg-light-active w-full cursor-pointer rounded-sm bg-white font-semibold shadow-none hover:text-white';

  return (
    <div className="flex w-full items-center justify-center">
      <div className="bg-light-active flex w-96 flex-col items-center justify-center gap-y-3 rounded-lg px-5 py-6 shadow-xl">
        <LongLogo className="w-60 fill-white" />
        <hr className="mt-1 h-px w-[95%] bg-white" />
        <Typography
          className="text-center text-white"
          variant="lg"
          weight="medium"
        >
          {t(`registration.headings.${section}`)}
        </Typography>
        {!inForm && (
          <Button className={buttonCls} onClick={() => setInForm(true)}>
            {t(`registration.actions.become`)}
          </Button>
        )}
        {inForm && <RegistrationForm />}
      </div>
    </div>
  );
};
