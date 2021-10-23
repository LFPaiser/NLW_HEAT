import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | {};
  signInUrl: string;
};

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

type AuthProvider = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | {}>({});

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=bf9a9fb38ba50ec065ee`;

  async function signIn(code: string) {
    const response = await api.post<AuthResponse>("/authenticate", {
      code,
    });

    const { token, user } = response.data;

    localStorage.setItem("@heat:token", token);

    setUser(user);
  }

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [path, code] = url.split("?code=");

      window.history.pushState({}, "", path);

      signIn(code);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("@heat_token");

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>("/profile").then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user }}>
      {props.children}
    </AuthContext.Provider>
  );
}
