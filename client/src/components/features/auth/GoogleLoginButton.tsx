import { Typography } from '@/components/common/typography/Typography';
import { Button } from '@/components/ui/button';
import googleGLogo from '@/assets/logos/google_g_icon.png';

export const GoogleLoginButton = () => {
  const handleGoogleAuth = () => {
    window.location.href =
      import.meta.env.VITE_BACKEND_URI + '/auth/google/login';
  };

  return (
    <Button
      type="button"
      className="h-10 cursor-pointer"
      onClick={handleGoogleAuth}
    >
      <img src={googleGLogo} className="size-4 fill-white" />
      <Typography variant="sm" weight="semibold">
        Continue with Google
      </Typography>
    </Button>
  );
};
