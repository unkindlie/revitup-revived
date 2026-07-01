import { Link, useLocation } from 'react-router';

import { cn } from '@/lib/utils';

type HeaderLinkProps = {
  title: string;
  to: string;
  badgeNum?: number;
};

export const HeaderLink = ({ title, to }: HeaderLinkProps) => {
  const location = useLocation();

  return (
    <Link
      className={cn('text-lg font-bold text-white', {
        underline: location.pathname === to,
      })}
      to={to}
    >
      {title}
    </Link>
  );
};
