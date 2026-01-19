import { Typography } from '@/components/common/typography/Typography';
import { Button } from '@/components/ui/button';
import { BackendRoutes } from '@/lib/routing/backend';

import googleGLogo from '@/assets/logos/google_g_icon.png';

type ExternalAuthProviders = 'google';

type ExternalAuthInfo = {
  route: string;
  imgSrc: string;
  title: string;
};

const authData: Record<ExternalAuthProviders, ExternalAuthInfo> = {
  google: {
    route: BackendRoutes.AuthGoogleLogin,
    imgSrc: googleGLogo,
    title: 'Continue with Google',
  },
};

export const ExternalAuthButton = ({
  provider,
}: {
  provider: ExternalAuthProviders;
}) => {
  const { title, route, imgSrc } = authData[provider];

  const handleAuth = () => {
    window.location.href = import.meta.env.VITE_BACKEND_URI + route;
  };

  return (
    <Button className="h-10 cursor-pointer" type="button" onClick={handleAuth}>
      <img src={imgSrc} className="size-4" />
      <Typography variant="sm" weight="semibold">
        {title}
      </Typography>
    </Button>
  );
};
