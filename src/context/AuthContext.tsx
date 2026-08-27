"use client";

import React, { createContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  gender?: "male" | "female";
  avatarId?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  setAvatarId?: (avatarId: number, gender?: "male" | "female") => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage for saved avatar preference
    const savedAvatar = typeof window !== "undefined" ? localStorage.getItem("kapp_avatar_id") : null;
    const savedGender = typeof window !== "undefined" ? localStorage.getItem("kapp_avatar_gender") as "male" | "female" | null : null;

    setUser({
      id: 'user-123',
      username: 'Guest Player',
      avatarId: savedAvatar !== null ? parseInt(savedAvatar, 10) : 0,
      gender: savedGender ?? "male",
    });
    setToken('mock-jwt-token-xyz');
  }, []);

  const setAvatarId = (avatarId: number, gender?: "male" | "female") => {
    if (typeof window !== "undefined") {
      localStorage.setItem("kapp_avatar_id", avatarId.toString());
      if (gender) localStorage.setItem("kapp_avatar_gender", gender);
    }
    setUser((prev) => (prev ? { ...prev, avatarId, gender: gender ?? prev.gender } : null));
  };

  return (
    <AuthContext.Provider value={{ user, token, setAvatarId }}>
      {children}
    </AuthContext.Provider>
  );
};
