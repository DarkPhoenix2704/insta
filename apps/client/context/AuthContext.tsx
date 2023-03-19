import React, { createContext, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { User } from "@app/types";
import api from "@app/api";
interface Prop {
  user: User | null;
  login: (profileDto: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (profileDto: {
    email: string;
    password: string;
    name: string;
    slug: string;
  }) => Promise<void>;
  getData: () => Promise<void>;
}

export const AuthContext = createContext({} as Prop);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const signUp = async (profileDto: {
    email: string;
    password: string;
    name: string;
    slug: string;
  }) => {
    try {
      const { data } = await api.post("/auth/signup", profileDto);
      console.log(data);
      if (!data.success) {
        throw new Error();
      }
      if (data.success && data.data === null) {
        router.push("/auth");
      }
      if (data.success && data.data) {
        setUser(data.data);
        router.push("/auth");
      }
    } catch {
      router.push("/error");
    }
  };

  const getData = async () => {
    try {
      const { data } = await api.get("/user");
      if (!data.success) {
        router.push("/auth");
      }
      if (data.success && data.data === null) {
        router.push("/auth");
      }
      if (data.success && data.data) {
        setUser(data.data as User);
      }
    } catch {
      router.push("/error");
    }
  };

  const login = async (profileDto: { email: string; password: string }) => {
    try {
      const { data } = await api.post("/auth/login", profileDto);
      if (!data.success) {
        throw new Error();
      }
      if (data.success && data.data === null) {
        router.push("/auth");
      }
      if (data.success && data.data) {
        setUser(data.data);
        router.push("/");
      }
    } catch {
      router.push("/error");
    }
  };

  async function logout() {
    try {
      const { data } = await api.post("/auth/logout");
      if (!data.success) {
        throw new Error();
      }
      setUser(null);
      router.push("/auth");
    } catch {
      router.push("/error");
    }
  }

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      signUp,
      getData,
    }),
    [setUser, login, logout, getData]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

interface AuthContextProps {
  children: React.ReactNode;
}
