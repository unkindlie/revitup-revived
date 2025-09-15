import Logo from '@/assets/REVITUP_logo.svg?react';
import { Link } from 'react-router';

export const HeaderLogo = () => (
  <Link to="/" title='REVITUP'>
    <Logo className="h-auto w-52 fill-white" title="Logo" />
  </Link>
);
