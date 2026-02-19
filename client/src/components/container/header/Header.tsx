import { useTranslation } from 'react-i18next';

import { HeaderLink } from '@/components/container/header/HeaderLink';
import { HeaderLogo } from '@/components/container/header/HeaderLogo';
import { HeaderDropdown } from '@/components/container/header/HeaderDropdown';
import { HeaderSheet } from '@/components/container/header/HeaderSheet';
import { NAV_ROUTES } from '@/lib/routing/client';
import { TranslationNamespaces } from '@/lib/translation';
import { DropdownDialogProvider } from '@/providers/DropdownDialogProvider';

export const Header = () => {
  const { t } = useTranslation(TranslationNamespaces.Common);

  return (
    <header className="bg-light-active sticky top-0 flex h-16 w-full items-center justify-between px-7">
      <div className="flex flex-row items-center gap-6">
        <HeaderLogo />
        <div className="hidden gap-6 md:flex">
          {NAV_ROUTES.map(({ id, route }, i) => (
            <HeaderLink to={route} title={t(`header.sections.${id}`)} key={i} />
          ))}
        </div>
      </div>
      <DropdownDialogProvider initialValue={undefined}>
        <div className="hidden md:block">
          <HeaderDropdown />
        </div>
        <div className="md:hidden">
          <HeaderSheet />
        </div>
      </DropdownDialogProvider>
    </header>
  );
};
