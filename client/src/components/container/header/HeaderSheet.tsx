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
      <SheetContent>
        <SheetHeader className="ml-1">
          <div className="flex flex-row gap-x-2.5">
            <img
              className="size-14 rounded-lg bg-red-300"
              src={user ? googleGLogo : undefined}
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
            <Typography variant="2xl" weight="medium">
              News
            </Typography>
            <Typography variant="2xl" weight="medium">
              Events
            </Typography>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
