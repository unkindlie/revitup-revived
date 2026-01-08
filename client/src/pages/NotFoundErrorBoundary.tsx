import Logo from '@/assets/REVITUP_logo.svg?react';
import { Typography } from '@/components/common/typography/Typography';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

// TODO: add E logo
export const ErrorBoundary = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-svh w-full flex-1 flex-col items-center justify-center gap-y-1">
      <div className="flex items-center gap-x-5">
        <div className="flex flex-col items-center">
          <Typography variant="6xl" weight="bold" destructive>
            404
          </Typography>
          <Typography variant="2xl" weight="medium" destructive>
            Page not found
          </Typography>
        </div>
        <div className="hidden flex-row gap-x-5 md:flex">
          <div className="bg-light-active h-20 w-px" />
          <Logo className="fill-light-active h-auto w-56" title="Logo" />
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
