import { HeaderLink } from './HeaderLink';
import { HeaderLogo } from './HeaderLogo';
import { HeaderDropdown } from './HeaderDropdown';

export const Header = () => (
  <header className="bg-header sticky top-0 flex h-16 w-full items-center justify-between px-8">
    <div className="flex flex-row items-center gap-6">
      <HeaderLogo />
      <div className="flex gap-6">
        <HeaderLink to="/" title="News" />
        <HeaderLink to="/events" title="Events" />
      </div>
    </div>
    <HeaderDropdown />
  </header>
);
