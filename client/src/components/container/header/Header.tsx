import { HeaderLink } from '@/components/container/header/HeaderLink';
import { HeaderLogo } from '@/components/container/header/HeaderLogo';
import { HeaderDropdown } from '@/components/container/header/HeaderDropdown';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-header sticky top-0 flex h-16 w-full items-center justify-between px-8">
      <div className="flex flex-row items-center gap-6">
        <HeaderLogo />
        <div className="flex gap-6">
          <HeaderLink to="/" title={t('header.sections.news')} />
          <HeaderLink to="/events" title={t('header.sections.events')}  />
        </div>
      </div>
      <HeaderDropdown />
    </header>
  );
};
