import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;

  setToken: (accessToken: string, refreshToken: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  accessToken: null,
  refreshToken: null,

  setToken: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
  clearToken: () => set({ accessToken: null, refreshToken: null }),
}));
