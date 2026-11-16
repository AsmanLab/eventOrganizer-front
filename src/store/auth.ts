import { AuthResponse, User } from "shared/types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  signIn: (data: AuthResponse) => void;
  logout: () => void;
};

export const authStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      signIn: (data: AuthResponse) =>
        set({
          user: {
            username: data.username,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            is_superuser: data.is_superuser,
            is_active: data.is_active,
          },
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        }),
      logout: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

// Selectors
const accessTokenSelector = (state: AuthState) => state.accessToken;
const refreshTokenSelector = (state: AuthState) => state.refreshToken;
const userSelector = (state: AuthState) => state.user;

// Getters
export const getAccessToken = () => accessTokenSelector(authStore.getState());
export const getRefreshToken = () => refreshTokenSelector(authStore.getState());
export const getUser = () => userSelector(authStore.getState());
