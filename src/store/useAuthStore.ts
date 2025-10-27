import { create } from "zustand";
import { getLocalStorage, setLocalStorage, deleteLocalStorage } from "../utils/localStorage";

interface AuthState {
  user: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: getLocalStorage("user"),
  login: (username, token) => {
    setLocalStorage("accessToken", token);
    setLocalStorage("user", username);
    set({ user: username });
  },
  logout: () => {
    deleteLocalStorage("accessToken");
    deleteLocalStorage("user");
    set({ user: null });
  },
}));
