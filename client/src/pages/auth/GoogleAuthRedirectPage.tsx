import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Typography } from '@/components/common/typography/Typography';
import { ACCESS_TOKEN } from '^/constants/auth.constants';

export const GoogleAuthRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
    }

    navigate('/')
  }, [token, navigate]);

  return <Typography>Redirect</Typography>;
};
