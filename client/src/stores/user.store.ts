import { create } from 'zustand';
import type { TStoredUser } from '^/types/auth';

type LoadingFlag = {
  isLoading?: boolean;
  isFinishedLoading?: boolean;
};

type TUserStore = {
  user: TStoredUser | null;
  setUser: (val: TStoredUser) => void;
  loadingFlag: LoadingFlag;
  setLoadingFlag: (val: LoadingFlag) => void;
};

export const useUserStore = create<TUserStore>((set) => ({
  user: null,
  setUser: (val) => set({ user: val }),
  loadingFlag: {},
  setLoadingFlag: (val) => set({ loadingFlag: val }),
}));
