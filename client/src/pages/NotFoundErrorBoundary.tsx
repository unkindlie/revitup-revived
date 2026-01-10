import { Typography } from '@/components/common/typography/Typography';
import { Button } from '@/components/ui/button';
import { useNavigate, useRouteError } from 'react-router';
import { LongLogo, SquaredLogo } from '@/components/common/logos';

type RouteError = {
  status: number;
  statusText: string;
  data: string;
  internal: boolean;
};

export const ErrorBoundary = () => {
  const navigate = useNavigate();
  const routeError = useRouteError() as RouteError;

  return (
    <div className="flex h-svh w-full flex-1 flex-col items-center justify-center gap-y-1">
      <div className="flex items-center gap-x-5">
        <div className="flex flex-col items-center">
          <Typography variant="6xl" weight="bold" destructive>
            {routeError.status}
          </Typography>
          <Typography variant="2xl" weight="medium" destructive>
            Page not found
          </Typography>
        </div>
        <div className="flex flex-row items-center gap-x-5">
          <div className="bg-light-active h-24 w-px" />
          <SquaredLogo className="fill-light-active w-24 md:hidden" />
          <LongLogo className="fill-light-active hidden w-56 md:block" />
        </div>
      </div>
      <Button
        className="bg-light-active mt-5 h-12 cursor-pointer"
        size={'lg'}
        onClick={() => navigate('/')}
      >
        <Typography weight="semibold" variant="lg">
          Go to main page
        </Typography>
      </Button>
      <Typography className="mt-4 cursor-pointer" destructive>
        ...or get a random fact
      </Typography>
    </div>
  );
};
