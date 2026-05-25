import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Typography } from '@/components/common/typography/Typography';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/providers/ThemeProvider';
import { useUserStore } from '@/stores/user.store';

import googleGLogo from '@/assets/logos/google_g_icon.png';
import revitupLogo from '@/assets/REVITUP_squared_logo.svg';
import { NAV_ROUTES } from '@/lib/routing/client';

// TODO: add the in-animation with Framer Motion
export const HeaderSheet = () => {
  const { t } = useTranslation(['common']);
  const user = useUserStore((state) => state.user);
  const { toggleTheme, theme } = useTheme();

  return (
    <Sheet>
      <SheetTrigger>
        <FontAwesomeIcon
          className="text-white"
          icon={faGripLines}
          size={'xl'}
        />
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader className="ml-1">
          <SheetTitle className="sr-only" />
          <Typography className="text-right" weight="medium">
            Sign in
          </Typography>
          <div className="flex flex-row gap-x-2.5">
            <img
              className="size-14 rounded-lg"
              src={user ? googleGLogo : revitupLogo}
            />
            <div className="-mt-0.5 flex flex-col justify-center">
              <Typography variant="xl" weight="semibold">
                {user ? user.username : 'Please login to the REVITUP'}
              </Typography>
              <Typography className="opacity-70">Hello</Typography>
            </div>
          </div>
          <div className="mt-3 h-px w-full bg-black/25" />
          <SheetDescription
            asChild
            className="mt-2 flex flex-col gap-y-1.5 text-black"
          >
            <div>
              {NAV_ROUTES.map(({ id, route }, i) => (
                <SheetClose asChild key={i}>
                  <Link to={route}>
                    <Typography
                      className="text-primary"
                      variant="2xl"
                      weight="medium"
                    >
                      {id}
                    </Typography>
                  </Link>
                </SheetClose>
              ))}
              <Typography
                className="text-primary flex cursor-pointer items-center justify-between"
                variant="2xl"
                weight="medium"
                onClick={toggleTheme}
              >
                {t('header.dropdown.common.darkMode').toLowerCase()}
                <Switch checked={theme === 'dark'} />
              </Typography>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
