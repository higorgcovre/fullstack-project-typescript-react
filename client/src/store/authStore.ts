// src/store/authStore.ts
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  userId: number | null ;
  setAuthenticated: (auth: boolean) => void;
  setUserId: (id: number | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userId: null,
  setAuthenticated: (auth) => set({ isAuthenticated: auth }),
  setUserId: (id) => set({ userId: id }),
}));
