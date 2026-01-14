import { Link } from 'react-router';

type HeaderLinkProps = {
  title: string;
  to: string;
  badgeNum?: number;
};

export const HeaderLink = ({ title, to }: HeaderLinkProps) => (
  <Link className="text-primary-foreground font-bold text-lg" to={to}>
    {title}
  </Link>
);
