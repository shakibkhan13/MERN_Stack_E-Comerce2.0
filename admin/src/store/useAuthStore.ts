/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string; // ✅ fixed typo
  role: "admin" | "user" | "deliveryman";
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hydrated: boolean;

  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  setHydrated: () => void;
  checkIsAdmin: () => boolean;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hydrated: false,

      setHydrated: () => set({ hydrated: true }),

      login: async (credentials) => {
        const res = await api.post("/auth/login", credentials);

        console.log("LOGIN RESPONSE 👉", res.data);

        const { user } = res.data;
        const token = res.data.user.token;

        if (!user) {
          throw new Error("Invalid login response");
        }

        set({
          user,
          token: token ?? null,
          isAuthenticated: true,
        });
      },
      register: async (userData: any) => {
        try {
          await api.post("/auth/register", userData);
        } catch (error) {
          console.error("Registration error:", error);
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        localStorage.removeItem("auth-storage");
      },
      checkIsAdmin: () => {
        const { user } = get();
        return user?.role === "admin";
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

export default useAuthStore;
