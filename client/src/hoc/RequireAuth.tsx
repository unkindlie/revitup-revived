import type { PropsWithChildren } from 'react';

import { useUserStore } from '@/stores/user.store';

export const RequireAuth = ({ children }: PropsWithChildren) => {
  const user = useUserStore((state) => state.user);

  return user ? children : null;
};
