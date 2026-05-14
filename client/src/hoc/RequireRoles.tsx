import { useUserStore } from '@/stores/user.store';
import type { PropsWithChildren } from 'react';

type RequireRolesProps = PropsWithChildren & {
  roles: string[];
};

export const RequireRoles = ({ roles, children }: RequireRolesProps) => {
  const user = useUserStore((state) => state.user);
  const canAccess = user && roles.some((role) => roles.includes(role));

  return canAccess ? children : null;
};
