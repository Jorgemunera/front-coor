import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import {
  getToken,
  getUser,
  saveToken,
  saveUser,
  removeToken,
  removeUser,
} from "../utils/token";
import { type User } from "../types/User";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(getToken());
  const [user, setUser] = useState<User | null>(getUser());

  const login = (newToken: string, newUser: User) => {
    saveToken(newToken);
    saveUser(newUser);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    removeToken();
    removeUser();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
