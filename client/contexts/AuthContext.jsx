import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const login = async (email, password) => {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    const data = await response.json();
    setUser(data.user);
    setAccessToken(data.accessToken);
  };

  const logout = () => {
    fetch('/auth/logout', { method: 'POST' });
    setUser(null);
    setAccessToken(null);
  };

  const refreshAccessToken = async () => {
    const response = await fetch('/auth/refresh', { method: 'POST' });
    if (response.ok) {
      const data = await response.json();
      setAccessToken(data.accessToken);
    } else {
      logout();
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
    const expiresAt = tokenPayload.exp * 1000;
    const now = Date.now();
    const timeout = expiresAt - now - 60000; // refresh 1 min before expiry
    if (timeout > 0) {
      const timer = setTimeout(refreshAccessToken, timeout);
      return () => clearTimeout(timer);
    } else {
      refreshAccessToken();
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
