"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { users } from "@/data/mock-data";
import type { Role, User } from "@/types";

interface AuthContextValue {
  user: User | null;
  role: Role;
  isAuthenticated: boolean;
  ready: boolean;
  loginAs: (role: Role, overrides?: Partial<User>) => void;
  signup: (payload: {
    name: string;
    company: string;
    email: string;
    role?: Role;
  }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "dmrv-mock-auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>("user");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { user: User; role: Role };
        setUser(parsed.user);
        setRole(parsed.role);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !user) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, role }));
  }, [ready, role, user]);

  const loginAs = (nextRole: Role, overrides?: Partial<User>) => {
    const fallback = users.find((item) => item.role === nextRole) ?? users[0];
    const current: User = {
      ...fallback,
      ...overrides,
      role: nextRole
    };
    setUser(current);
    setRole(nextRole);
  };

  const signup = ({
    name,
    company,
    email,
    role: nextRole = "user"
  }: {
    name: string;
    company: string;
    email: string;
    role?: Role;
  }) => {
    const base: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role: nextRole,
      companyId: company.toLowerCase().replace(/\s+/g, "_"),
      avatar: name
        .split(" ")
        .map((segment) => segment[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      location: "New account",
      score: nextRole === "admin" ? 95 : 80,
      credits: nextRole === "admin" ? 0 : 120,
      emissionsReduced: 0
    };

    setUser(base);
    setRole(nextRole);
  };

  const logout = () => {
    setUser(null);
    setRole("user");
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      role,
      isAuthenticated: Boolean(user),
      ready,
      loginAs,
      signup,
      logout
    }),
    [ready, role, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
