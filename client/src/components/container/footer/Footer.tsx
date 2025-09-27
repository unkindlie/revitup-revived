import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-chart-1 flex h-16 w-full items-center justify-center px-8">
      <span className="flex items-center gap-x-2 text-xl">
        {t('footer.authorship')}
        <span className="font-planet-kosmos mt-1 text-3xl">unkindly</span>
      </span>
    </footer>
  );
};
