import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-chart-1 flex h-16 w-full items-center justify-center px-8">
      {t('footer.authorship')}
    </footer>
  );
};
