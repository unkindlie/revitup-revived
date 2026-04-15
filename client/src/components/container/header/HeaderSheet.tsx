import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { Typography } from '@/components/common/typography/Typography';
import { useUserStore } from '@/stores/user.store';

import googleGLogo from '@/assets/logos/google_g_icon.png';
import revitupLogo from '@/assets/REVITUP_squared_logo.svg';
import { NAV_ROUTES } from '@/lib/routing/client';

// TODO: add the in-animation with Framer Motion
export const HeaderSheet = () => {
  const user = useUserStore((state) => state.user);

  return (
    <Sheet>
      <SheetTrigger>
        <FontAwesomeIcon
          className="text-primary-foreground"
          icon={faGripLines}
          size={'xl'}
        />
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader className="ml-1">
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
              <Typography className="text-black/70">Hello</Typography>
            </div>
          </div>
          <div className="mt-3 h-px w-full bg-black/25" />
          <SheetDescription className="mt-2 flex flex-col gap-y-1.5 text-black">
            {NAV_ROUTES.map(({ id }, i) => (
              <Typography key={i} variant="2xl" weight="medium">
                {id}
              </Typography>
            ))}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
