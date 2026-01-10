import { Link } from 'react-router';
import { LongLogo } from '@/components/common/logos';

export const HeaderLogo = () => (
  <Link to="/" title="REVITUP">
    <LongLogo className="w-52 fill-white" />
  </Link>
);
