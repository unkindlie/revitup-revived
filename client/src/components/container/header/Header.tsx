import { useTranslation } from 'react-i18next';

import { HeaderLink } from '@/components/container/header/HeaderLink';
import { HeaderLogo } from '@/components/container/header/HeaderLogo';
import { HeaderDropdown } from '@/components/container/header/HeaderDropdown';
import { HeaderSheet } from '@/components/container/header/HeaderSheet';
import { HeaderSearch } from '@/components/container/header/HeaderSearch';
import { HeaderProfile } from '@/components/container/header/HeaderProfile';
import { NAV_ROUTES } from '@/lib/routing/client';
import { TranslationNamespaces } from '@/lib/translation';
import { DropdownDialogProvider } from '@/providers/DropdownDialogProvider';

export const Header = () => {
  const { t } = useTranslation(TranslationNamespaces.Common);

  return (
    <header className="bg-main sticky top-0 z-50 flex w-full flex-col gap-y-3 px-7 py-3">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-row items-center gap-6">
          <HeaderLogo />
          <div className="hidden gap-6 lg:flex">
            {NAV_ROUTES.map(({ id, route }, i) => (
              <HeaderLink
                to={route}
                title={t(`header.sections.${id}`)}
                key={i}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <DropdownDialogProvider initialValue={undefined}>
            <div className="mr-4">
              <HeaderSearch />
            </div>
            <div className="mr-4 hidden items-center md:flex">
              <HeaderProfile />
            </div>
            <div className="hidden md:block">
              <HeaderDropdown />
            </div>
            <div className="md:hidden">
              <HeaderSheet />
            </div>
          </DropdownDialogProvider>
        </div>
      </div>
      <div className="hidden gap-6 md:flex lg:hidden">
        {NAV_ROUTES.map(({ id, route }, i) => (
          <HeaderLink to={route} title={t(`header.sections.${id}`)} key={i} />
        ))}
      </div>
    </header>
  );
};
