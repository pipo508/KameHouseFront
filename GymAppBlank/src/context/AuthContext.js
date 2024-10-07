import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);

  const login = (userData) => {
    setUserId(userData.id);
    setRole(userData.role);
  };

  const logout = () => {
    setUserId(null);
    setRole(null);
  };

  const register = (userData) => {
    setUserId(userData.id);
    setRole(userData.role);
  };

  return (
    <AuthContext.Provider value={{ userId, role, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};