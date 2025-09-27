import { create } from 'zustand';
import type { TStoredUser } from '^/types/auth';

type TUserStore = {
  user: TStoredUser | null;
  setUser: (val: TStoredUser) => void;
};

export const useUserStore = create<TUserStore>((set) => ({
  user: null,
  setUser: (val) => set({ user: val }),
}));
