import { Link } from 'react-router';
import { LongLogo, SquaredLogo } from '@/components/common/logos';

export const HeaderLogo = () => (
  <Link to="/" title="REVITUP">
    <div className="flex flex-row items-center gap-x-3 md:gap-x-0">
      <SquaredLogo className="block w-10 fill-white transition-all md:hidden md:w-0" />
      <div className="h-9 w-px bg-white md:hidden" />
      <LongLogo className="w-36 fill-white transition-all md:block md:w-52" />
    </div>
  </Link>
);
