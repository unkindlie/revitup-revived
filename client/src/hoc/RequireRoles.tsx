import type { PropsWithChildren } from 'react';

import { useUserStore } from '@/stores/user.store';

import type { Role } from '^/types/roles';

type RequireRolesProps = PropsWithChildren & {
  roles: Role[];
};

export const RequireRoles = ({ roles, children }: RequireRolesProps) => {
  const user = useUserStore((state) => state.user);
  const canAccess = user && roles.some((role) => roles.includes(role));

  return canAccess ? children : null;
};
