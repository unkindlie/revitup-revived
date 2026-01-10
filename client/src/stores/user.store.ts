import { create } from 'zustand';
import type { TStoredUser } from '^/types/auth';

type LoadingInfo = {
  isLoading?: boolean;
  isFinishedLoading?: boolean;
};

type TUserStore = {
  user: TStoredUser | null;
  setUser: (val: TStoredUser | null) => void;
  isLogged: boolean;
  setIsLogged: (val: boolean) => void;
  loadingInfo: LoadingInfo;
  setLoadingInfo: (val: LoadingInfo) => void;
};

export const useUserStore = create<TUserStore>((set) => ({
  user: null,
  setUser: (val) => set({ user: val }),
  isLogged: false,
  setIsLogged: (val) => set({ isLogged: val }),
  loadingInfo: {},
  setLoadingInfo: (val) => set({ loadingInfo: val }),
}));
