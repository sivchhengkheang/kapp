"use client";

import React, { createContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Mock user session for demonstration purposes
    setUser({ id: 'user-123', username: 'guest_player' });
    setToken('mock-jwt-token-xyz');
  }, []);

  return (
    <AuthContext.Provider value={{ user, token }}>
      {children}
    </AuthContext.Provider>
  );
};
